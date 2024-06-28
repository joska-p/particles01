import { Point } from "./point.js"

interface ParticleOptions {
  position?: Point
  size?: number
  strokeColor?: string
  strokeWidth?: number
  fillColor?: string
}

class Particle {
  public position: Point
  public size: number
  public strokeColor: string
  public strokeWidth: number
  public fillColor: string

  constructor({
    position = new Point(1, 1),
    size = 10,
    strokeColor = "transparent",
    strokeWidth = 1,
    fillColor = "teal",
  }: ParticleOptions) {
    this.position = position
    this.size = size
    this.strokeColor = strokeColor
    this.strokeWidth = strokeWidth
    this.fillColor = fillColor
  }

  public drawRectangle = (ctx: CanvasRenderingContext2D): void => {
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.strokeColor
    ctx.lineWidth = this.strokeWidth
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    ctx.strokeRect(this.position.x, this.position.y, this.size, this.size)
  }

  public drawEllipse = (ctx: CanvasRenderingContext2D): void => {
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.strokeColor
    ctx.lineWidth = this.strokeWidth
    ctx.beginPath()
    ctx.ellipse(this.position.x, this.position.y, this.size / 2, this.size / 2, 0, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }
}

export { Particle }
