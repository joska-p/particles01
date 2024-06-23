import "./style.css"
import { Canvas } from "./components/canvas"
import { Effect } from "./components/effect"

const canvasElement = document.getElementById("canvas")

const effect = new Effect(canvasElement as HTMLCanvasElement)

const canvas = new Canvas({
  canvas: canvasElement as HTMLCanvasElement,
  scale: { x: 30, y: 30 },
  color: "red",
  debug: true,
})

canvas.init()
effect.init()
