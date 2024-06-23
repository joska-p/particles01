import { Vector2 } from "./vector2.js"

const throttle = (fn: Function, delay: number) => {
  let timer: number | null
  return (...args: any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args)
        timer = null
      }, delay)
    }
  }
}

const getParentSize = (element: HTMLElement) => {
  if (!element.parentElement) return new Vector2(0, 0)

  const clientWidth = element.parentElement.clientWidth
  const clientHeight = element.parentElement.clientHeight

  const inlinePadding = parseFloat(window.getComputedStyle(element.parentElement, null).paddingBlock) * 2
  const boxPadding = parseFloat(window.getComputedStyle(element.parentElement, null).paddingInline) * 2

  return new Vector2(clientWidth - inlinePadding, clientHeight - boxPadding)
}

export { throttle, getParentSize }
