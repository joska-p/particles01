import {Particle} from './particle.js'
import {throttle, getParentSize} from './utils.js'
import {Vector2} from './vector2.js'
import {drawRectangle, drawEllipse} from './draw.js'

interface EffectProps {
  id: string
  scale?: {x: number; y: number}
  debug?: boolean
}

class Effect {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Array<Particle>
  private debug: boolean
  public scale: Vector2

  constructor({id, scale, debug}: EffectProps) {
    this.canvas = document.getElementById(id) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.particles = []
    this.debug = debug ?? false
    this.scale = scale ? new Vector2(scale.x, scale.y) : new Vector2(50, 50)
  }

  snapToGrid(position: Vector2) {
    return new Vector2(
      Math.floor(position.x / this.scale.x) * this.scale.x,
      Math.floor(position.y / this.scale.y) * this.scale.y
    )
  }

  #handleResizeCanvas() {
    // the canvas need to be resize to the closest multiple of the scale that fits the parent
    const {x, y} = this.snapToGrid(getParentSize(this.canvas))
    this.canvas.width = x
    this.canvas.height = y

    this.#update()
  }

  #getMousePosition(event: MouseEvent) {
    const x = event.clientX - this.canvas.offsetLeft
    const y = event.clientY - this.canvas.offsetTop

    return new Vector2(x, y)
  }

  #handlePointerClick(event: MouseEvent) {
    const offset = this.scale.div(2)
    const position = this.snapToGrid(this.#getMousePosition(event)).add(offset)
    this.#addParticle(new Particle({position, size: this.scale}))
  }

  #initEventsListener() {
    window.addEventListener('resize', throttle(this.#handleResizeCanvas.bind(this), 100))
    this.canvas.addEventListener('click', throttle(this.#handlePointerClick.bind(this), 100))
  }

  #addParticle(particle: Particle) {
    this.particles.push(particle)
    this.#update()
  }

  #draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const particle of this.particles) {
      particle.draw(this.ctx, drawEllipse)
    }

    if (this.debug) this.#drawDebug()
  }

  #drawDebug() {
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

  #update() {
    this.#draw()
  }

  init() {
    this.#handleResizeCanvas()
    this.#initEventsListener()
    this.#update()
  }
}

export {Effect}
