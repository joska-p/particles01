import { Vector2 } from "./vector2.js"

const getParentSize = (element: HTMLElement): Vector2 => {
  if (element.parentElement == null) return new Vector2(0, 0)

  const clientWidth = element.parentElement.clientWidth
  const clientHeight = element.parentElement.clientHeight

  const inlinePadding = parseFloat(window.getComputedStyle(element.parentElement, null).paddingBlock) * 2
  const boxPadding = parseFloat(window.getComputedStyle(element.parentElement, null).paddingInline) * 2

  return new Vector2(clientWidth - inlinePadding, clientHeight - boxPadding)
}

export { getParentSize }
