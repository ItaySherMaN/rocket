/*
class ball:
pos: vector
vel: velocity vector
*/
class Ball {
    constructor(pos, vel, mass) {
        this.pos = pos
        this.vel = vel
        this.mass = mass
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
