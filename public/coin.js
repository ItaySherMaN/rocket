/*
class coin:

only one coin at a time
spawns at a random location and stays there
when in touch with the ship, needs to disappear and spawn another coin

*/

class Coin {

	static coin_radius = 15
	static minimal_distance = Math.min(width, height) / 3

	constructor(pos) {
		this.radius = Coin.coin_radius
		this.pos = pos
	}
}
