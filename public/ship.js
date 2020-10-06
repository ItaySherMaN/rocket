/*
class ship


dir: double
forward: boolean
left: boolean
right: boolean


*/

class Ship extends Ball {

	static smallForwardForce = 80 * Ball.G
	static bigForwardForce = 400 * Ball.G
	static angleChange = (2 * PI) / 100
	static angleForce = 10

	static max_dir_vel = 0.07

	static radius = 31

	constructor(x, y) {
		super(new Vector(x, y), new Vector(0, 0), Ship.radius)
		this.dir = 0
		this.dir_vel = 0

		this.forward = 0
		this.left = false
		this.right = false
	}

	// recives force as vector
	activateForce(force) {
		this.vel = this.vel.add(force.multiply(1 / this.mass))
	}

	activateRotationalForce(force) {
		this.dir_vel += force / this.mass
		if (this.dir_vel > Ship.max_dir_vel) {
			this.dir_vel = Ship.max_dir_vel
		} else if (this.dir_vel < -Ship.max_dir_vel) {
			this.dir_vel = -Ship.max_dir_vel
		}
	}

	// calculate force activated on me from planet
	planetForce(planet) {
		const dx = this.pos.x - planet.pos.x
		const dy = this.pos.y - planet.pos.y
		return Vector.fromAngle(
			planet.pos.subtract(this.pos).getAngle(),
			(this.mass * planet.mass) / (dx * dx + dy * dy)
		)
	}

	// if the angle is not in the range of [0, 2 * PI) get it there
	correctAngle() {
		this.dir -= 2 * PI * Math.floor(this.dir / (2 * PI))
	}

	// updates variables
	/*
	* returns boolean array: [planetCollision, coinCollision]
	*/
	update(planets, coin) {
		let collided_coin = false
		let allForces = new Vector(0, 0)

		for (let i = 0; i < planets.length; i++) {
			allForces = allForces.add(this.planetForce(planets[i]))
		}

		let distFromCoin = this.pos.distFromPos(coin.pos)
		if (distFromCoin <= coin.radius + ship.radius) {
			collided_coin = true
		}

		if (this.forward === 1) {
			allForces = allForces.add(Vector.fromAngle(this.dir, Ship.smallForwardForce))
		} else if (this.forward === 2) {
			allForces = allForces.add(Vector.fromAngle(this.dir, Ship.bigForwardForce))
		}

		if (this.left) {
			this.dir -= Ship.angleChange
		}
		if (this.right) {
			this.dir += Ship.angleChange
		}

		this.correctAngle()
		this.activateForce(allForces)
		// this.pos = this.pos.add(this.vel)
		return collided_coin
	}

	update2(planets, coin) {
		let collisionArray = [false, false]
		let allForces = new Vector(0, 0)
		let dir_forces = 0
		if (!(planets == null || coin == null)) {
			for (let i = 0; i < planets.length; i++) {
				plPow = planetForce(planets[i])
				if (plPow == -1) {
					collisionArray[0] = true
					return collisionArray
				}
				allForces = allForces.add(plPow)
			}
			distFromCoin = this.pos.distFromPos(coin.pos)
			if (distFromCoin <= coin.radius) {
				collisionArray[1] = true
			}
		}
		if (this.forward) {
			let forceVector = Vector.fromAngle(this.dir, Ship.forwardForce)
			allForces = allForces.add(forceVector)
		}
		if (this.left) {
			dir_forces -= Ship.angleForce
		}
		if (this.right) {
			dir_forces += Ship.angleForce
		}
		this.activateRotationalForce(dir_forces)
		this.activateForce(allForces)
		// this.pos = this.pos.add(this.vel)
		this.dir += this.dir_vel
		this.correctAngle()
		return collisionArray
	}

	// change position of a ball a fraction of the time
	// 0 < time left <= 1
	// updatePos(time_left) {
	// 	this.pos = this.pos.add(this.vel.multiply(time_left))
	// }
}
