export const HAS_WINDOW = typeof window !== 'undefined';

export function warn(message: string): void {
  if (typeof console === 'object' && console.warn) {
    console.warn(`[scroller] ${message}`);
  }
}

export function error(message: string): Error {
  return new Error(`[scroller] ${message}`);
}

export function isDocumentElement(el: Element): el is HTMLHtmlElement {
  return el.constructor === HTMLHtmlElement;
}

export function isBodyElement(el: Element): el is HTMLBodyElement {
  return el.constructor === HTMLBodyElement;
}

export function isRootElement(
  el: Element,
): el is HTMLHtmlElement | HTMLBodyElement {
  return isDocumentElement(el) || isBodyElement(el);
}

export const NO_SCROLL_ATTRIBUTE = 'data-dd-no-scroll';

let noscrollStyle: HTMLStyleElement;
if (HAS_WINDOW) {
  noscrollStyle = document.createElement('style');
  noscrollStyle.innerText = `[${NO_SCROLL_ATTRIBUTE}]{overflow: hidden!important;}`;
  document.getElementsByTagName('head')[0].appendChild(noscrollStyle);
}

export function enableScroll(el: Element) {
  (el as HTMLElement).removeAttribute(NO_SCROLL_ATTRIBUTE);
}

export function disableScroll(el: Element) {
  (el as HTMLElement).setAttribute(NO_SCROLL_ATTRIBUTE, '');
}
