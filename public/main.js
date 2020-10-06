
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
	"planet_8.png"
]

const ship_img_names = [
	"rocket_model_no_fire.png",
	"rocket_model_yes_fire.png"
]

const menu_screen_img_name = 'menu_screen.jpeg'

// your dynamic letiables here


let game_over_img = null
let rocket_model_no_fire = null
let rocket_model_yes_fire = null
let planet_images = null
let coin_images = null
let menu_image = null

let current_stage = null
let game_stage = null
let menu_stage = null

function setup(images) {
	rocket_model_no_fire = images[0]
	rocket_model_yes_fire = images[1]
	coin_image = images[2]
	game_over_img = images[3]
	new_game_img = images[4]
	planet_images = images.slice(5, 5 + 8)
	menu_image = images[13]

	game_stage = new GameStage()
	menu_stage = new MenuStage()
	current_stage = menu_stage
}

function init() {
	game_stage.init()
	menu_stage.init()
}


document.body.addEventListener("keydown", function(event) {
	current_stage.keyDown(event)
})

document.body.addEventListener("keyup", function(event) {
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

Promise.all(
	ship_img_names
	.concat(coin_img_name)
	.concat(gameOver_img_name)
	.concat(newGame_img_name)
	.concat(planet_img_names)
	.concat(menu_screen_img_name)
	.map(name => loadImage('assets/' + name))
).then(images => {
	setup(images)
	init()
	run()
})
