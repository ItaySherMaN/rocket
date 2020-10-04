


class ShipRenderer {
	static img_width = 90
	static img_height = 100

	constructor(ship) {
		this.ship = ship
	}

	render() {
		const x = ship.pos.x
		const y = ship.pos.y
		const w = ShipRenderer.img_width
		const h = ShipRenderer.img_height
		const angle = ship.dir
		context.translate(x, y);
		context.rotate(angle);
		if (!ship.forward) {
			context.drawImage(rocket_model_no_fire, -w / 2, -h / 2, w, h);
		} else {
			context.drawImage(rocket_model_yes_fire, -w * 0.95 , -h / 2, w * 1.4, h * 0.95);
		}
		context.rotate(-angle);
		context.translate(-x, -y);
	}
}
