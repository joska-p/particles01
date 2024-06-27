class Point {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(point: Point | number): Point {
    if (typeof point === "number") {
      return new Point(this.x + point, this.y + point)
    }
    return new Point(this.x + point.x, this.y + point.y)
  }

  sub(point: Point | number): Point {
    if (typeof point === "number") {
      return new Point(this.x - point, this.y - point)
    }
    return new Point(this.x - point.x, this.y - point.y)
  }

  mul(point: Point | number): Point {
    if (typeof point === "number") {
      return new Point(this.x * point, this.y * point)
    }
    return new Point(this.x * point.x, this.y * point.y)
  }

  div(point: Point | number): Point {
    if (typeof point === "number") {
      return new Point(this.x / point, this.y / point)
    }
    return new Point(this.x / point.x, this.y / point.y)
  }

  length(): number {
    return Math.hypot(this.x, this.y)
  }

  normalize(): Point {
    const length = this.length()
    return new Point(this.x / length, this.y / length)
  }

  dot(point: Point): number {
    return this.x * point.x + this.y * point.y
  }

  floor(): Point {
    return new Point(Math.floor(this.x), Math.floor(this.y))
  }

  inBound(point: Point, bound: number): boolean {
    return (
      this.x >= point.x - bound &&
      this.x <= point.x + bound &&
      this.y >= point.y - bound &&
      this.y <= point.y + bound
    )
  }

  lerp(point: Point, t: number): Point {
    return new Point(
      this.x + (point.x - this.x) * t,
      this.y + (point.y - this.y) * t
    )
  }
}

export { Point }
