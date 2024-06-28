import { Particle } from "./particle.js"
import { getParentSize } from "./utils.js"
import { Point } from "./point.js"

interface EffectOptions {
  canvas: HTMLCanvasElement
  zoom?: {
    x: number
    y: number
  }
}

class Effect {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public particles: Particle[]
  public debug: boolean
  public zoom: Point
  public pointer: Particle | null

  constructor({ canvas, zoom = { x: 20, y: 20 } }: EffectOptions) {
    if (!(canvas instanceof HTMLCanvasElement)) throw new Error("canvas is not a HTMLCanvasElement")

    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
    this.debug = false
    this.zoom = new Point(zoom.x, zoom.y)
    this.pointer = null
    this.particles = []
  }

  handleResize(): void {
    const { x, y } = getParentSize(this.canvas)
    this.canvas.width = x
    this.canvas.height = y
  }

  getMousePosition(event: MouseEvent): Point {
    const x = event.clientX - this.canvas.offsetLeft
    const y = event.clientY - this.canvas.offsetTop
    return new Point(x, y)
  }

  handleMouseEnter(event: MouseEvent): void {
    this.pointer = new Particle({
      position: this.getMousePosition(event),
      size: this.zoom,
      strokeColor: "transparent",
      strokeWidth: 1,
      fillColor: "turquoise",
    })
  }

  handleMouseMove(event: MouseEvent): void {
    if (this.pointer === null) return
    this.pointer.position = this.getMousePosition(event)
  }

  handleMouseOut(): void {
    this.pointer = null
  }

  handleMouseClick(): void {
    if (this.pointer === null) return
    this.particles.push(new Particle({ position: this.pointer.position, size: this.zoom }))
  }

  handleZoom(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.zoom = new Point(Number(value), Number(value))
    this.particles.forEach(particle => {
      particle.size = this.zoom
    })

    this.handleResize()
  }

  handleControls(): void {
    const controls = document.getElementById("controls") as HTMLFormElement
    if (controls === null) throw new Error("controls is required")

    const uiZoom = controls.querySelector("#zoom") as HTMLInputElement
    if (uiZoom === null) throw new Error("uiZoom is required")
    const uiDebug = controls.querySelector("#debug") as HTMLInputElement
    if (uiDebug === null) throw new Error("uiDebug is required")
    const uiClear = controls.querySelector("#clear") as HTMLInputElement
    if (uiClear === null) throw new Error("uiClear is required")

    uiZoom.addEventListener("change", this.handleZoom.bind(this))
    uiDebug.addEventListener("change", (event: Event) => {
      const checked = (event.target as HTMLInputElement).checked
      this.debug = checked ? true : false
    })
    uiClear.addEventListener("click", () => {
      this.particles = []
    })
  }

  handleEventsListeners(): void {
    this.handleControls()

    window.addEventListener("resize", this.handleResize.bind(this))
    this.canvas.addEventListener("click", this.handleMouseClick.bind(this))
    this.canvas.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this))
    this.canvas.addEventListener("mouseout", this.handleMouseOut.bind(this))
  }

  draw(): void {
    this.particles.forEach(particle => {
      particle.drawEllipse(this.ctx)
    })

    if (this.debug) this.drawDebug()
  }

  drawDebug(): void {
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.strokeStyle = "#ff0000"
    this.ctx.globalAlpha = 0.5

    for (let x = 0; x < this.canvas.width; x += this.zoom.x) {
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.canvas.height)
    }
    for (let y = 0; y < this.canvas.height; y += this.zoom.y) {
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.canvas.width, y)
    }
    this.ctx.stroke()

    this.ctx.restore()
  }

  update(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()
    if (this.pointer !== null) this.pointer.drawEllipse(this.ctx)
  }

  init(): void {
    this.handleResize()
    this.handleEventsListeners()
  }
}

export { Effect }
