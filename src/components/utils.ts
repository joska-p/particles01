import { Point } from "./point.js"

const getParentSize = (element: HTMLElement): Point => {
  const parent = element.parentElement || document.body

  const width = parent.clientWidth
  const height = parent.clientHeight
  const inlinePadding = parseFloat(window.getComputedStyle(parent, null).paddingBlock) * 2
  const boxPadding = parseFloat(window.getComputedStyle(parent, null).paddingInline) * 2

  return new Point(width - inlinePadding, height - boxPadding)
}

export { getParentSize }
