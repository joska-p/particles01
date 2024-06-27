import { Point } from "../src/components/point"
import { describe, expect, test } from "vitest"

describe("point", () => {
  test("create new point", () => {
    const point = new Point(1, 2)
    expect(point.x).toBe(1)
    expect(point.y).toBe(2)
  })

  test("add a number to a point", () => {
    const point = new Point(1, 2).add(3)
    expect(point.x).toBe(4)
    expect(point.y).toBe(5)
  })

  test("add a point to a point", () => {
    const point = new Point(1, 2).add(new Point(3, 4))
    expect(point.x).toBe(4)
    expect(point.y).toBe(6)
  })

  test("sub a number from a point", () => {
    const point = new Point(1, 2).sub(3)
    expect(point.x).toBe(-2)
    expect(point.y).toBe(-1)
  })

  test("sub a point from a point", () => {
    const point = new Point(1, 2).sub(new Point(3, 4))
    expect(point.x).toBe(-2)
    expect(point.y).toBe(-2)
  })

  test("multiply a number to a point", () => {
    const point = new Point(1, 2).mul(3)
    expect(point.x).toBe(3)
    expect(point.y).toBe(6)
  })

  test("multiply a point to a point", () => {
    const point = new Point(1, 2).mul(new Point(3, 4))
    expect(point.x).toBe(3)
    expect(point.y).toBe(8)
  })

  test("divide a number to a point", () => {
    const point = new Point(9, 30).div(3)
    expect(point.x).toBe(3)
    expect(point.y).toBe(10)
  })

  test("divide a point to a point", () => {
    const point = new Point(9, 30).div(new Point(3, 10))
    expect(point.x).toBe(3)
    expect(point.y).toBe(3)
  })

  test("length of a point", () => {
    const point = new Point(3, 4).length()
    expect(point).toBe(5)
  })

  test("normalize a point", () => {
    const point = new Point(3, 4).normalize()
    expect(point.x).toBe(0.6)
    expect(point.y).toBe(0.8)
  })

  test("dot product of two point", () => {
    const point = new Point(1, 2).dot(new Point(3, 4))
    expect(point).toBe(11)
  })

  test("floor a point", () => {
    const point = new Point(3.5, 4.5).floor()
    expect(point.x).toBe(3)
    expect(point.y).toBe(4)
  })

  test("if a point is in bound of another point", () => {
    const point1 = new Point(3, 4).inBound(new Point(0, 0), 5)
    const point = new Point(5, 5).inBound(new Point(0, 0), 2)
    expect(point1).toBe(true)
    expect(point).toBe(false)
  })
})
