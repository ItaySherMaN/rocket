
// your constants here

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
	ship.update2(planets, coin)
}

function render() {
    renderBackground()
    renderShip()
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
    console.log(x, y, w, h, angle)
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

function run() {
	update()
	render()

	requestAnimationFrame(run)
}

Promise.all([loadImage('rocket_model_no_fire.png')]).then(images => {
    setup(images)
    init()
    run()
})
