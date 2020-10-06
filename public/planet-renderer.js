
class PlanetRenderer {
	constructor(planet) {
		this.planet = planet
		this.img_index = parseInt(Math.random() * planet_images.length)
	}

	render() {
		const r = this.planet.radius
		context.drawImage(
			planet_images[this.img_index],
			this.planet.pos.x - r,
			this.planet.pos.y - r,
			r + r,
			r + r
		)
	}
}
