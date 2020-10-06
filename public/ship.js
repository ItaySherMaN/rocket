/*
class ship


dir: double
forward: boolean
left: boolean
right: boolean


*/

class Ship extends Ball {

	static smallForwardForce = 80
	static bigForwardForce = 400
	static angleChange = (2 * PI) / 100
	static angleForce = 3 * Ball.G

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
	// planetForce(planet) {
	// 	const dx = this.pos.x - planet.pos.x
	// 	const dy = this.pos.y - planet.pos.y
	// 	return Vector.fromAngle(
	// 		planet.pos.subtract(this.pos).getAngle(),
	// 		(this.mass * planet.mass) / (dx * dx + dy * dy)
	// 	)
	// }

	// if the angle is not in the range of [0, 2 * PI) get it there
	correctAngle() {
		this.dir -= 2 * PI * Math.floor(this.dir / (2 * PI))
	}

	// updates variables
	/*
	* returns boolean array: [planetCollision, coinCollision]
	*/
	update() {
		// let force = new Vector(0, 0)

		// for (let i = 0; i < planets.length; i++) {
		// 	force = allForces.add(this.planetForce(planets[i]))
		// }

		// let distFromCoin = this.pos.distFromPos(coin.pos)
		// if (distFromCoin <= coin.radius + ship.radius) {
		// 	collided_coin = true
		// }

		if (this.forward === 1) {
			this.activateForce(Vector.fromAngle(this.dir, Ship.smallForwardForce))
		} else if (this.forward === 2) {
			this.activateForce(Vector.fromAngle(this.dir, Ship.bigForwardForce))
		}

		// this.activateForce(force)
		// return collided_coin
	}

	collidedCoin() {
		return this.pos.distFromPos(coin.pos) <= coin.radius + ship.radius
	}

	updateRotation() {
		if (this.left) {
			this.dir -= Ship.angleChange
		}
		if (this.right) {
			this.dir += Ship.angleChange
		}
		this.correctAngle()
	}

	updateRotation2() {
		let dir_forces = 0
		if (this.left) {
			dir_forces -= Ship.angleForce
		}
		if (this.right) {
			dir_forces += Ship.angleForce
		}
		this.activateRotationalForce(dir_forces)

		this.dir += this.dir_vel
		this.correctAngle()
	}
}
