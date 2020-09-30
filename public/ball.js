/*
class ball:
pos: vector
vel: velocity vector
*/
class Ball {
    static G = 1

    constructor(pos, vel, radius) {
        this.pos = pos
        this.vel = vel
        this.radius = radius
        this.mass = Ball.G * this.radius * this.radius
    }

    update() {

    }

    static collide(ball_1, ball_2) {
        const m1 = ball_1.mass
        const m2 = ball_2.mass
        const sm = m1 + m2
        let v1 = ball_1.vel
        let v2 = ball_2.vel
        const pos_diff = ball_1.pos.subtract(ball_2.pos)
        const pos_diff_sq = pos_diff.dot(pos_diff)
        v1 = p.multiply(pos_diff.dot(v1) / pos_diff_sq)
        const v1_p = ball_1.vel.subtract(v1)
        v2 = p.multiply(pos_diff.dot(v2) / pos_diff_sq)
        const v2_p = ball_2.vel.subtract(v2)
        const u1 = v1.multiply(((m1 - m2) / sm)).add(v2.multiply((m2 + m2) / sm))
        const u2 = v1.multiply((m1 + m1) / sm).add(v2.multiply((m2 - m1) / sm))
        ball_1.vel = u1.add(v1_p)
        ball_2.vel = u2.add(v2_p)
    }
}


function right_time(ball_1, ball_2) {
    const a1 = ball_1.pos.x
    const a2 = ball_1.vel.x
    const a3 = ball_2.pos.x
    const a4 = ball_2.vel.x
    const a5 = ball_1.pos.y
    const a6 = ball_1.vel.y
    const a7 = ball_2.pos.y
    const a8 = ball_2.vel.y
    const a9 = ball_1.radius
    const a10 = ball_2.radius

    const a = a2*a2 - 2*a2*a4 + a4*a4 + a6*a6 - 2*a6*a8 + a8*a8
    const b = 2*a1*a2 - 2*a2*a3 - 2*a1*a4 + 2*a3*a4 + 2*a5*a6 - 2*a6*a7 - 2*a5*a8 + 2*a7*a8
    const c = a1*a1 - 2*a1*a3 + a3*a3 + a5*a5 - 2*a5*a7 + a7*a7 - a9*a9 - 2*a9*a10 - a10*a10

    // const first = (-b + Math.sqrt(b*b - 4*a*c)) / (a+a)
    const second = (-b - Math.sqrt(b*b - 4*a*c)) / (a+a)
    return second
}
