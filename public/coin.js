/* 
class coin: 

extends ball
only one coin at a time
spawns at a random location and stays there
when in touch with the ship, needs to disappear and spawn another coin

*/

class Coin extends Ball {

	constructor(pos, vel, radius) {
		super(pos, vel, radius)
	}
}