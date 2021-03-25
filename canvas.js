export default class Canvas {
    constructor(selector, w = 0, h = 0) {
        this.canvas = document.getElementById(selector);
        this.ctx = this.canvas.getContext("2d");
        this.setSize(w, h);
        this.initListeners();
    }

    initListeners() {
        window.addEventListener('resize',
            () => this.setSize(window.innerWidth, window.innerHeight)
        )
    }

    setSize(w = 0, h = 0) {
        this.canvas.width = w || window.innerWidth;
        this.canvas.height = h || window.innerHeight;

        this.ctx.canvas.width = w || window.innerWidth;
        this.ctx.canvas.height = h || window.innerHeight;
    }
}