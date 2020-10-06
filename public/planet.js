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

	static min_speed = 3
	static max_speed = 10

	static min_radius = 30
	static max_radius = 70

	// static max_momentum = 500

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
  			// let a = c1
  			// let b = c4
			//
  			// let ab = a.y * b.x - a.x * b.y
  			// let cb = c.y * b.x - c.x * b.y
  			// let ac = a.y * c.x - a.x * c.y

			if (c.isBetween(c1, c4)) {
				return false
			}

			// if ((ab > 0 && cb > 0 && ac > 0) || (ab < 0 && cb < 0 && ac < 0)) {
			// 	return false
			// }

			return !(c.isBetween(c2, c3))

			// a = c2
			// b = c3
			//
			// ab = a.y * b.x - a.x * b.y
			// cb = c.y * b.x - c.x * b.y
			// ac = a.y * c.x - a.x * c.y
			//
			// return !((ab > 0 && cb > 0 && ac > 0) || (ab < 0 && cb < 0 && ac < 0))
		}

		return false
	}

	headedToScreen() {


	}


}
