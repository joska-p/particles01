class Vector2 {
  public x: number
  public y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  add (vector: Vector2 | number): Vector2 {
    if (typeof vector === 'number') {
      return new Vector2(this.x + vector, this.y + vector)
    }
    return new Vector2(this.x + vector.x, this.y + vector.y)
  }

  sub (vector: Vector2 | number): Vector2 {
    if (typeof vector === 'number') {
      return new Vector2(this.x - vector, this.y - vector)
    }
    return new Vector2(this.x - vector.x, this.y - vector.y)
  }

  mul (vector: Vector2 | number): Vector2 {
    if (typeof vector === 'number') {
      return new Vector2(this.x * vector, this.y * vector)
    }
    return new Vector2(this.x * vector.x, this.y * vector.y)
  }

  div (vector: Vector2 | number): Vector2 {
    if (typeof vector === 'number') {
      return new Vector2(this.x / vector, this.y / vector)
    }
    return new Vector2(this.x / vector.x, this.y / vector.y)
  }

  length (): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize (): Vector2 {
    const length = this.length()
    return new Vector2(this.x / length, this.y / length)
  }

  dot (vector: Vector2): number {
    return this.x * vector.x + this.y * vector.y
  }

  floor (): Vector2 {
    return new Vector2(Math.floor(this.x), Math.floor(this.y))
  }
}

export { Vector2 }
