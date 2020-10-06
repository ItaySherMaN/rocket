


class ShipRenderer {
	static scalar = 0.195
	// static right_dist = 172 * ShipRenderer.scalar
	static right_dist = 187 * ShipRenderer.scalar
	// 339, 160

	constructor(ship) {
		this.ship = ship
	}

	render() {
		const x = ship.pos.x
		const y = ship.pos.y
		const w = ShipRenderer.img_width
		const h = ShipRenderer.img_height
		const angle = ship.dir
		const s = ShipRenderer.scalar
		const t = 2.1
		context.translate(x, y);
		context.rotate(angle);
		if (ship.forward === 0) {
			const img_w = rocket_no_fire.width * s
			const img_h = rocket_no_fire.height * s * t
			context.drawImage(rocket_no_fire, -img_w + ShipRenderer.right_dist, -img_h / 2, img_w, img_h)
		} else if (ship.forward === 1) {
			const img_w = rocket_small_fire.width * s
			const img_h = rocket_small_fire.height * s * t
			context.drawImage(rocket_small_fire, -img_w + ShipRenderer.right_dist, -img_h / 2, img_w, img_h)
		} else {
			const img_w = rocket_big_fire.width * s
			const img_h = rocket_big_fire.height * s * t
			context.drawImage(rocket_big_fire, -img_w + ShipRenderer.right_dist, -img_h / 2, img_w, img_h)
		}

		context.rotate(-angle);
		context.translate(-x, -y);
	}
}
