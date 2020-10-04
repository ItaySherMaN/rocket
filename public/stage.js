

/*
This is an "interface" for a stage object
every stage you create must have the following methods:
init()
update()
render()
keyDown()
keyUp()
mouseDown()
mouseUp()

*/
class Stage {
	constructor(init, update, render, keyDown, keyUp, mouseDown, mouseUp) {
		this.init = init
		this.update = update
		this.render = render
		this.keyDown = keyDown
		this.keyUp = keyUp
		this.mouseDown = mouseDown
		this.mouseUp = mouseUp
	}
}
