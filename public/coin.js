/*
class coin:

only one coin at a time
spawns at a random location and stays there
when in touch with the ship, needs to disappear and spawn another coin

*/

class Coin extends Ball {

	static coin_radius = 15
	static min_distance_from_ship = Math.min(width, height) / 2
	static max_distance_from_ship = 3 * Coin.min_distance_from_ship

	constructor(pos) {
		super(pos, new Vector(0, 0), Coin.coin_radius)
		// this.pos = pos
		// this.radius = Coin.coin_radius

		// this.mass = this.radius * this.radius
		// this.vel = new Vector(0, 0)
	}

	static generate() {
		const left_x = ship.pos.x - width / 2
		const top_y = ship.pos.y - height / 2

		const r0 = Coin.min_distance_from_ship
		const r1 = Coin.max_distance_from_ship

		let done = false
		let c = null

		while (!done) {
			done = true
			let angle = Math.random() * (PI + PI)
			let r = Math.random() * (r1 - r0) + r0
			c = new Coin(new Vector(
				ship.pos.x + r * Math.cos(angle),
				ship.pos.y + r * Math.sin(angle)
			))
			for (let i = 0; i < balls.length; ++i) {
				if (Ball.areColliding(c, balls[i])) {
					done = false
					break
				}
			}
		}

		return c
	}

	outsideScreen() {
		return (this.pos.x < ship.pos.x - width / 2 - this.radius)
			|| (this.pos.x >= ship.pos.x + width / 2 + this.radius)
			|| (this.pos.y < ship.pos.y - height / 2 - this.radius)
			|| (this.pos.y >= ship.pos.y + height / 2 + this.radius)

	}
}
