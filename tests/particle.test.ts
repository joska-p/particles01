import { Particle } from "../src/components/particle"
import { Point } from "../src/components/point"
import { beforeAll, describe, expect, test, vi } from "vitest"

describe("particle", () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <div id="parent" style="width: 100px; height: 100px;">
          <canvas id="canvas"></canvas>
        </div>
        `
  })

  test("create new particle providing all properties", () => {
    const particle = new Particle({
      position: new Point(1, 2),
      size: 10,
      strokeColor: "red",
      strokeWidth: 2,
      fillColor: "blue",
    })
    expect(particle.position.x).toBe(1)
    expect(particle.position.y).toBe(2)
    expect(particle.size).toBe(10)
    expect(particle.strokeColor).toBe("red")
    expect(particle.strokeWidth).toBe(2)
    expect(particle.fillColor).toBe("blue")
  })

  test("create new particle providing no properties", () => {
    const particle = new Particle({})
    expect(particle.position.x).toBe(1)
    expect(particle.position.y).toBe(1)
    expect(particle.size).toBe(10)
    expect(particle.strokeColor).toBe("transparent")
    expect(particle.strokeWidth).toBe(1)
    expect(particle.fillColor).toBe("teal")
  })

  test("draw rectangle", () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    const fillRectSpy = vi.spyOn(ctx, "fillRect")
    const strokeRectSpy = vi.spyOn(ctx, "strokeRect")

    const particle = new Particle({
      position: new Point(1, 2),
      size: 10,
      strokeColor: "#ff0000",
      strokeWidth: 2,
      fillColor: "#00ff00",
    })
    particle.drawRectangle(ctx)

    expect(fillRectSpy).toBeCalledWith(1, 2, 10, 10)
    expect(strokeRectSpy).toBeCalledWith(1, 2, 10, 10)
    expect(ctx.fillStyle).toBe(particle.fillColor)
    expect(ctx.strokeStyle).toBe(particle.strokeColor)
    expect(ctx.lineWidth).toBe(2)
  })

  test("draw ellipse", () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    const ellipseSpy = vi.spyOn(ctx, "ellipse")

    const particle = new Particle({
      position: new Point(1, 2),
      size: 10,
      strokeColor: "#ff0000",
      strokeWidth: 2,
      fillColor: "#00ff00",
    })
    particle.drawEllipse(ctx)

    expect(ellipseSpy).toBeCalledWith(1, 2, 5, 5, 0, 0, 2 * Math.PI)
    expect(ctx.fillStyle).toBe(particle.fillColor)
    expect(ctx.strokeStyle).toBe(particle.strokeColor)
    expect(ctx.lineWidth).toBe(2)
  })
})
