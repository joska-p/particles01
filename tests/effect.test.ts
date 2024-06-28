import { Point } from "../src/components/point"
import { Effect } from "../src/components/effect"
import { beforeAll, describe, expect, test, vi } from "vitest"

describe("effect", () => {
  beforeAll(() => {
    document.body.innerHTML = `<div id="parent"><canvas id="canvas">why it doesn't work?</canvas></div>`
  })

  describe("When i create a new effect with a wrong id", () => {
    const notACanvas = document.getElementById("parent") as HTMLCanvasElement
    test("It should throw an error", () => {
      expect(() => {
        new Effect({ canvas: notACanvas })
      }).toThrow()
    })
  })

  describe("When i create a new effect with a valid id", () => {
    test("it should return a new instance of Effect with default values", () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement
      expect(() => {
        new Effect({ canvas })
      }).not.toThrow()

      const effect = new Effect({ canvas })
      expect(effect).toBeInstanceOf(Effect)

      expect(effect.canvas).toBeInstanceOf(HTMLCanvasElement)
      expect(effect.ctx).toBeInstanceOf(CanvasRenderingContext2D)
      expect(effect.debug).toBe(false)
      expect(effect.zoom).toBeInstanceOf(Point)
      expect(effect.pointer).toBe(null)
      expect(effect.particles).toBeInstanceOf(Array)

      expect(effect.particles.length).toBe(0)
      expect(effect.zoom.x).toBe(20)
      expect(effect.zoom.y).toBe(20)
    })
  })
})
