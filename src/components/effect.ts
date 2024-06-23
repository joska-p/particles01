import {Particle} from './particle.js'
import {throttle, getParentSize} from './utils.js'
import {Vector2} from './vector2.js'

interface EffectProps {
  id: string
  debug?: boolean
}

class Effect {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  particles: Array<Particle>
  debug: boolean
  scale: Vector2

  constructor({id, debug}: EffectProps) {
    this.canvas = document.getElementById(id) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.particles = []

    this.debug = debug ?? false
    this.scale = new Vector2(50, 50)
  }

  #resizeCanvas() {
    const {x, y} = getParentSize(this.canvas)

    // the canvas need to be resize to the closest multiple of the scale that fits the parent
    this.canvas.width = Math.ceil(x / this.scale.x) * this.scale.x
    this.canvas.height = Math.ceil(y / this.scale.y) * this.scale.y

    this.update()
  }

  #handlePointerClick(event: MouseEvent) {
    const pixelX = event.clientX - this.canvas.offsetLeft
    const pixelY = event.clientY - this.canvas.offsetTop
    this.particles.push(new Particle({position: new Vector2(pixelX, pixelY), color: '#ff0000'}))
    console.log(this.particles)
    this.update()
  }

  #initEventsListener() {
    window.addEventListener('resize', throttle(this.#resizeCanvas.bind(this), 100))
    this.canvas.addEventListener('click', throttle(this.#handlePointerClick.bind(this), 100))
  }

  draw() {
    for (const particle of this.particles) {
      particle.draw(this.ctx)
    }

    if (this.debug) this.drawDebug()
  }

  drawDebug() {
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.strokeStyle = '#ff0000'
    this.ctx.globalAlpha = 0.5

    for (let x = 0; x < this.canvas.width; x += this.scale.x) {
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.canvas.height)
    }
    for (let y = 0; y < this.canvas.height; y += this.scale.y) {
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.canvas.width, y)
    }
    this.ctx.stroke()

    this.ctx.restore()
  }

  update() {
    this.draw()
  }

  init() {
    this.#resizeCanvas()
    this.#initEventsListener()
    this.update()
  }
}

export {Effect}
