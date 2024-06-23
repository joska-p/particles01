import type {Effect} from './effect.js'
import {Vector2} from './vector2.js'

interface ParticleOptions {
  effect?: Effect
  position?: Vector2
  size?: Vector2
  color?: string
}

class Particle {
  private position: Vector2
  private size: Vector2
  private color: string

  constructor({
    position = new Vector2(0, 0),
    size = new Vector2(10, 10),
    color = 'red',
  }: ParticleOptions) {
    this.position = position
    this.size = size
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.ellipse(
      this.position.x,
      this.position.y,
      this.size.x / 2,
      this.size.y / 2,
      0,
      0,
      2 * Math.PI
    )
    ctx.stroke()
  }
}

export {Particle}
