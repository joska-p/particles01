import { Particle } from './particle.js'
import { throttle, getParentSize } from './utils.js'
import { Vector2 } from './vector2.js'
import { drawEllipse } from './draw.js'

class Effect {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly particles: Particle[]
  private readonly debug: boolean
  public scale: Vector2
  private isScaled: boolean

  constructor ({ id = '', scale = new Vector2(50, 50), debug = false }) {
    this.canvas = document.getElementById(id) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.particles = []
    this.debug = debug
    this.scale = scale

    this.isScaled = false
  }

  #getSnapPoint (position: Vector2): Vector2 {
    return new Vector2(
      Math.floor(position.x / this.scale.x) * this.scale.x,
      Math.floor(position.y / this.scale.y) * this.scale.y
    )
  }

  #resizeCanvas (): void {
    // the canvas need to be resize to the closest multiple of the scale that fits the parent
    const { x, y } = this.#getSnapPoint(getParentSize(this.canvas))
    this.canvas.width = x
    this.canvas.height = y

    this.#update()
  }

  #getMousePosition (event: MouseEvent): Vector2 {
    const x = event.clientX - this.canvas.offsetLeft
    const y = event.clientY - this.canvas.offsetTop

    return new Vector2(x, y)
  }

  #handlePointerClick (event: MouseEvent): void {
    const offset = this.scale.div(2)
    const position = this.#getSnapPoint(this.#getMousePosition(event)).add(offset)
    this.#addParticle(new Particle({ position, size: this.scale }))
  }

  #handleChangeScale (event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.scale = new Vector2(Number(value), Number(value))
    this.isScaled = true
    this.#resizeCanvas()
    this.#update()
  }

  #initEventsListener (): void {
    // change scale
    const initialScaleInput = document.getElementById('initial-scale') as HTMLInputElement
    initialScaleInput.addEventListener('change', this.#handleChangeScale.bind(this))

    // resize canvas
    window.addEventListener('resize', throttle(this.#resizeCanvas.bind(this), 100) as EventListener)

    // click on canvas
    this.canvas.addEventListener('click', throttle(this.#handlePointerClick.bind(this), 100) as EventListener)
  }

  #addParticle (particle: Particle): void {
    this.particles.push(particle)
    particle.draw(this.ctx, drawEllipse)
  }

  #draw (): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const particle of this.particles) {
      if (this.isScaled) {
        const offset = this.scale.div(2)
        particle.position = this.#getSnapPoint(particle.position).add(offset)
        particle.size = this.scale
      }
      particle.draw(this.ctx, drawEllipse)
    }

    if (this.debug) this.#drawDebug()
  }

  #drawDebug (): void {
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.strokeStyle = '#ff0000'
    this.ctx.globalAlpha = 0.2

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

  #update (): void {
    this.#draw()
  }

  init (): void {
    this.#resizeCanvas()
    this.#initEventsListener()
    this.#update()
  }
}

export { Effect }
