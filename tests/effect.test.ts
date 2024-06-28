import { Effect } from "../src/components/effect"
import { beforeAll, describe, expect, test } from "vitest"

describe("effect", () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div id="parent" style="width: 100px; height: 100px;">
    <canvas id="canvas">why it doesn't work?</canvas>
    <form id="controls">
    <input type="range" min="1" max="50" step="1" value="25" id="zoom">
    <input type="checkbox" id="debug" />
    <button type="button" id="clear"">
            Clear
          </button>
    </form>
    </div>
    `
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
    test("it should return a new instance of Effect", () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement
      const effect = new Effect({ canvas })
      expect(effect).toBeInstanceOf(Effect)
    })

    test("it should return a new instance of Effect with default values", () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement
      const effect = new Effect({ canvas })

      expect(effect.canvas).toBeInstanceOf(HTMLCanvasElement)
      expect(effect.ctx).toBeInstanceOf(CanvasRenderingContext2D)
      expect(effect.particles).toEqual([])
      expect(effect.debug).toEqual(false)
      expect(effect.zoom).toEqual(50)
      expect(effect.pointer).toBeNull()
    })

    test("it should resize the canvas to fit the parent element when instantiated", () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement
      const effect = new Effect({ canvas })
      expect(effect.canvas.width).toBe(100)
      expect(effect.canvas.height).toBe(100)
    })
  })
})
