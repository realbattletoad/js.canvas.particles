export default class Config {
    constructor() {
    }

    addCollision(particleArray) {
        for (let i = 0; i < particleArray.length; i++) {
            for (let j = i + 1; j < particleArray.length; j++) {

                let a = particleArray[i]
                let b = particleArray[j]

                let dx = Math.abs(a.x - b.x)
                let dy = Math.abs(a.y - b.y)
                let distance = Math.round(Math.sqrt(dx * dx + dy * dy))
                let sizeDiff = Math.round(a.size + b.size)

                if (distance <= sizeDiff) {
                    //object inside each other
                    if (distance < sizeDiff) {
                        continue
                    }

                    [a.directionX, b.directionX] = this.calcSpeeds(a.size, b.size, a.directionX, b.directionX);
                    [a.directionY, b.directionY] = this.calcSpeeds(a.size, b.size, a.directionY, b.directionY);

                    // a.x -= Math.sign(a.directionX);
                    // a.y -= Math.sign(a.directionY);
                    // b.x -= Math.sign(b.directionX);
                    // b.y -= Math.sign(b.directionY);
                }
            }
        }
    }

    calcSpeeds(m1, m2, u1, u2) {
        let s1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2)
        let s2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2)
        return [s1, s2]
    }
}