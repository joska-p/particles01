/**
 * @vitest-environment jsdom
 */
import { getParentSize } from "../src/components/utils"
import { Point } from "../src/components/point"
import { describe, expect, test, beforeAll } from "vitest"

describe("getParentSize when there is a parent", () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div id="parent" style="width: 100px; height: 100px;">
      <div id="child">Text with parent</div>
    </div>
    `
  })
  test("Should return a new instance of Point", () => {
    const child = document.getElementById("child") as HTMLElement
    const point = getParentSize(child)

    expect(point).toBeInstanceOf(Point)
  })

  test("Should return the width and height of the parent", () => {
    const child = document.getElementById("child") as HTMLElement
    const size = getParentSize(child)

    expect(size.x).toBe(100)
    expect(size.y).toBe(100)
  })
})

describe("getParentSize when there is no parent", () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div id="child">Test without parent</div>
  `
  })

  test("Should return the width and height of the body", () => {
    const child = document.getElementById("child") as HTMLElement
    const size = getParentSize(child)

    const bodyWidth = document.body.clientWidth
    const bodyHeight = document.body.clientHeight

    expect(size.x).toBe(bodyWidth)
    expect(size.y).toBe(bodyHeight)
  })
})
