export default class Particle {
    constructor(c, x = undefined, y = undefined, directionX = undefined, directionY = undefined, size = undefined, color) {
        this.canvasNode = c.canvas;
        this.ctx = c.ctx;
        this.size = size || (Math.random() * 20) + 1;
        this.x = x || (Math.random() * ((innerWidth - this.size * 2) - (this.size * 2)) + this.size * 2);
        this.y = y || (Math.random() * ((innerHeight - this.size * 2) - (this.size * 2)) + this.size * 2);
        this.directionX = directionX || (Math.random() * 2) - 1;
        this.directionY = directionY || (Math.random() * 2) - 1;

        this.color = color || 'gold';
        this.speedX = this.directionX;
        this.speedY = this.directionY;

        this.updateCallbacks = [];
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update() {

        if (this.x > this.canvasNode.width || this.x < 0) {
            this.directionX = -this.directionX;
            this.speedX = this.directionX;
        }
        if (this.y + this.size > this.canvasNode.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
            this.speedY = this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.updateCallbacks.map((updateCallback) => {
            updateCallback(this)
        })

        this.draw();
    }

    setUpdateCallbacks(updateCallback) {
        //if (typeof this.updateCallback === 'function') {
            this.updateCallbacks.push(updateCallback)
        //}
    }
}