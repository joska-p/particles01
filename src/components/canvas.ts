import { throttle, getParentSize } from "./utils.js"
import { Vector2 } from "./vector2.js"

interface CanvasOptions {
  canvas: HTMLCanvasElement
  scale?: { x: number; y: number }
  color?: string
  debug?: boolean
}

class Canvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  scale: Vector2
  color: string
  debug: boolean

  constructor({ canvas, scale = new Vector2(1, 1), color = "red", debug = false }: CanvasOptions) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    this.color = color
    this.debug = debug
    this.scale = new Vector2(scale.x, scale.y)
  }

  #resizeCanvas() {
    const { x, y } = getParentSize(this.canvas)

    // the canvas need to be resize to the closest multiple of the scale that fits the parent
    this.canvas.width = Math.ceil(x / this.scale.x) * this.scale.x
    this.canvas.height = Math.ceil(y / this.scale.y) * this.scale.y
  }

  draw() {
    this.#resizeCanvas()
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.strokeStyle = this.color
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

  init() {
    this.#resizeCanvas()
    if (this.debug) this.draw()
    window.addEventListener("resize", throttle(this.draw.bind(this), 100))
  }
}

export { Canvas }
