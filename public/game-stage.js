const planets_at_once = 3

const pause_color = 'rgba(150, 150, 150, 0.5)'

const score_font = '64px monospace'
const score_color = 'rgb(255, 130, 171)'

const game_over_font = '64px Tahoma'
const game_over_color = 'rgb(119, 255, 102)'

const coin_indicator_text_font = '24px Tahoma'
const coin_indicator_text_stroke = 'black'
const coin_indicator_color = 'rgb(255, 252, 0, 0.7)'

let score = 0
let focus_ship = true
let gameOverFlag = false
let ship = null

let pause = false

let balls = null
let planets = null
let coin = null

let ship_renderer = null
let planets_renderer = null
let coin_renderer = null


class GameStage {
	init() {
		pause = false

		balls = []
		ship = new Ship(width / 2, height / 2)
		balls.push(ship)
		ship_renderer = new ShipRenderer(ship)

		planets = []
		planets_renderer = []

		for (let i = 0; i < planets_at_once; ++i) {
			generatePlanet(Planet.min_speed, Planet.max_speed)
		}
		generateCoin()
	}

	update() {
		if (!pause) {
			let collided_coin = ship.update(planets, coin)
			if (Ball.updateBalls(balls)) {
				gameOver()
			}

			if (collided_coin) {
				coinCollision()
			}
			checkPlanets()
		}
	}

	render() {
		renderBackground()

		if (focus_ship) {
			context.translate(width / 2 - ship.pos.x, height / 2 - ship.pos.y)
			renderShip()
			renderCoin()
			renderPlanets()
			// renderCoinArrow()
			context.translate(ship.pos.x - width / 2, ship.pos.y - height / 2)
		} else {
			renderShip()
			renderCoin()
			renderPlanets()
			// renderCoinArrow()
		}
		if (gameOverFlag) {
			renderGameOver()
		}
		renderCoinArrow()
		renderScore()

		if (pause) {
			renderPause()
		}
	}

	keyDown(event) {
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
	}

	keyUp(event) {
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
	}

	mouseDown(event) {

	}

	mouseUp(event) {

	}
}

function generatePlanet() {
	let r = Math.max(width, height) * 0.8
	let planet = null
	let random_angle = 0.3
	let done = false
	while (!done) {
		done = true
		let angle = Math.random() * 2 * PI
		planet = new Planet(
			new Vector(
				ship.pos.x + r * Math.cos(angle),
				ship.pos.y + r * Math.sin(angle)
			),
			Vector.fromAngle(
				PI + angle + Math.random() * random_angle * 2 - random_angle,
				Math.random() * (Planet.max_speed - Planet.min_speed) + Planet.min_speed
			),
			Math.random() * (Planet.max_radius - Planet.min_radius) + Planet.min_radius
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
			balls.splice(balls.indexOf(planets[i]), 1)
			planets.splice(i, 1)
			planets_renderer.splice(i, 1)
			generatePlanet(Planet.min_speed, Planet.max_speed)
		}
	}
}

function generateCoin() {
	const left_x = ship.pos.x - width / 2
	const top_y = ship.pos.y - height / 2
	let done = false
	let r = Coin.coin_radius
	while (!done) {
		done = true
		coin = new Coin(new Vector(
			left_x + r + (width - r - r) * Math.random(),
			top_y + r + (height - r - r) * Math.random()
		))
		if (coin.pos.distFromPos(ship.pos) < Coin.minimal_distance) {
			done = false
		} else {
			for (let i = 0; i < balls.length; ++i) {
				if (Ball.areColliding(coin, balls[i])) {
					done = false
					break
				}
			}
		}
	}
	coin_renderer = new CoinRenderer(coin)
}

function gameOver() {
	gameOverFlag = true
}

function coinCollision() {
	generateCoin()
	if (!gameOverFlag) {
		score += 1
	}
}

function renderScore() {
	context.font = score_font
	context.fillStyle = score_color
	context.fillText(score, 70, 100)
}

function renderGameOver() {
	context.fillStyle = game_over_color

	context.lineWidth = 3
	context.font = game_over_font
	context.fillText("Game over", width / 2 - 150, height / 2 - 200)
	// context.strokeText("Game over", width / 2 - 150, height / 2 - 200)
	// context.drawImage(game_over_img, 0, 0, width, height / 2)
	// context.drawImage(new_game_img, 0, height * 3 / 4, width, height / 4)
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

	// TEMP!
	context.lineWidth = 2
	context.strokeStyle = 'black'
	planets.forEach(planet => {
		context.beginPath()
		context.moveTo(ship.pos.x, ship.pos.y)
		context.lineTo(ship.planetForce(planet).x + ship.pos.x, ship.planetForce(planet).y + ship.pos.y)
		context.stroke()
	})
	// END TEMP
}

function renderCoin() {
	coin_renderer.render()
}

function renderCoinArrow() {
	if (coin.outsideScreen()) {
		const ship_to_coin = coin.pos.subtract(ship.pos)
		const c1 = new Vector(-width / 2, -height / 2)
		const c2 = new Vector(width / 2, -height / 2)
		const c3 = new Vector(-width / 2, height / 2)
		const c4 = new Vector(width / 2, height / 2)

		const x1 = width / 2
		const y1 = height / 2
		const x2 = x1 + ship_to_coin.x
		const y2 = y1 + ship_to_coin.y

		let x = 0
		let y = y2 - x2 * (y2 - y1) / (x2 - x1)

		if (ship_to_coin.isBetween(c1, c2)) {
			x = x2 - y2 * (x2 - x1) / (y2 - y1)
			y = 0
		} else if (ship_to_coin.isBetween(c2, c4)) {
			x = width
			y = y2 - (x2 - x) * (y2 - y1) / (x2 - x1)
		} else if (ship_to_coin.isBetween(c3, c4)) {
			x = x2 - (y2 - height) * (x2 - x1) / (y2 - y1)
			y = height
		}

		context.fillStyle = coin_indicator_color
		context.beginPath()
		context.arc(x, y, coin.radius, 0, PI + PI)
		context.fill()

		x = Math.min(Math.max(x, 10), width - 100)
		y = Math.min(Math.max(y, 40), height - 20)

		context.strokeStyle = coin_indicator_text_stroke
		context.font = coin_indicator_text_font
		context.fillText(parseInt(ship.pos.distFromPos(coin.pos)), x, y)
	}
}

function renderPause() {
	const pw = 200
	const ph = 200
	const r = 1 / 3

	context.fillStyle = pause_color
	context.fillRect(width / 2 - pw / 2, height / 2 - ph / 2, pw * r, ph)
	context.fillRect(width / 2 - pw / 2 + 2 * pw * r, height / 2 - ph / 2, pw * r, ph)
}
