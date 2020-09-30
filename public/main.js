// pre-built web page objects
const canvas	= document.getElementById("canvas")		// canvas object
const context	= canvas.getContext("2d")				// context object
const width		= canvas.width = window.innerWidth		// screen width in pixels
const height	= canvas.height = window.innerHeight	// screen hight in pixels
const ctxLeft	= canvas.getBoundingClientRect().left	// left x of the canvas
const ctxTop	= canvas.getBoundingClientRect().top	// top y of the canvas

// mouse locations
let mouseX		= width / 2	 // current mouse X position
let mouseY		= height / 2 // current mouse Y position
let pmouseX		= mouseX	 // mouse X position before 1 / 60 seconds
let pmouseY		= mouseY	 // mouse Y position before 1 / 60 seconds
let mouseDown	= false

// ASCII values
const UP		= 38
const DOWN		= 40
const LEFT		= 37
const RIGHT		= 39
const SPACE		= 32

// math constants
const PI		= Math.PI
const E			= Math.E

// your constants here


// your dynamic variables here
let ship = null
let planets = null

function setup() {

}

function init() {
    ship = new Ship(width / 2, height / 2)
    p1 = new Planet(...)
    p2 = new Planet(...)
    planets = [p1, p2]
    coin = new Coin(...)
}

function update() {
	ship.update(planets, coin)
}

function render() {
    context.fillStyle = 'rgb(53, 32, 106)'
    context.fillRect(0, 0, width, height)
}

document.body.addEventListener("keydown", function(event) {
	switch (event.keyCode) {
		case UP:
			ship.thrusting = true
			break
	}
})

document.body.addEventListener("keyup", function(event) {
	switch (event.keyCode) {

	}
})

document.body.addEventListener("mousedown", function(event) {
	mouseDown = true
})

document.body.addEventListener("mouseup", function(event) {
	mouseDown = false
})

document.body.addEventListener("mousemove", function(event) {
	pmouseX = mouseX
	pmouseY = mouseY
	mouseX = event.clientX - ctxLeft
	mouseY = event.clientY - ctxTop
})


function run() {
	update()
	render()

	requestAnimationFrame(run)
}

setup()
init()
run()
