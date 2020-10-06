let planets_at_once

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

let far_stars = null
let stars_renderer = null

//buttons
let restart_button_down = false

const restart_button_font = 'bold 60px Arial'
const restart_button_img_index = 1

const restart_button_radius = 150
const restart_button_x = width * 400 / 1920
const restart_button_y = height * 500 / 969

let menu_button_down = false

const menu_button_font = 'bold 60px Arial'
const menu_button_img_index = 2

const menu_button_radius = 100
const menu_button_x = width * 1300 / 1920
const menu_button_y = height * 700 / 969

//time
let play_time = 0
let last_time_check = 0
time_to_start_level2 = 20000
time_to_start_level3 = 40000
time_to_start_level4 = 60000

class GameStage {
	init() {
		play_time = 0
		last_time_check = new Date().getTime()
		gameOverFlag = false
		pause = false
		restart_button_down = false
		menu_button_down = false
		this.update_game_difficulty()
		score = 0

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

		far_stars = []
		for (let i = 0; i < 160; ++i) {
			far_stars.push(Star.generateVisible(far_stars))
		}

		stars_renderer = []
		far_stars.forEach(star => {
			stars_renderer.push(new StarRenderer(star))
		})
	}

	update() {
		this.update_time()
		this.update_game_difficulty()
		if (!pause) {
			let collided_coin = ship.update(planets, coin)
			if (Ball.updateBalls(balls)) {
				gameOver()
			}

			if (collided_coin) {
				coinCollision()
			}
			checkPlanets()
			checkFarStars()
		}
	}

	update_time(){
		let now = new Date().getTime()
		if(!pause && !gameOverFlag){
			play_time += now - last_time_check
		}		
		last_time_check = now 
	}

	update_game_difficulty(){
		if(play_time < time_to_start_level2){
			planets_at_once = 2
			Planet.min_speed = 1
			Planet.max_speed = 3
		}
		else if(play_time < time_to_start_level3){
			planets_at_once = 3
			Planet.min_speed = 1
			Planet.max_speed = 3
		}
		else if(play_time < time_to_start_level4){
			planets_at_once = 3
			Planet.min_speed = 3
			Planet.max_speed = 10
		}
		else{
			planets_at_once = 3
			Planet.min_speed = 5
			Planet.max_speed = 15
		}
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
	}

	renderBackground() {
		context.fillStyle = 'rgb(35, 8, 78)'
		context.fillStyle = 'hsl'
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
		context.fillText(score, 70, 100)
	}

	renderRestartButton() {
		context.drawImage(
			planet_images[restart_button_img_index],
			restart_button_x,
			restart_button_y,
			restart_button_radius * 2,
			restart_button_radius * 2
		)//change

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

		context.fillStyle = title_color
		context.strokeStyle = 'black'
		context.font = restart_button_font
		context.lineWidth = 2
		context.fillText("Restart", restart_button_x + 15, restart_button_y + restart_button_radius * 1.2)
		context.strokeText("Restart", restart_button_x + 15, restart_button_y + restart_button_radius * 1.2)
	}

	renderMenuButton() {
		context.drawImage(
			planet_images[menu_button_img_index],
			menu_button_x,
			menu_button_y,
			menu_button_radius * 2,
			menu_button_radius * 2
		)//change

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

		context.fillStyle = title_color
		context.strokeStyle = 'black'
		context.font = menu_button_font
		context.lineWidth = 2
		context.fillText("Menu", menu_button_x + 15, menu_button_y + menu_button_radius * 1.2)
		context.strokeText("Menu", menu_button_x + 15, menu_button_y + menu_button_radius * 1.2)
	}

	renderGameOver() {
		context.fillStyle = game_over_color

		context.lineWidth = 3
		context.font = game_over_font
		context.fillText("Game over", width / 2 - 150, height / 2 - 200)
		this.renderRestartButton()
		this.renderMenuButton()
		//this.renderMenuButton()
		// context.strokeText("Game over", width / 2 - 150, height / 2 - 200)
		// context.drawImage(game_over_img, 0, 0, width, height / 2)
		// context.drawImage(new_game_img, 0, height * 3 / 4, width, height / 4)
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
		this.renderRestartButton()
		this.renderMenuButton()
	}

	keyDown(event) {
		switch (event.keyCode) {
			case ord['W']:
				ship.forward = 1
				break
			case ord['A']:
				ship.left = true
				break
			case ord['D']:
				ship.right = true
				break
			case SPACE:
				ship.forward = 2
				break
			case ord['P']:
				pause = !pause
				break
		}
	}

	keyUp(event) {
		switch (event.keyCode) {
			case ord['W']:
			case SPACE:
				ship.forward = 0
				break
			case ord['A']:
				ship.left = false
				break
			case ord['D']:
				ship.right = false
				break
		}
	}

	mouseDown(event) {
		if (clickedRestartButton() && (gameOverFlag || pause)) {
			restart_button_down = true
		}
		if (clickedMenuButton() && (gameOverFlag || pause)) {
			menu_button_down = true
		}
	}

	mouseUp(event) {
		if (restart_button_down) {
			current_stage = game_stage
			restart_button_down = false
			gameOverFlag = false
			init()
		}
		if(menu_button_down){
			current_stage = menu_stage
			menu_button_down = false
			menu_stage.init()
		}
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
			planets.splice(i, 1)
			planets_renderer.splice(i, 1)
			generatePlanet(Planet.min_speed, Planet.max_speed)
		}
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
