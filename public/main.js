
// your constants here

// your dynamic letiables here
let focus_ship = false
let ship = null
let planets = null
let rocket_model_no_fire = null

let pause = true

// debug
let balls = null

function generate_balls() {
	// balls = []
	// let angle = 0
	// let r = 3 * width
	// let n = 40
	// for (let i = 0; i < n; ++i) {
	// 	angle = i * 2 * PI / n
	// 	balls.push(new Ball(
	// 		new Vector(width / 2 + r * Math.cos(angle), height / 2 + r * Math.sin(angle)),
	// 		Vector.fromAngle(PI + angle, 10 * Math.random() + 5),
	// 		Math.random() * 60 + 5
	// 	))
	// }

	r = 50
	v = 3
	balls = [
		new Ball(
			new Vector(width / 2 - 400, height / 2),
			new Vector(v, 0),
			r
		),
		new Ball(
			new Vector(width / 2 + 400, height / 2),
			new Vector(0, 0),
			r
		),
		new Ball(
			new Vector(width / 2, height / 2 - 400),
			new Vector(0, v),
			r
		),
		new Ball(
			new Vector(width / 2, height / 2 + 400),
			new Vector(0, -v),
			r
		)


	]
}

function renderBalls() {
	context.fillStyle = 'red'
	context.strokeStyle = 'blue'
	context.lineWidth = 4
	balls.forEach(ball => {
		context.beginPath()
		context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * PI)
		context.fill()

		context.beginPath()
		context.moveTo(ball.pos.x, ball.pos.y)
		context.lineTo(ball.pos.x + 5 * ball.vel.x, ball.pos.y + 5 * ball.vel.y)
		context.stroke()
	})
}
// end debug
function setup(images) {
	rocket_model_no_fire = images[0]

	generate_balls()
}

function init() {
	ship = new Ship(width / 2 - 300, height / 2 - 300)
	
	ship.radius = 31
	ship.mass = 5000
	// balls.push(ship)
	//p1 = new Planet(...)
	//p2 = new Planet(...)
	//planets = [p1, p2]
	//coin = new Coin(...)
}

function update() {
	planets = null
	coin = null
	ship.update2(planets, coin)
	Ball.updateBalls(balls.concat([ship]))
}

function render() {
	renderBackground()
	if (focus_ship) {
		context.translate(width / 2 - ship.pos.x, height / 2 - ship.pos.y)
		renderShip()
		renderBalls()
		context.translate(ship.pos.x - width / 2, ship.pos.y - height / 2)
	} else {
		renderShip()
		renderBalls()
	}
}

function renderBackground() {
	context.fillStyle = 'rgb(53, 32, 106)'
	context.fillRect(0, 0, width, height)
}

function renderShip() {
	const x = ship.pos.x
	const y = ship.pos.y
	const w = Ship.img_width
	const h = Ship.img_height
	const angle = ship.dir
	context.translate(x, y);
	context.rotate(angle);
	context.drawImage(rocket_model_no_fire, -w / 2, -h / 2, w, h);
	context.rotate(-angle);
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

Promise.all([loadImage('rocket_model_no_fire.png')]).then(images => {
	setup(images)
	init()
	run()
})
