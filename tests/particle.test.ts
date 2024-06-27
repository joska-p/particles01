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
      size: new Point(3, 4),
      strokeColor: "red",
      strokeWidth: 2,
      fillColor: "blue",
    })
    expect(particle.position.x).toBe(1)
    expect(particle.position.y).toBe(2)
    expect(particle.size.x).toBe(3)
    expect(particle.size.y).toBe(4)
    expect(particle.strokeColor).toBe("red")
    expect(particle.strokeWidth).toBe(2)
    expect(particle.fillColor).toBe("blue")
  })

  test("create new particle providing no properties", () => {
    const particle = new Particle()
    expect(particle.position.x).toBe(0)
    expect(particle.position.y).toBe(0)
    expect(particle.size.x).toBe(1)
    expect(particle.size.y).toBe(1)
    expect(particle.strokeColor).toBe("transparent")
    expect(particle.strokeWidth).toBe(1)
    expect(particle.fillColor).toBe("teal")
  })

  test("draw rectangle", () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    // need to spy on ctx methods call
    const fillRectSpy = vi.spyOn(ctx, "fillRect")
    const strokeRectSpy = vi.spyOn(ctx, "strokeRect")

    const particle = new Particle({
      position: new Point(1, 2),
      size: new Point(3, 4),
      strokeColor: "#ff0000",
      strokeWidth: 2,
      fillColor: "#00ff00",
    })

    particle.drawRectangle(ctx)

    expect(ctx.fillStyle).toBe(particle.fillColor)
    expect(ctx.strokeStyle).toBe(particle.strokeColor)
    expect(ctx.lineWidth).toBe(2)
    expect(fillRectSpy).toBeCalledWith(1, 2, 3, 4)
    expect(strokeRectSpy).toBeCalledWith(1, 2, 3, 4)
  })

  test("draw ellipse", () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    // need to spy on ctx methods call
    const fillSpy = vi.spyOn(ctx, "fill")
    const strokeSpy = vi.spyOn(ctx, "stroke")

    const particle = new Particle({
      position: new Point(1, 2),
      size: new Point(3, 4),
      strokeColor: "#ff0000",
      strokeWidth: 2,
      fillColor: "#00ff00",
    })

    particle.drawEllipse(ctx)

    expect(ctx.fillStyle).toBe(particle.fillColor)
    expect(ctx.strokeStyle).toBe(particle.strokeColor)
    expect(ctx.lineWidth).toBe(2)
    expect(fillSpy).toBeCalledWith()
    expect(strokeSpy).toBeCalledWith()
  })
})
