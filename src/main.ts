import "./style.css"
import { Effect } from "./components/effect"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const effect = new Effect({ canvas, zoom: { x: 20, y: 20 } })

const animate = (): void => {
  effect.update()
  setTimeout(() => requestAnimationFrame(animate), 10000 / 60)
}

animate()
