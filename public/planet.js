/*
class planet:

extends ball
becomes faster as time progresses (optional)
when in touch with ship lose life or die


*/

/*
DEPENDENCIES:
vector.js
*/

class Planet extends Ball {

	static min_radius = 30
	static max_radius = 70

	static max_distance_from_ship = Math.max(width, height) * 0.8

	static generate(other_balls, min_speed, max_speed) {
		let planet = null
		let random_angle = 0.3
		let done = false
		let r = Planet.max_distance_from_ship

		while (!done) {
			done = true
			let angle = Math.random() * (PI + PI)
			planet = new Planet(
				new Vector(
					ship.pos.x + r * Math.cos(angle),
					ship.pos.y + r * Math.sin(angle)
				),
				Vector.fromAngle(
					PI + angle + Math.random() * random_angle * 2 - random_angle,
					Math.random() * (max_speed - min_speed) + min_speed
				),
				Math.random() * (Planet.max_radius - Planet.min_radius) + Planet.min_radius
			)
			for (let i = 0; i < other_balls.length; ++i) {
				if (Ball.areColliding(planet, other_balls[i])) {
					done = false
					break
				}
			}
		}

		return planet
	}

	constructor(pos, vel, radius) {
		super(pos, vel, radius)
	}

	isAway() {
		const left_x = ship.pos.x - width / 2
		const right_x = ship.pos.x + width / 2
		const top_y = ship.pos.y - height / 2
		const bottom_y = ship.pos.y + height / 2

		const x = this.pos.x - left_x
		const y = this.pos.y - top_y
		if (
			(x < -this.radius) ||
			(x >= width + this.radius) ||
			(y < -this.radius) ||
			(y >= height + this.radius)
		) {
			const c1 = new Vector(left_x, top_y).subtract(this.pos),
				  c2 = new Vector(right_x, top_y).subtract(this.pos),
				  c3 = new Vector(left_x, bottom_y).subtract(this.pos),
				  c4 = new Vector(right_x, bottom_y).subtract(this.pos)
			const c = this.vel

			if (c.isBetween(c1, c4)) {
				return false
			}

			return !(c.isBetween(c2, c3))
		}

		return false
	}
}
