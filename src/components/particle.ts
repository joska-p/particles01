import {Vector2} from './vector2.js'
import type {DrawOptions} from './draw.js'

interface ParticleInterface {
  position: Vector2
  size: Vector2
  strokeColor?: string
  strokeWidth?: number
  fillColor?: string
}

class Particle {
  private position: Vector2
  private size: Vector2
  private strokeColor: string
  private strokeWidth: number
  private fillColor: string

  constructor({
    position,
    size,
    strokeColor = 'red',
    strokeWidth = 1,
    fillColor = 'transparent',
  }: ParticleInterface) {
    this.position = position
    this.size = size
    this.strokeColor = strokeColor
    this.strokeWidth = strokeWidth
    this.fillColor = fillColor
  }

  draw(ctx: CanvasRenderingContext2D, drawFunction: (options: DrawOptions) => void) {
    drawFunction({
      ctx,
      position: this.position,
      size: this.size,
      stroke: {color: this.strokeColor, width: this.strokeWidth},
      fill: {color: this.fillColor},
    })
  }
}

export {Particle}
