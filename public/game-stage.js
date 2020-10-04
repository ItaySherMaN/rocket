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

		for (let i = 0; i < 3; ++i) {
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
			context.translate(ship.pos.x - width / 2, ship.pos.y - height / 2)
		} else {
			renderShip()
			renderCoin()
			renderPlanets()
		}
		if (gameOverFlag) {
			renderGameOver()
		}
		renderScore()


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
			console.log('away!')
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
	context.font = '64px Arial'
	context.fillStyle = 'green'
	context.fillText(score, 10, 60)
}

function renderGameOver() {
	context.fillStyle = 'black'
	context.strokeStyle = 'green'
	context.lineWidth = 3
	context.font = '64px Tahoma'
	context.fillText("Game over", width / 2 - 150, height / 2 - 200)
	context.strokeText("Game over", width / 2 - 150, height / 2 - 200)
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

	context.lineWidth = 2
	context.strokeStyle = 'black'
	planets.forEach(planet => {
		context.beginPath()
		context.moveTo(ship.pos.x, ship.pos.y)
		context.lineTo(ship.planetForce(planet).x + ship.pos.x, ship.planetForce(planet).y + ship.pos.y)
		context.stroke()
	})
}

function renderCoin() {
	coin_renderer.render()
}
