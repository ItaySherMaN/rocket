/*
class ship


dir: double
forward: boolean
left: boolean
right: boolean


*/

class Ship extends Ball {

	static forwardForce = 80
	static angleChange = (2 * PI) / 100
	static angleForce = 10

	static max_dir_vel = 0.07

	static radius = 31

	constructor(x, y) {
		super(new Vector(x, y), new Vector(0, 0), Ship.radius)
		this.dir = 0
		this.dir_vel = 0
		this.forward = false
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
		let dist = this.pos.distFromPos(planet.pos)
		if (dist <= planet.radius) {
			// collision!
			return -1
		}
		let powDir = planet.pos.subtract(this.pos)
		let forceToActivate = (this.mass * planet.mass) / Math.pow(dist, 2)
		forceVector = Vector.fromAngle(powDir.getAngle(), forceToActivate)
		return forceVector
	}

	// if the angle is not in the range of [0, 2 * PI) get it there
	correctAngle() {
		this.dir -= 2 * PI * Math.floor(this.dir / (2 * PI))
		// while (this.dir < 0) {
		//
		// }
		// while (this.dir < 0 || this.dir >= 2 * PI) {
		//	 if (a < 0) {
		//		 a += 2 * PI
		//	 } else {
		//		 a -= 2 * PI
		//	 }
		// }
	}

	// updates variables
	/*
	* returns boolean array: [planetCollision, coinCollision]
	*/
	update(planets, coin) {
		let collisionArray = [false, false]
		let allForces = new Vector(0, 0)
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
			this.dir -= Ship.angleChange
		}
		if (this.right) {
			this.dir += Ship.angleChange
		}
		this.correctAngle(this.dir)
		this.activateForce(allForces)
		// this.pos = this.pos.add(this.vel)
		return collisionArray
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
		this.correctAngle(this.dir)
		return collisionArray
	}

	// change position of a ball a fraction of the time
	// 0 < time left <= 1
	// updatePos(time_left) {
	// 	this.pos = this.pos.add(this.vel.multiply(time_left))
	// }
}
