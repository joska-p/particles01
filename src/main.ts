import "./style.css"
import { Effect } from "./components/effect"

const effect = new Effect({ id: "canvas", scale: { x: 20, y: 20 } })

const animate = (): void => {
  effect.update()
  setTimeout(() => requestAnimationFrame(animate), 10000 / 60)
}

animate()
