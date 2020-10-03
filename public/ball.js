/*
class ball:
pos: vector
vel: velocity vector
*/
class Ball {
	static G = 1

	constructor(pos, vel, radius) {
		this.pos = pos
		this.vel = vel
		this.radius = radius
		this.mass = Ball.G * this.radius * this.radius
	}

	// change position of a ball a fraction of the time
	// 0 < time left <= 1
	updatePos(time_left) {
		this.pos = this.pos.add(this.vel.multiply(time_left))
	}

	// kintetic energy of the system of balls
	static energy(balls) {
		let sum = 0
		balls.forEach(ball => {
			sum += 0.5 * ball.vel.dot(ball.vel) * ball.mass
		})
		return sum
	}

	// momentum of the system of balls
	static momentum(balls) {
		let sum = new Vector(0, 0)
		balls.forEach(ball => {
			sum = sum.add(ball.vel.multiply(ball.mass))
		})
		return sum
	}

	// get a list of balls and update their positions using ellastic collisions
	static updateBalls(balls) {
		let time_left = 1.0
		while (time_left > 0) {
			let a = time_left
			for (let i = 0; i < balls.length; i++) {
				for (let j = i + 1; j < balls.length; j++) {
					let b1 = balls[i],
						b2 = balls[j]
					let x = Math.min(right_time(b1, b2), right_time(b2, b1))
					if (x !== NaN) {
						if (x < a) {
							a = x
						}
					}
				}
			}
			let pairs = []
			for (let i = 0; i < balls.length; i++) {
				for (let j = i + 1; j < balls.length; j++) {
					let b1 = balls[i],
						b2 = balls[j]
					let x = Math.min(right_time(b1, b2), right_time(b2, b1))
					if (x !== NaN) {
						if (x <= a + 5e-13) { // floating point error :(
							pairs.push([b1, b2])
						}
					}
				}
			}
			// console.log(pairs)
			for (let i = 0; i < balls.length; i++) {
				balls[i].updatePos(a)
			}
			time_left -= a
			for (let pair of pairs) {
				Ball.collide(pair[0], pair[1])
			}
		}
	}

	// change only the velocities of ball_1 and ball_2 to make an ellastic collision
	static collide(ball_1, ball_2) {
		const m1 = ball_1.mass
		const m2 = ball_2.mass
		const sm = m1 + m2
		let v1 = ball_1.vel
		let v2 = ball_2.vel
		const p = ball_1.pos.subtract(ball_2.pos)
		const pos_diff_sq = p.dot(p)
		v1 = p.multiply(p.dot(v1) / pos_diff_sq)
		const v1_p = ball_1.vel.subtract(v1)
		v2 = p.multiply(p.dot(v2) / pos_diff_sq)
		const v2_p = ball_2.vel.subtract(v2)
		const u1 = v1.multiply(((m1 - m2) / sm)).add(v2.multiply((m2 + m2) / sm))
		const u2 = v1.multiply((m1 + m1) / sm).add(v2.multiply((m2 - m1) / sm))
		ball_1.vel = u1.add(v1_p)
		ball_2.vel = u2.add(v2_p)
	}
}

/*
right_time: returns the time in units of 1/60 seconds in
which ball_1 and ball_2 will collide
*/
function right_time(ball_1, ball_2) {
	const a1 = ball_1.pos.x
	const a2 = ball_1.vel.x
	const a3 = ball_2.pos.x
	const a4 = ball_2.vel.x
	const a5 = ball_1.pos.y
	const a6 = ball_1.vel.y
	const a7 = ball_2.pos.y
	const a8 = ball_2.vel.y
	const a9 = ball_1.radius
	const a10 = ball_2.radius

	const a = a2*a2 - 2*a2*a4 + a4*a4 + a6*a6 - 2*a6*a8 + a8*a8
	const b = 2*a1*a2 - 2*a2*a3 - 2*a1*a4 + 2*a3*a4 + 2*a5*a6 - 2*a6*a7 - 2*a5*a8 + 2*a7*a8
	const c = a1*a1 - 2*a1*a3 + a3*a3 + a5*a5 - 2*a5*a7 + a7*a7 - a9*a9 - 2*a9*a10 - a10*a10

	const d = b*b - 4*a*c
	// we have 2 solutions, we want the smaller one, which is the first collision
	// const second = (-b + Math.sqrt(d)) / (a+a)
	if (d < 0) {
		return NaN
	}
	const first = (-b - Math.sqrt(d)) / (a+a)
	if (first < 0) {
		return NaN
	}
	return first
}
