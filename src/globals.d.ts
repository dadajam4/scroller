import _ResizeObserver from 'resize-observer-polyfill';

declare global {
  interface Window {
    ResizeObserver: typeof _ResizeObserver;
  }

  export const ResizeObserver: typeof _ResizeObserver;
}
