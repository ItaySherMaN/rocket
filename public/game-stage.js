const levels = [
	new Level(2, 1, 2),
	new Level(3, 1.5, 3.5),
	new Level(3, 2, 5),
	new Level(3, 3, 7),
	new Level(4, 4, 9)
]

let current_level = levels[0]

const background_color = 'rgb(35, 8, 78)'

const pause_color = 'rgba(150, 150, 150, 0.5)'

const score_font = '64px monospace'
const score_color = 'rgb(255, 130, 171)'
const score_x = 70
const score_y = 100

const game_over_font = '64px Tahoma'
const game_over_color = 'rgb(119, 255, 102)'
const game_over_x = width / 2 - 150
const game_over_y = height / 2 - 200

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

let far_stars = null
let stars_renderer = null

// buttons
let restart_button_down = false

const restart_button_font = 'bold 60px Arial'
const restart_button_color = 'rgb(119, 255, 102)'
const restart_button_img_index = 1

const restart_button_radius = 130
const restart_button_x = width * 400 / 1920
const restart_button_y = height * 500 / 969

let menu_button_down = false

const menu_button_font = 'bold 60px Arial'
const menu_button_color = 'rgb(119, 255, 102)'
const menu_button_img_index = 2

const menu_button_radius = 100
const menu_button_x = width * 1300 / 1920
const menu_button_y = height * 700 / 969

// time
const level_time = 20000
let play_time = 0 // (millis)
let last_time_check = 0

class GameStage {
	init() {
		current_level = levels[0]
		gameOverFlag = false
		pause = false
		restart_button_down = false
		menu_button_down = false
		this.updateGameDifficulty()
		score = 0

		balls = []
		ship = new Ship(width / 2, height / 2)
		balls.push(ship)
		ship_renderer = new ShipRenderer(ship)

		planets = []
		planets_renderer = []

		for (let i = 0; i < current_level.planets_at_once; ++i) {
			const planet = Planet.generate(
				balls,
				current_level.planet_min_speed,
				current_level.planet_max_speed
			)
			planets.push(planet)
			balls.push(planet)
			planets_renderer.push(new PlanetRenderer(planet))
		}

		generateCoin()

		far_stars = []
		for (let i = 0; i < 160; ++i) {
			far_stars.push(Star.generateVisible(far_stars))
		}

		stars_renderer = []
		far_stars.forEach(star => {
			stars_renderer.push(new StarRenderer(star))
		})

		play_time = 0
		last_time_check = new Date().getTime()
	}

	update() {
		this.updateTime()
		this.updateGameDifficulty()

		if (!pause) {
			this.handleKeys()
			if (!gameOverFlag) {
				ship.update()
			}
			ship.updateRotation()
			if (Ball.updateBalls(balls)) {
				gameOver()
			}

			if (ship.collidedCoin()) {
				coinCollision()
			}
			checkPlanets()
			checkFarStars()
		}
	}

	handleKeys() {
		if (keyPressed[SPACE]) {
			if (gameOverFlag) {
				ship.forward = 0
			} else {
				ship.forward = 2
			}
		} else if (keyPressed[ord['W']]) {
			if (gameOverFlag) {
				ship.forward = 0
			} else {
				ship.forward = 1
			}
		} else {
			ship.forward = 0
		}

		if (keyPressed[ord['A']]) {
			ship.left = true
		} else {
			ship.left = false
		}
		if (keyPressed[ord['D']]) {
			ship.right = true
		} else {
			ship.right = false
		}
	}

	updateTime() {
		let now = new Date().getTime()
		if (!pause && !gameOverFlag) {
			play_time += now - last_time_check
		}
		last_time_check = now
	}

	updateGameDifficulty() {
		let lvl_index = Math.min(parseInt(play_time / level_time), levels.length - 1)
		current_level = levels[lvl_index]
	}

	render() {
		this.renderBackground()

		if (focus_ship) {
			context.translate(width / 2 - ship.pos.x, height / 2 - ship.pos.y)
			this.renderFarStars()
			this.renderShip()
			this.renderCoin()
			this.renderPlanets()
			context.translate(ship.pos.x - width / 2, ship.pos.y - height / 2)
		} else {
			this.renderFarStars()
			this.renderShip()
			this.renderCoin()
			this.renderPlanets()
		}
		if (gameOverFlag) {
			this.renderGameOver()
		}
		this.renderCoinArrow()
		this.renderScore()

		if (pause) {
			this.renderPause()
		}
		if (pause || gameOverFlag) {
			this.renderRestartButton()
			this.renderMenuButton()
		}
	}

	renderBackground() {
		context.fillStyle = background_color
		context.fillRect(0, 0, width, height)
	}

	renderFarStars() {
		stars_renderer.forEach(star_renderer => {
			star_renderer.render()
		})
	}

	renderScore() {
		context.font = score_font
		context.fillStyle = score_color
		context.fillText(score, score_x, score_y)
	}

