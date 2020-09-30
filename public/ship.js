/*
class ship

pos: vector
vel: vector
dir: double
mass: int
forward: boolean
left: boolean
right: boolean


*/

class Ship {
	constructor(posx, posy, vel, dir) {
		this.pos = new Vector(posx, posy)
		this.vel = vel
		this.dir = dir
		this.forward = false
		this.left = false
		this.right = false
	}

	// recives force as vector
	activateForce(force) {
		this.vel = this.vel.add(force.multiply(1 / this.mass))
	}

	// calculate force activated on me from planet
	planetForce(planet) {
		let dist = this.pos.distFromPos(planet.pos)
		if (dist <= planet.radius) {
			return -1
		}
		let powDir = this.pos - planet.pos
		let forceToActivate = (this.mass * planet.mass) / Math.pow(dist, 2)
		forceVector = Vector.fromAngle(powDir.getAngle(), forceToActivate)
		return forceVector
	}

	// if the angle is not in the range of [0, 2 * PI) get it there
	correctAngle(a) {
		while (a < 0 || a >= 2 * PI) {
			if (a < 0) {
				a += 2 * PI
			} else {
				a -= 2 * PI
			}
		}
	}

	// updates variables 
	/*
	* returns boolean array: [planetCollision, coinCollision] 
	*/
	update(planets, coin) {
		let collisionArray = [false, false]
		let allForces = new Vector(0, 0)
		if (!(planets == null || coin == null)) {
			let i
			for (i = 0; i < planets.length; i++) {
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
		if (forward) {
			forceVector = Vector.fromAngle(dir, forwardForce)
			allForces = allForces.add(forceVector)
		}
		if (left) {
			this.dir += angleChange
		}
		if (right) {
			this.dir -= angleChange
		}
		correctAngle(dir)
		activateForce(allForces)
		this.pos = this.pos.add(vel)
		return collisionArray
	}

	static forwardForce = 1 / 100
	static angleChange = (2 * PI) / 1000
}
