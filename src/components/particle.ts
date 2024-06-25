import { Vector2 } from './vector2.js'
import type { DrawFunction } from './draw.js'

class Particle {
  position: Vector2
  size: Vector2
  strokeColor: string
  strokeWidth: number
  fillColor: string

  constructor ({
    position = new Vector2(0, 0),
    size = new Vector2(1, 1),
    strokeColor = 'red',
    strokeWidth = 1,
    fillColor = 'transparent'
  }) {
    this.position = position
    this.size = size
    this.strokeColor = strokeColor
    this.strokeWidth = strokeWidth
    this.fillColor = fillColor
  }

  draw (ctx: CanvasRenderingContext2D, drawFunction: DrawFunction): void {
    const { position, size, strokeColor, strokeWidth, fillColor } = this
    drawFunction({
      ctx,
      position,
      size,
      stroke: { color: strokeColor, width: strokeWidth },
      fill: { color: fillColor }
    })
  }
}

export { Particle }
