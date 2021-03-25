export default class Keyboard{
    constructor() {
        this.step = 10
        this.reset()
        this.initListeners()
    }

    reset(){
        this.l = false
        this.r = false
        this.u = false
        this.d = false
    }

    initListeners() {
        window.addEventListener("keydown", (e) => {this.keyDownUp(e.type, e.keyCode)});
        window.addEventListener("keyup", (e) => {this.keyDownUp(e.type, e.keyCode)});
    }

    keyDownUp (type, key_code) {
        this.reset()
        if (type == "keydown"){
            switch(key_code) {
                case 37: this.l = true; break;
                case 38: this.u = true; break;
                case 39: this.r = true; break;
                case 40: this.d = true; break;
            }
        }
    }

    addGravity(el) {
        el.x += this.l ? -(this.step) : (this.r ? this.step : 0)
        el.y += this.u ? -(this.step) : (this.d ? this.step : 0)
        //this.reset()
    }
}