


class PlanetRenderer {
	constructor(planet, img_index) {
		this.planet = planet
		this.img_index = img_index
	}

	render() {
		// TEMP!
		context.fillStyle = 'red'
		context.beginPath()
		context.arc(this.planet.pos.x, this.planet.pos.y, this.planet.radius, 0, 2 * PI)
		context.fill()
		// END TEMP

		const r = this.planet.radius
		const img = planet_images[this.img_index]
		context.drawImage(img, this.planet.pos.x - r, this.planet.pos.y - r, r + r, r + r)
	}
}
