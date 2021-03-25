import Canvas from './canvas.js'
import Scene from './scene.js'

const scene = new Scene(
    new Canvas('canvas')
)

scene.init()
scene.animate()