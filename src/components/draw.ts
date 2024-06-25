import { Vector2 } from './vector2.js'

interface DrawOptions {
  ctx: CanvasRenderingContext2D
  position: Vector2
  size?: Vector2
  stroke?: { color: string, width: number }
  fill?: { color: string }
}

export type DrawFunction = (options: DrawOptions) => void

const drawRectangle: DrawFunction = ({
  ctx,
  position,
  size = new Vector2(1, 1),
  stroke = { color: 'red', width: 1 },
  fill = { color: 'transparent' }
}) => {
  ctx.strokeStyle = stroke.color
  ctx.lineWidth = stroke.width
  ctx.fillStyle = fill.color
  ctx.fillRect(position.x, position.y, size.x, size.y)
  ctx.strokeRect(position.x, position.y, size.x, size.y)
}

const drawEllipse: DrawFunction = ({
  ctx,
  position,
  size = new Vector2(1, 1),
  stroke = { color: 'red', width: 1 },
  fill = { color: 'transparent' }
}) => {
  ctx.strokeStyle = stroke.color
  ctx.lineWidth = stroke.width
  ctx.fillStyle = fill.color
  ctx.beginPath()
  ctx.ellipse(position.x, position.y, size.x / 2, size.y / 2, 0, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()
}

export { drawRectangle, drawEllipse }
