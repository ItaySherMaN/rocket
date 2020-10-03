



class PlanetRenderer {
	constructor(planet, img_index) {
		this.planet = planet
		this.img_index = img_index
	}

	render() {
		const two_r = this.planet.radius * 2
		context.drawImage(planet_images[img_index], this.planet.pos.x, this.planet.pos.y, two_r, two_r)
	}
}
