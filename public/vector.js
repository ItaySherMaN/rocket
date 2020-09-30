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

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }
}
