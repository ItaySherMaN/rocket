
// your constants here
const coin_img_name = 'coin.png'
const minimal_distance = Math.min(width, height) / 3
const planet_min_speed = 3
const planet_max_speed = 10

const planet_img_names = [
	"planet_1.png",
	"planet_2.png",
	// "planet_3.png",
	// "planet_4.png",
	// "planet_5.png",
	// "planet_6.png",
	// "planet_7.png",
	// "planet_8.png",
	// "planet_9.png",
	// "planet_10.png",
]

const ship_img_names = [
	"rocket_model_no_fire.png",
	"rocket_model_yes_fire.png"
]

// your dynamic letiables here
let score = 0
let focus_ship = false
let gameOverFlag = false
let ship = null
let rocket_model_no_fire = null
let rocket_model_yes_fire = null

let pause = false

let balls = null
let planets = null
let coin = null

let ship_renderer = null
let planets_renderer = null
let coin_renderer = null

let planet_images = null
let coin_images = null



function generateCoin(){
	let done = false
	let r = Coin.coin_radius
	while (!done) {
		done = true
		coin = new Coin(new Vector((width - r - r) * Math.random() + r, (height - r - r) * Math.random() + r))
		if (coin.pos.distFromPos(ship.pos) < minimal_distance) {
			done = false
		}
	}
	coin_renderer = new CoinRenderer(coin)
}

function setup(images) {
	rocket_model_no_fire = images[0]
	rocket_model_yes_fire = images[1]
	coin_image = images[2]
	planet_images = images.slice(3, images.length)
}

function init() {
	pause = true

	balls = []
	ship = new Ship(width / 2 - 300, height / 2 - 300)
	balls.push(ship)
	ship_renderer = new ShipRenderer(ship)

	planets = []
	planets_renderer = []

	for (let i = 0; i < 3; ++i) {
		generatePlanet(planet_min_speed, planet_max_speed)
	}
	generateCoin()

	// balls.push(ship)
	//p1 = new Planet(...)
	//p2 = new Planet(...)
	//planets = [p1, p2]
	//coin = new Coin(...)
}

function gameOver() {
	gameOverFlag = true
}

function renderGameOver() {
	//TODO
}

function coinCollision() {
	score += 1
	generateCoin()
}

function update() {
	collisionArray = ship.update(planets, coin)
	if(collisionArray[0]){
		gameOver()
	}
	else if(collisionArray[1]){
		coinCollision()
	}
	Ball.updateBalls(balls) // .concat([ship])
	checkPlanets()
}

function generatePlanet(min_speed, max_speed) {
	let r = Math.max(width, height) * 0.8
	let planet = null
	let random_angle = 0.3
	let done = false
	while (!done) {
		done = true
		let angle = Math.random() * 2 * PI
		planet = new Planet(
			new Vector(width / 2 + r * Math.cos(angle), height / 2 + r * Math.sin(angle)),
			Vector.fromAngle(PI + angle + Math.random() * random_angle * 2 - random_angle, Math.random() * (max_speed - min_speed) + min_speed),
			Math.random() * 40 + 20
		)
		for (let i = 0; i < balls.length; ++i) {
			if (Ball.areColliding(planet, balls[i])) {
				done = false
				break
			}
		}
	}

	planets.push(planet)
	balls.push(planet)
	planets_renderer.push(new PlanetRenderer(planet, parseInt(Math.random() * planet_images.length)))
}

function checkPlanets() {
	for (let i = 0; i < planets.length; ++i) {
		if (planets[i].isAway()) {
			planets.splice(i, 1)
			generatePlanet(planet_min_speed, planet_max_speed)
		}
	}
}

function render() {
	renderBackground()

	if (focus_ship) {
		context.translate(width / 2 - ship.pos.x, height / 2 - ship.pos.y)
		renderShip()
		renderCoin()
		renderPlanets()
		if(gameOverFlag){
			renderGameOver()
		}
		context.translate(ship.pos.x - width / 2, ship.pos.y - height / 2)
	} else {
		renderShip()
		renderCoin()
		renderPlanets()
		if(gameOverFlag){
			renderGameOver()
		}
	}
}

function renderBackground() {
	context.fillStyle = 'rgb(53, 32, 106)'
	context.fillRect(0, 0, width, height)
}

function renderShip() {
	ship_renderer.render()
}

function renderPlanets() {
	planets_renderer.forEach(planet_renderer => {
		planet_renderer.render()
	})
}

function renderCoin() {
	coin_renderer.render()
}

document.body.addEventListener("keydown", function(event) {
	switch (event.keyCode) {
		case UP:
			ship.forward = true
			break
		case LEFT:
			ship.left = true
			break
		case RIGHT:
			ship.right = true
			break
		case ord['P']:
			pause = !pause
			break
	}
})

document.body.addEventListener("keyup", function(event) {
	switch (event.keyCode) {
		case UP:
			ship.forward = false
			break
		case LEFT:
			ship.left = false
			break
		case RIGHT:
			ship.right = false
			break
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
	if (!pause) {
		update()
	}
	render()

	requestAnimationFrame(run)
}

Promise.all(ship_img_names.concat(coin_img_name).concat(planet_img_names).map(name => loadImage('assets/' + name))).then(images => {
	setup(images)
	init()
	run()
})
