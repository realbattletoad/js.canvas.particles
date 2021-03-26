export default class Config {
    constructor() {
        this.collisionNodeId = 'collision'
        this.collision = false
        this.initListeners()
    }

    initListeners() {
        const node = this.getCollisionNode()
        node.addEventListener('change', () => {
            if (node.checked === true) {
                this.collision = true
            } else {
                this.reset()
            }
            console.log('collision', this.collision)
        })
    }

    reset() {
        this.collision = false
        this.getCollisionNode().checked = false
    }

    getCollisionNode() {
        return document.getElementById(this.collisionNodeId);
    }

    addCollision(particleArray) {
        if (!this.collision){
            return;
        }
        for (let i = 0; i < particleArray.length; i++) {
            for (let j = i+1; j < particleArray.length; j++) {

                let a = particleArray[i]
                let b = particleArray[j]

                let dx = a.x - b.x;
                let dy = a.y - b.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                //console.log(a.radius+b.radius)
                if (distance<= (a.size + b.size)){
                    console.log('coll detected')
                    a.directionX = -1*a.directionX
                    b.directionX = -1*b.directionX
                    a.directionY = -1*a.directionY
                    b.directionY = -1*b.directionY
                }
            }
        }
    }

}