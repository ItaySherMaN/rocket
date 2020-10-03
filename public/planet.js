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
		const c1 = new Vector(0, 0).subtract(this.pos),
			  c2 = new Vector(width, 0).subtract(this.pos),
			  c3 = new Vector(0, height).subtract(this.pos),
			  c4 = new Vector(width, height).subtract(this.pos)

		const c = this.vel
		let a = c1
		let b = c4

		let ab = a.y * b.x - a.x * b.y
		let cb = c.y * b.x - c.x * b.y
		let ac = a.y * c.x - a.x * c.y

		if ((ab > 0 && cb > 0 && ac > 0) || (ab < 0 && cb < 0 && ac < 0)) {
			return true
		}

		a = c2
		b = c3

		ab = a.y * b.x - a.x * b.y
		cb = c.y * b.x - c.x * b.y
		ac = a.y * c.x - a.x * c.y

		return (ab > 0 && cb > 0 && ac > 0) || (ab < 0 && cb < 0 && ac < 0)
	}


}
