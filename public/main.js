
// your constants here
const image_width = 600
const image_height = 400

// your dynamic letiables here
let ship = null
let planets = null
let rocket_model_no_fire = null

function setup(images) {
	rocket_model_no_fire = images[0]
}

function init() {
    ship = new Ship(width / 2, height / 2)
    //p1 = new Planet(...)
    //p2 = new Planet(...)
    //planets = [p1, p2]
    //coin = new Coin(...)
}

function update() {
	planets = null
	coin = null
	ship.update(planets, coin)
}

function render() {
	context.fillStyle = 'rgb(53, 32, 106)'
    context.fillRect(0, 0, width, height)
    x = ship.pos.x
    y = ship.pos.y
    angleInRadians = ship.dir
    context.translate(x, y);
	context.rotate(angleInRadians);
	context.drawImage(rocket_model_no_fire, -width / 2, -height / 2, width, height);
	context.rotate(-angleInRadians);
	context.translate(-x, -y);
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

const loadImage = function(url) {
	return new Promise((resolve, reject) => {
		const image = new Image()

		image.addEventListener('load', () => {
			resolve(image)
		})

		image.src = url
	})
}

Promise.all([loadImage('rocket_model_no_fire.png')]).then(images => {
    setup(images)
    init()
    run()
})

function run() {
	update()
	render()

	requestAnimationFrame(run)
}
