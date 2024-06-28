import { Particle } from "./particle.js"
import { getParentSize } from "./utils.js"
import { Point } from "./point.js"

interface EffectOptions {
  canvas: HTMLCanvasElement
  zoom?: number
}

class Effect {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public particles: Particle[]
  public debug: boolean
  public zoom: number
  public pointer: Particle | null
  public uiZoom: HTMLInputElement
  public uiDebug: HTMLInputElement
  public uiClear: HTMLButtonElement

  constructor({ canvas, zoom = 50 }: EffectOptions) {
    this.canvas = canvas
    this.uiZoom = document.getElementById("zoom") as HTMLInputElement
    this.uiDebug = document.getElementById("debug") as HTMLInputElement
    this.uiClear = document.getElementById("clear") as HTMLButtonElement

    if (!(this.canvas instanceof HTMLCanvasElement)) throw new Error("canvas not found")
    if (!(this.uiZoom instanceof HTMLInputElement)) throw new Error("ui zoom not found")
    if (!(this.uiDebug instanceof HTMLInputElement)) throw new Error("ui debug not found")
    if (!(this.uiClear instanceof HTMLButtonElement)) throw new Error("ui clear not found")

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
    this.debug = false
    this.zoom = zoom
    this.pointer = null
    this.particles = []

    // handle events
    this.handleResize()
    this.handleEventsListeners()

    // set ui controls state
    this.uiZoom.value = this.zoom.toString()
    this.uiDebug.checked = this.debug
  }

  getMousePosition(event: MouseEvent): Point {
    const x = event.clientX - this.canvas.offsetLeft
    const y = event.clientY - this.canvas.offsetTop
    return new Point(x, y)
  }

  handleResize(): void {
    const { x, y } = getParentSize(this.canvas)
    this.canvas.width = x
    this.canvas.height = y
  }

  handleZoom(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value)
    this.zoom = Math.min(Math.max(value, 0), 100)
    this.uiZoom.value = this.zoom.toString()
    this.handleResize()
  }

  handleMouseEnter(event: MouseEvent): void {
    this.pointer = new Particle({
      position: this.getMousePosition(event),
      size: 10,
      strokeColor: "transparent",
      strokeWidth: 1,
      fillColor: "turquoise",
    })
  }

  handleMouseMove(event: MouseEvent): void {
    if (this.pointer !== null) this.pointer.position = this.getMousePosition(event)
  }

  handleMouseOut(): void {
    this.pointer = null
  }

  handleMouseClick(): void {
    if (this.pointer === null) return
    this.particles.push(new Particle({ position: this.pointer.position }))
  }

  handleEventsListeners(): void {
    // ui controls
    this.uiZoom.addEventListener("change", this.handleZoom.bind(this))
    this.uiDebug.addEventListener("change", (event: Event) => {
      const checked = (event.target as HTMLInputElement).checked
      this.debug = checked ? true : false
    })
    this.uiClear.addEventListener("click", () => {
      this.particles = []
    })

    // window
    window.addEventListener("resize", this.handleResize.bind(this))

    // mouse
    this.canvas.addEventListener("click", this.handleMouseClick.bind(this))
    this.canvas.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this))
    this.canvas.addEventListener("mouseout", this.handleMouseOut.bind(this))
  }

  drawPointer(): void {
    if (this.pointer === null) return
    this.pointer.drawEllipse(this.ctx)
  }

  drawGrid(): void {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.strokeStyle = "#ff0000"
    this.ctx.globalAlpha = 0.5

    for (let x = 0; x < this.canvas.width; x += this.zoom + 1) {
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.canvas.height)
    }
    for (let y = 0; y < this.canvas.height; y += this.zoom + 1) {
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.canvas.width, y)
    }

    this.ctx.stroke()
    this.ctx.restore()
  }

  draw(): void {
    this.particles.forEach(particle => {
      particle.drawEllipse(this.ctx)
    })

    this.drawPointer()
    this.drawGrid()
  }

  update(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()
    this.drawPointer()
    if (this.debug === true) this.drawGrid
  }
}

export { Effect }
