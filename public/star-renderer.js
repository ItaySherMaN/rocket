class StarRenderer {
	constructor(star) {
		this.star = star
		this.color = getRandomStarColor()
	}

	render() {
		context.beginPath()
		context.fillStyle = this.color
		context.arc(
			this.star.pos.x,
			this.star.pos.y,
			this.star.radius,
			0, PI + PI
		)
		context.fill()
	}
}

function getRandomStarColor() {
	return 'hsl(60, 100%, ' + parseInt(65 + Math.random() * 35) + '%)'
}
