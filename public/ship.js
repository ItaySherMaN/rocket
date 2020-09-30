/*
class ship

pos: vector
vel: vector
dir: double
mass: int


*/
class Ship {
	constructor(posx, posy, vel, dir) {
		this.pos = new Vector(posx, posy);
		this.vel = vel;
		this.dir = dir;
	}

	// this happens when you die
	death() {
		// needs implementation
	}

	// recives power as vector
	activatePower(power) {
		this.vel += power;
	}

	// calculate power activated on me from planet
	planetPower(planet) {
		var dist = planet.distFromPos(this.pos);
		var powDir = this.pos - planet.pos;
		var powerToActivate = (this.mass * planet.mass) / Math.pow(dist, 2);
		powerVector = Vector.fromAngle(powDir.getAngle(), powerToActivate)

		if (dist <= 0){
			death();
			return;
		}

	}

	// updates variables
	update(planets) {
		var i;
		for (i = 0; i < planets.length; i++) {
			activatePower(planetPower(planets[i]));
		}
		pos += vel;
	}
}
