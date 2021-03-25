export default class Mouse {
    constructor(c, x, y, radius) {
        this.canvasNode = c.canvas;
        this.setRadius(radius)
        this.setCoords(x, y)
        this.initListeners()
    }

    initListeners() {
        window.addEventListener('mousemove', (e) => {
            this.setCoords(e.x, e.y)
        })

        window.addEventListener('mouseout', () => {
            this.setCoords()
        })

        window.addEventListener('resize', () => {
            this.setRadius()
        })
    }

    setCoords(x = null, y = null) {
        this.x = x ? parseInt(x) : x;
        this.y = y ? parseInt(y) : y;
    }

    setRadius(radius = null) {
        this.radius = radius || ((this.canvasNode.height / 80) * (this.canvasNode.width / 80))
    }

    addGravity(el) {
        let dx = this.x - el.x;
        let dy = this.y - el.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + el.size) {
            if (this.x < el.x && el.x < this.canvasNode.width - el.size * 10) {
                el.x += 10;
            }
            if (this.x > el.x && el.x > el.size * 10) {
                el.x -= 10;
            }
            if (this.y < el.y && el.y < this.canvasNode.height - el.size * 10) {
                el.y += 10;
            }
            if (this.y > el.y && el.y > el.size * 10) {
                el.y -= 10;
            }
        }
    }
}