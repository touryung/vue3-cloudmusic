/**
 * DOM 元素事件绑定
 * @param el
 * @param type
 * @param listener
 * @param useCapture
 */
export const on = (
  el: HTMLElement | Document | Window,
  type: string,
  listener: EventListenerOrEventListenerObject,
  useCapture = false
): void => {
  if (el && type && listener) {
    el.addEventListener(type, listener, useCapture);
  }
};

/**
 * DOM 元素事件解除
 * @param el
 * @param type
 * @param listener
 */
export const off = (
  el: HTMLElement | Document | Window,
  type: string,
  listener?: EventListenerOrEventListenerObject
): void => {
  if (el && type && listener) {
    el.removeEventListener(type, listener);
  }
};
