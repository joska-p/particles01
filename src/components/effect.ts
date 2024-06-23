import { Particle } from "./particle.js"
import { throttle } from "./utils.js"

class Effect {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  particles: Array<Particle>

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    this.particles = []
  }

  #handlePointerClick(event: MouseEvent) {
    const pixelX = event.clientX - this.canvas.offsetLeft
    const pixelY = event.clientY - this.canvas.offsetTop
    this.particles.push(new Particle({ position: { x: pixelX, y: pixelY } }))
    console.log(this.particles)
    this.update()
  }

  #initEventsListener() {
    this.canvas.addEventListener("click", throttle(this.#handlePointerClick.bind(this), 100))
  }

  draw() {
    for (const particle of this.particles) {
      particle.draw(this.ctx)
    }
  }

  update() {
    this.draw()
  }

  init() {
    this.#initEventsListener()
  }
}

export { Effect }
