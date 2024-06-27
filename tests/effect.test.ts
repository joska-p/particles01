import { Effect } from "../src/components/effect"
import { Particle } from "../src/components/particle"
import { Point } from "../src/components/point"
import { beforeAll, describe, expect, test, vi } from "vitest"

describe("effect", () => {
  beforeAll(() => {
    document.body.innerHTML = `
                <div id="parent" style="width: 100px; height: 100px;">
                    <canvas id="canvas"></canvas>
                </div>
                `
  })

  test("create new effect providing all properties", () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement
    const effect = new Effect({ id: "canvas", scale: { x: 20, y: 20 } })
    expect(effect.canvas).toBe(canvas)
    expect(effect.zoom.x).toBe(20)
    expect(effect.zoom.y).toBe(20)
  })
})
