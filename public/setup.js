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
