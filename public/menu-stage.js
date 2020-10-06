const title_color = 'rgb(181, 230, 29)'
const title_font = 'bold 90px Arial'

const play_button_font = 'bold 60px Arial'
const play_button_img_index = 0

const play_button_radius = 75
const play_button_x = width * 600 / 1920
const play_button_y = height * 500 / 969

let play_button_down = false

class MenuStage {
	init() {
		play_button_down = false
	}

	update() {

	}

	render() {
		this.renderBackground()
		this.renderTitle()
		this.renderPlayButton()
	}

	renderBackground() {
		context.drawImage(menu_image, 0, 0, width, height)
	}

	renderTitle() {
		context.fillStyle = title_color
		context.font = title_font
		context.fillText("Rocket", width * 1000 / 1920, height * 250 / 969)
	}

	renderPlayButton() {
		context.drawImage(
			planet_images[play_button_img_index],
			play_button_x,
			play_button_y,
			play_button_radius * 2,
			play_button_radius * 2
		)

		if (play_button_down) {
			context.fillStyle = 'rgba(200, 200, 200, 0.4)'
			context.beginPath()
			context.arc(
				play_button_x + play_button_radius,
				play_button_y + play_button_radius,
				play_button_radius,
				0, PI + PI
			)
			context.fill()
		}

		context.fillStyle = title_color
		context.strokeStyle = 'black'
		context.font = play_button_font
		context.lineWidth = 2
		context.fillText("Play", play_button_x + 15, play_button_y + play_button_radius * 1.2)
		context.strokeText("Play", play_button_x + 15, play_button_y + play_button_radius * 1.2)
	}

	keyUp(event) {

	}

	keyDown(event) {

	}

	mouseUp(event) {
		if (play_button_down) {
			current_stage = game_stage
			play_button_down = false
		}
	}

	mouseDown(event) {
		if (clickedPlayButton()) {
			play_button_down = true
			game_stage.init()
		}
	}
}

function clickedPlayButton() {
	const dx = mouseX - play_button_x - play_button_radius
	const dy = mouseY - play_button_y - play_button_radius
	return dx * dx + dy * dy <= play_button_radius * play_button_radius
}