	renderRestartButton() {
		context.drawImage(
			planet_images[restart_button_img_index],
			restart_button_x,
			restart_button_y,
			restart_button_radius * 2,
			restart_button_radius * 2
		)

		if (restart_button_down) {
			context.fillStyle = 'rgba(200, 200, 200, 0.4)'
			context.beginPath()
			context.arc(
				restart_button_x + restart_button_radius,
				restart_button_y + restart_button_radius,
				restart_button_radius,
				0, PI + PI
			)
			context.fill()
		}

		context.fillStyle = restart_button_color
		context.strokeStyle = 'black'
		context.font = restart_button_font
		context.lineWidth = 2
		context.fillText("Restart", restart_button_x + 25, restart_button_y + restart_button_radius + 15)
		context.strokeText("Restart", restart_button_x + 25, restart_button_y + restart_button_radius + 15)
	}

	renderMenuButton() {
		context.drawImage(
			planet_images[menu_button_img_index],
			menu_button_x,
			menu_button_y,
			menu_button_radius * 2,
			menu_button_radius * 2
		)

		if (menu_button_down) {
			context.fillStyle = 'rgba(200, 200, 200, 0.4)'
			context.beginPath()
			context.arc(
				menu_button_x + menu_button_radius,
				menu_button_y + menu_button_radius,
				menu_button_radius,
				0, PI + PI
			)
			context.fill()
		}

		context.fillStyle = menu_button_color
		context.strokeStyle = 'black'
		context.font = menu_button_font
		context.lineWidth = 2
		context.fillText("Menu", menu_button_x + 20, menu_button_y + menu_button_radius + 15)
		context.strokeText("Menu", menu_button_x + 20, menu_button_y + menu_button_radius + 15)
	}

	renderGameOver() {
		context.fillStyle = game_over_color

		context.lineWidth = 3
		context.font = game_over_font
		context.fillText("Game over", game_over_x, game_over_y)
	}

	renderShip() {
		ship_renderer.render()
	}

	renderPlanets() {
		planets_renderer.forEach(planet_renderer => {
			planet_renderer.render()
		})
	}

	renderCoin() {
		coin_renderer.render()
	}

	renderCoinArrow() {
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

	renderPause() {
		const pw = 200
		const ph = 200
		const r = 1 / 3

		context.fillStyle = pause_color
		context.fillRect(width / 2 - pw / 2, height / 2 - ph / 2, pw * r, ph)
		context.fillRect(width / 2 - pw / 2 + 2 * pw * r, height / 2 - ph / 2, pw * r, ph)
	}

	keyDown(event) {
		switch (event.keyCode) {
			case ord['P']:
				pause = !pause
				break
		}
	}

	keyUp(event) {
		switch (event.keyCode) {

		}
	}

	mouseDown(event) {
		if (gameOverFlag || pause) {
			if (clickedRestartButton()) {
				restart_button_down = true
			}
			if (clickedMenuButton()) {
				menu_button_down = true
			}
		}
	}

	mouseUp(event) {
		if (restart_button_down) {
			game_stage.init()
			current_stage = game_stage
			restart_button_down = false
		}
		if (menu_button_down){
			menu_stage.init()
			current_stage = menu_stage
			menu_button_down = false
		}
	}
}

function clickedRestartButton() {
	const dx = mouseX - restart_button_x - restart_button_radius
	const dy = mouseY - restart_button_y - restart_button_radius
	return dx * dx + dy * dy <= restart_button_radius * restart_button_radius
}

function clickedMenuButton() {
	const dx = mouseX - menu_button_x - menu_button_radius
	const dy = mouseY - menu_button_y - menu_button_radius
	return dx * dx + dy * dy <= menu_button_radius * menu_button_radius
}

function checkPlanets() {
	for (let i = 0; i < planets.length; ++i) {
		if (planets[i].isAway()) {
			balls.splice(balls.indexOf(planets[i]), 1)
			const new_planet = Planet.generate(
				balls,
				current_level.planet_min_speed,
				current_level.planet_max_speed
			)
			balls.push(new_planet)
			planets[i] = new_planet
			planets_renderer[i] = new PlanetRenderer(new_planet)
		}
	}

	for (let i = 0; i < current_level.planets_at_once - planets.length; ++i) {
		const new_planet = Planet.generate(
			balls,
			current_level.planet_min_speed,
			current_level.planet_max_speed
		)
		balls.push(new_planet)
		planets.push(new_planet)
		planets_renderer.push(new PlanetRenderer(new_planet))
	}
}

function checkFarStars() {
	for (let i = 0; i < far_stars.length; ++i) {
		if (!far_stars[i].isInRange()) {
			far_stars[i] = Star.generateInvisible(far_stars)
			stars_renderer[i] = new StarRenderer(far_stars[i])
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
		if (coin.pos.distFromPos(ship.pos) < Coin.min_distance_from_ship) {
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
