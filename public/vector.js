/*
class vector:
fields: x, y

add: add two vectors
sub: subtract two vectors
dot: self, other
mag: magnitude of the vector
set_angle: set_angle of the vector
rotate(angle): rotate vector by angle

*/

class Vector {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	negative() {
		return new Vector(-this.x, -this.y)
	}

	add(v) {
		return new Vector(this.x + v.x, this.y + v.y)
	}

	subtract(v) {
		return new Vector(this.x - v.x, this.y - v.y)
	}

	multiply(s) {
		return new Vector(this.x * s, this.y * s)
	}

	equals(v) {
		return this.x == v.x && this.y == v.y;
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}

	mag() {
		return Math.sqrt(this.dot(this));
	}

	setAngle(a){
		magnitude = this.mag()
		this.x = Math.cos(a) * magnitude
		this.y = Math.sin(a) * magnitude
	}

	rotate(a){
		b = this.getAngle()
		this.setAngle(a + b)
	}

	min() {
		return Math.min(this.x, this.y);
	}

	max() {
		return Math.max(this.x, this.y);
	}

	getAngle() {
		return Math.atan2(this.y, this.x);
	}

	toArray() {
		return [this.x, this.y]
	}

	clone() {
		return new Vector(this.x, this.y);
	}

	static fromAngle(angle, mag){
		const x = Math.cos(angle) * mag
		const y = Math.sin(angle) * mag
		return new Vector(x, y)
	}

	distFromPos(pos) {
		const dx = pos.x - this.x
		const dy = pos.y - this.y
		return Math.sqrt(dx * dx + dy * dy)
	}

}
