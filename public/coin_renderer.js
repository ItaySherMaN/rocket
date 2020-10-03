class CoinRenderer {

	constructor(coin) {
		this.coin = coin
	}

	render() {
		let r = Coin.coin_radius
		context.drawImage(coin_image, this.coin.pos.x - r, this.coin.pos.y - r, r + r, r + r)
	}
}
