import { Particle } from "./particle.js"
import { getParentSize } from "./utils.js"
import { Vector2 } from "./vector2.js"
import { drawEllipse } from "./draw.js"

class Effect {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private particles: Particle[]
  private debug: boolean
  public zoom: Vector2

  constructor({ id = "", scale: zoom = { x: 20, y: 20 } }) {
    if (id === "") throw new Error("id is required")
    this.canvas = document.getElementById(id) as HTMLCanvasElement
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
    this.particles = []
    this.debug = false
    this.zoom = new Vector2(zoom.x, zoom.y)

    this.#resizeCanvas()
    this.#initEventsListener()
  }

  #getSnapPoint(position: Vector2): Vector2 {
    return new Vector2(
      Math.floor(position.x / this.zoom.x) * this.zoom.x,
      Math.floor(position.y / this.zoom.y) * this.zoom.y
    ).add(this.zoom.div(2))
  }

  #resizeCanvas(): void {
    // the canvas need to be resize to the closest multiple of the scale that fits the parent
    const { x, y } = this.#getSnapPoint(getParentSize(this.canvas))
    this.canvas.width = x
    this.canvas.height = y
  }

  #getMousePosition(event: MouseEvent): Vector2 {
    const x = event.clientX - this.canvas.offsetLeft
    const y = event.clientY - this.canvas.offsetTop

    return this.#getSnapPoint(new Vector2(x, y))
  }

  #handleMouseOver(event: MouseEvent): void {
    const pointerPosition = this.#getMousePosition(event)
    drawEllipse({ ctx: this.ctx, position: pointerPosition, size: this.zoom })
  }

  #handleMouseMove(event: MouseEvent): void {
    this.#handleMouseOver(event)
  }

  #handleMouseLeave(): void {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  #handlePointerClick(event: MouseEvent): void {
    const position = this.#getMousePosition(event)
    this.#addParticle(new Particle({ position, size: this.zoom }))
  }

  #handleChangeScale(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.zoom = new Vector2(Number(value), Number(value))
  }

  #handleControls(): void {
    const controls = document.getElementById("controls") as HTMLFormElement
    if (controls === null) throw new Error("controls is required")

    const uiZoom = controls.querySelector("#zoom") as HTMLInputElement
    if (uiZoom === null) throw new Error("uiZoom is required")
    const uiDebug = controls.querySelector("#debug") as HTMLInputElement
    if (uiDebug === null) throw new Error("uiDebug is required")
    const uiClear = controls.querySelector("#clear") as HTMLInputElement
    if (uiClear === null) throw new Error("uiClear is required")

    uiZoom.addEventListener("change", this.#handleChangeScale.bind(this))
    uiDebug.addEventListener("change", () => {
      this.debug = !this.debug
    })
    uiClear.addEventListener("click", () => {
      this.particles = []
    })
  }

  #initEventsListener(): void {
    // controls
    this.#handleControls()
    // resize canvas
    window.addEventListener("resize", this.#resizeCanvas.bind(this))

    // click on canvas
    this.canvas.addEventListener("click", this.#handlePointerClick.bind(this))
    // mouseover on canvas
    this.canvas.addEventListener("mouseover", this.#handleMouseOver.bind(this))
    // mousemove on canvas
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this))
    // mouseleave on canvas
    this.canvas.addEventListener("mouseleave", this.#handleMouseLeave.bind(this))
  }

  #addParticle(particle: Particle): void {
    this.particles.push(particle)
    particle.draw(this.ctx, drawEllipse)
  }

  #draw(): void {
    this.particles.forEach(particle => {
      particle.position = this.#getSnapPoint(particle.position)
      particle.size = this.zoom

      // draw the point
      particle.draw(this.ctx, drawEllipse)
    })

    if (this.debug) this.#drawDebug()
  }

  #drawDebug(): void {
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.strokeStyle = "#ff0000"
    this.ctx.globalAlpha = 0.2

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

  public update(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.#draw()
  }
}

export { Effect }
