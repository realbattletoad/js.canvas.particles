import Particle from "./particle.js";
import Mouse from "./mouse.js";
import Keyboard from "./keyboard.js";
import Collision from "./collision.js";
import Config from "./config.js";

export default class Scene {
    constructor(c) {
        this.canvasNode = c.canvas
        this.ctx = c.ctx
        this.mouse = new Mouse(c)
        this.keyboard = new Keyboard()
        this.config = new Config()
        this.collision = new Collision()
        this.particleArray = []
    }

    connect() {
        let opacityValue = 1;
        for (let a = 0; a < this.particleArray.length; a++) {
            for (let b = a; b < this.particleArray.length; b++) {
                let distance = ((this.particleArray[a].x - this.particleArray[b].x) * (this.particleArray[a].x - this.particleArray[b].x))
                    + ((this.particleArray[a].y - this.particleArray[b].y) * (this.particleArray[a].y - this.particleArray[b].y));
                if (distance < (this.canvasNode.width / 7) * (this.canvasNode.height / 7)) {
                    opacityValue = 1 - (distance / 10000);
                    this.ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                    this.ctx.beginPath();
                    this.ctx.lineWidth = 5;
                    this.ctx.moveTo(this.particleArray[a].x, this.particleArray[a].y);
                    this.ctx.lineTo(this.particleArray[b].x, this.particleArray[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    init() {
        let numberOfParticles = (this.canvasNode.height * this.canvasNode.width) / 8000;

        for (let i = 0; i < numberOfParticles; i++) {
            this.particleArray.push(
                new Particle({
                    'canvas': this.canvasNode,
                    'ctx': this.ctx
                })
            );
        }

        this.particleArray.map((p) => {
            p.setUpdateCallbacks((e) => {
                if (this.config.mouseGravity) {
                    this.mouse.addGravity(e)
                }
                this.keyboard.addGravity(e)
                //this.config.addCollision(this.particleArray)
            });
        })
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.particleArray.map((p) => {
            p.update()
        })

        if (this.config.drawLines) {
            this.connect()
        }
        if (this.config.collision) {
            this.collision.addCollision(this.particleArray)
        }
    }
}