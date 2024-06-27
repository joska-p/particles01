import { Point } from "./point.js"

const getParentSize = (element: HTMLElement): Point => {
  if (element.parentElement == null) return new Point(0, 0)

  const clientWidth = element.parentElement.clientWidth
  const clientHeight = element.parentElement.clientHeight

  const inlinePadding =
    parseFloat(
      window.getComputedStyle(element.parentElement, null).paddingBlock
    ) * 2
  const boxPadding =
    parseFloat(
      window.getComputedStyle(element.parentElement, null).paddingInline
    ) * 2

  return new Point(clientWidth - inlinePadding, clientHeight - boxPadding)
}

export { getParentSize }
