
// your constants here
const coin_img_name = 'coin_2.png'
const gameOver_img_name = 'game_over.png'
const newGame_img_name = 'new_game.png'

const planet_img_names = [
	"planet_1.png",
	"planet_2.png",
	"planet_3.png",
	"planet_4.png",
	"planet_5.png",
	"planet_6.png",
	"planet_7.png",
	//"planet_8.png"
]

const ship_img_names = [
	"rocket_no_fire.png",
	"rocket_small_fire.png",
	"rocket_big_fire.png"
]

const menu_screen_img_name = 'menu_screen.jpeg'

// your dynamic letiables here


let rocket_no_fire = null
let rocket_small_fire = null
let rocket_big_fire = null

let planet_images = null

let coin_image = null

let menu_image = null

let current_stage = null
let game_stage = null
let menu_stage = null

function setup() {
	game_stage = new GameStage()
	menu_stage = new MenuStage()
	current_stage = menu_stage
}

function init() {
	game_stage.init()
	menu_stage.init()
}


document.body.addEventListener("keydown", function(event) {
	keyPressed[event.keyCode] = true
	current_stage.keyDown(event)
})

document.body.addEventListener("keyup", function(event) {
	keyPressed[event.keyCode] = false
	current_stage.keyUp(event)
})

document.body.addEventListener("mousedown", function(event) {
	mouseDown = true
	current_stage.mouseDown(event)
})

document.body.addEventListener("mouseup", function(event) {
	mouseDown = false
	current_stage.mouseUp(event)
})

document.body.addEventListener("mousemove", function(event) {
	pmouseX = mouseX
	pmouseY = mouseY
	mouseX = event.clientX - ctxLeft
	mouseY = event.clientY - ctxTop
})

function run() {
	current_stage.update()
	current_stage.render()

	requestAnimationFrame(run)
}

loadImage(coin_img_name).then(image => {
	coin_image = image
	return loadImage(menu_screen_img_name)
}).then(image => {
	menu_image = image
	return Promise.all(ship_img_names.map(name => loadImage(name)))
}).then(images => {
	rocket_no_fire = images[0]
	rocket_small_fire = images[1]
	rocket_big_fire = images[2]
	return Promise.all(planet_img_names.map(name => loadImage(name)))
}).then(images => {
	planet_images = images
	setup()
	init()
	run()
})
