/*
class planet:

extends ball
becomes faster as time progresses (optional)
when in touch with ship lose life or die


*/
class Planet extends Ball {
	constructor(pos, vel, radius) {
		super(pos, vel, radius)
	}

	isAway() {
		const x = this.pos.x
		const y = this.pos.y
		if (x < -this.radius) {
			return !this.headedToScreen()
		}
		if (x >= width + this.radius) {
			return !this.headedToScreen()
		}
		if (y < -this.radius) {
			return !this.headedToScreen()
		}
		if (y >= height + this.radius) {
			return !this.headedToScreen()
		}
		return false
	}

	headedToScreen() {
		const c1 = new Vector(0, 0),
			  c2 = new Vector(width, 0),
			  c3 = new Vector(0, height),
			  c4 = new Vector(width, height)
			  a = this.pos.getAngle()

		let d1 = c1.subtract(this.pos)
		let d2 = c4.subtract(this.pos)

		let a1 = c1.subtract(this.pos).getAngle()
		let a2 = c4.subtract(this.pos).getAngle()
		if (Math.min(a1, a2) < a < Math.max(a1, a2)) {
			return true
		}

		let a1 = c2.subtract(this.pos).getAngle()
		let a2 = c3.subtract(this.pos).getAngle()
		if (Math.min(a1, a2) < a < Math.max(a1, a2)) {
			return true
		}
		return false
	}


}
