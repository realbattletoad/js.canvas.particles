import Particle from "./particle.js";

export default class BlueParticle extends Particle{


    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.size,0,Math.PI * 2, false);

        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
    }
}