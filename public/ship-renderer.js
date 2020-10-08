
class ShipRenderer {
	static image_width_scalar = 0.195
	static image_height_scalar = 2.1 * ShipRenderer.image_width_scalar
	// static right_dist = 172 * ShipRenderer.scalar
	static right_dist = 187 * ShipRenderer.image_width_scalar

	constructor(ship) {
		this.ship = ship
	}

	render() {
		const x = this.ship.pos.x
		const y = this.ship.pos.y
		const angle = ship.dir

		const img = rocket_images[this.ship.forward]
		const w = img.width * ShipRenderer.image_width_scalar
		const h = img.height * ShipRenderer.image_height_scalar

		context.translate(x, y);
		context.rotate(angle);
		context.drawImage(img, -w + ShipRenderer.right_dist, -h / 2, w, h)
		context.rotate(-angle);
		context.translate(-x, -y);
	}
}
