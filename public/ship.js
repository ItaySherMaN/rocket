/*
class ship

pos: vector
vel: vector
dir: double
mass: int


*/
class Ship {
	constructor(posx, posy, vel, dir) {
		this.pos = new Vector(posx, posy)
		this.vel = vel
		this.dir = dir
	}

	// recives power as vector
	activatePower(power) {
		this.vel += power
	}

	// calculate power activated on me from planet
	planetPower(planet) {
		var dist = this.pos.distFromPos(planet.pos)
		if (dist <= planet.radius) {
			return -1
		}
		var powDir = this.pos - planet.pos
		var powerToActivate = (this.mass * planet.mass) / Math.pow(dist, 2)
		powerVector = Vector.fromAngle(powDir.getAngle(), powerToActivate)
		return powerVector
	}

	// updates variables 
	/*
	* returns boolean array: [planetCollision, coinCollision] 
	*/
	update(planets, coin) {
		var collisionArray = [false, false]
		var i
		for (i = 0; i < planets.length; i++) {
			plPow = planetPower(planets[i])
			if (plPow == -1) {
				collisionArray[0] = true
				return collisionArray
			}
			activatePower(plPow)
		}
		distFromCoin = this.pos.distFromPos(coin.pos)
		if (distFromCoin <= coin.radius) {
			collisionArray[1] = true
		}
		pos += vel
		return collisionArray
	}
}
