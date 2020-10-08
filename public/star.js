class Star {
	static min_radius = 1.5
	static max_radius = 4
	static min_distance = 0 * Star.max_radius
	static max_distance_from_ship = Math.max(width, height)
	static range_dist = 1000

	static generateVisible(other_stars) {
		let done = false
		let star = null

		while (!done) {
			done = true
			// let r = Math.random() * Star.max_distance_from_ship
			// let angle = Math.random() * (PI + PI)
			// star = new Star(
			// 	new Vector(ship.pos.x + r * Math.cos(angle), ship.pos.y + r * Math.sin(angle)),
			// 	Math.random() * (Star.max_radius - Star.min_radius) + Star.min_radius
			// )
			//
			// for (let i = 0; i < other_stars.length; ++i) {
			// 	let other = other_stars[i]
			// 	if (star.pos.distFromPos(other.pos) < Star.min_distance) {
			// 		done = false
			// 		break
			// 	}
			// }
			const min_x = ship.pos.x - width / 2 - Star.range_dist
			const max_x = ship.pos.x + width / 2 + Star.range_dist
			const min_y = ship.pos.y - height / 2 - Star.range_dist
			const max_y = ship.pos.y + height / 2 + Star.range_dist

			let x = Math.random() * (max_x - min_x) + min_x
			let y = Math.random() * (max_y - min_y) + min_y

			star = new Star(
				new Vector(x, y),
				Math.random() * (Star.max_radius - Star.min_radius) + Star.min_radius
			)

			for (let i = 0; i < other_stars.length; ++i) {
				let other = other_stars[i]
				if (star.pos.distFromPos(other.pos) < Star.min_distance) {
					done = false
					break
				}
			}
		}

		return star
	}

	static generateInvisible(other_stars) {
		let done = false
		let star = null

		while (!done) {
			done = true
			// let r = Math.random() * Star.max_distance_from_ship
			// let angle = Math.random() * (PI + PI)
			// star = new Star(
			// 	new Vector(ship.pos.x + r * Math.cos(angle), ship.pos.y + r * Math.sin(angle)),
			// 	Math.random() * (Star.max_radius - Star.min_radius) + Star.min_radius
			// )
			//
			// for (let i = 0; i < other_stars.length; ++i) {
			// 	let other = other_stars[i]
			// 	if (star.pos.distFromPos(other.pos) < Star.min_distance) {
			// 		done = false
			// 		break
			// 	}
			// 	if (star.isVisible()) {
			// 		done = false
			// 		break
			// 	}
			// }
			const min_x = ship.pos.x - width / 2 - Star.range_dist
			const max_x = ship.pos.x + width / 2 + Star.range_dist
			const min_y = ship.pos.y - height / 2 - Star.range_dist
			const max_y = ship.pos.y + height / 2 + Star.range_dist

			let x = Math.random() * (max_x - min_x) + min_x
			let y = Math.random() * (max_y - min_y) + min_y

			star = new Star(
				new Vector(x, y),
				Math.random() * (Star.max_radius - Star.min_radius) + Star.min_radius
			)

			for (let i = 0; i < other_stars.length; ++i) {
				let other = other_stars[i]
				if (star.pos.distFromPos(other.pos) < Star.min_distance) {
					done = false
					break
				}
			}

			if (done) {
				if (star.isVisible()) {
					done = false
				}
			}
		}

		return star
	}

	constructor(pos, radius) {
		this.pos = pos
		this.radius = radius
	}

	isVisible() {
		const x = this.pos.x - ship.pos.x + width / 2
		const y = this.pos.y - ship.pos.y + height / 2
		const r = this.radius
		return x >= -r && x < width + r && y >= -r && y < height + r
	}

	isInRange() {
		// return this.pos.distFromPos(ship.pos) <= Star.max_distance_from_ship
		// console.log(ship.pos.x - width / 2 - Star.range_dist, this.pos.x, ship.pos.x + width / 2 + Star.range_dist)
		const x0 = ship.pos.x - width / 2 - Star.range_dist
		const x1 = ship.pos.x + width / 2 + Star.range_dist
		const y0 = ship.pos.y - height / 2 - Star.range_dist
		const y1 = ship.pos.y + height / 2 + Star.range_dist

		const x = this.pos.x
		const y = this.pos.y
		return (x0 <= x && x < x1)
			&& (y0 <= y && y < y1)
	}
}
