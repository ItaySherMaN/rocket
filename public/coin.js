/*
class coin:

only one coin at a time
spawns at a random location and stays there
when in touch with the ship, needs to disappear and spawn another coin

*/

class Coin {

	static coin_radius = 15

	constructor(pos) {
		let r = Coin.coin_radius
		this.pos = pos
	}
}
