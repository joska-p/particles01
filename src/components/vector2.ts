class Vector2 {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(vector: Vector2 | number): Vector2 {
    if (typeof vector === 'number') {
      return new Vector2(this.x + vector, this.y + vector)
    }
    return new Vector2(this.x + vector.x, this.y + vector.y)
  }

  sub(vector: Vector2 | number): Vector2 {
    if (typeof vector === 'number') {
      return new Vector2(this.x - vector, this.y - vector)
    }
    return new Vector2(this.x - vector.x, this.y - vector.y)
  }

  mul(vector: Vector2 | number): Vector2 {
    if (typeof vector === 'number') {
      return new Vector2(this.x * vector, this.y * vector)
    }
    return new Vector2(this.x * vector.x, this.y * vector.y)
  }

  div(vector: Vector2 | number): Vector2 {
    if (typeof vector === 'number') {
      return new Vector2(this.x / vector, this.y / vector)
    }
    return new Vector2(this.x / vector.x, this.y / vector.y)
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize(): Vector2 {
    const length = this.length()
    return new Vector2(this.x / length, this.y / length)
  }

  dot(vector: Vector2): number {
    return this.x * vector.x + this.y * vector.y
  }

  floor(): Vector2 {
    return new Vector2(Math.floor(this.x), Math.floor(this.y))
  }

  #clamp(min: number, max: number, v: number) {
    return Math.min(Math.max(v, min), max)
  }

  clamp(min: Vector2, max: Vector2): Vector2 {
    return new Vector2(this.#clamp(min.x, max.x, this.x), this.#clamp(min.y, max.y, this.y))
  }

  #lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
  }

  #invLerp(a: number, b: number, v: number) {
    if (a === b) return 0
    return (v - a) / (b - a)
  }

  #remap(oldA: number, oldB: number, newA: number, newB: number, v: number) {
    return this.#lerp(newA, newB, this.#invLerp(oldA, oldB, v))
  }

  remap(oldBounds: Vector2, newBounds: Vector2, point: Vector2) {
    return [
      this.#remap(0, oldBounds.x, 0, newBounds.x, point.x),
      this.#remap(0, oldBounds.y, 0, newBounds.y, point.y),
    ]
  }
}

export {Vector2}
