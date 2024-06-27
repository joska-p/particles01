import { Point } from "./point.js"

class Particle {
  position: Point
  size: Point
  strokeColor: string
  strokeWidth: number
  fillColor: string

  constructor({
    position = new Point(0, 0),
    size = new Point(1, 1),
    strokeColor = "transparent",
    strokeWidth = 1,
    fillColor = "teal",
  }) {
    this.position = position
    this.size = size
    this.strokeColor = strokeColor
    this.strokeWidth = strokeWidth
    this.fillColor = fillColor
  }

  drawRectangle = (ctx: CanvasRenderingContext2D): void => {
    ctx.strokeStyle = this.strokeColor
    ctx.lineWidth = this.strokeWidth
    ctx.fillStyle = this.fillColor
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y)
  }

  drawEllipse = (ctx: CanvasRenderingContext2D): void => {
    ctx.strokeStyle = this.strokeColor
    ctx.lineWidth = this.strokeWidth
    ctx.fillStyle = this.fillColor
    ctx.beginPath()
    ctx.ellipse(
      this.position.x,
      this.position.y,
      this.size.x / 2,
      this.size.y / 2,
      0,
      0,
      2 * Math.PI
    )
    ctx.fill()
    ctx.stroke()
  }
}

export { Particle }
