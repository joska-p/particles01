import { Vector2 } from "./vector2.js"

interface ParticleOptions {
  position?: { x: number; y: number }
  radius?: number
  color?: string
}

class Particle {
  position: Vector2
  radius: number
  color: string

  constructor({ position = new Vector2(0, 0), radius = 10, color = "red" }: ParticleOptions) {
    this.position = new Vector2(position.x, position.y)
    this.radius = radius
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
  }
}

export { Particle }
