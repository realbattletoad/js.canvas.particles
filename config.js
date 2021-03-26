export default class Config {
    constructor() {
        this.collisionNodeId = 'collision'
        this.mouseGravityNodeId = 'mouseGravity'
        this.drawLinesNodeId = 'drawLines'
        this.reset()
        this.initListeners()
    }

    getConfig() {
        return {
            'collision': this.collision,
            'mouseGravity': this.mouseGravity,
            'drawLines': this.drawLines
        }
    }

    initListeners() {
        Object.entries(this.getConfig()).map((nodeName, v) => {
            let f = 'get' + nodeName[0].charAt(0).toUpperCase() + nodeName[0].slice(1) + 'Node'
            let node = this[f]()
            node.addEventListener('change', () => {
                if (node.checked === true) {
                    this[nodeName[0]] = true
                } else {
                    this[nodeName[0]] = false
                    node.checked = false
                }
            })
        })
    }

    reset() {
        this.collision = false
        this.getCollisionNode().checked = false

        this.mouseGravity = false
        this.getMouseGravityNode().checked = false

        this.drawLines = false
        this.getDrawLinesNode().checked = false
    }

    getCollisionNode() {
        return document.getElementById(this.collisionNodeId);
    }

    getMouseGravityNode() {
        return document.getElementById(this.mouseGravityNodeId);
    }

    getDrawLinesNode() {
        return document.getElementById(this.drawLinesNodeId);
    }
}