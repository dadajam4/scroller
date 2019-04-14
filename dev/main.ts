import '@babel/polyfill';
import ResizeObserver from 'resize-observer-polyfill';
if (!(window as any).ResizeObserver) {
  (window as any).ResizeObserver = ResizeObserver;
}

import Scroller from '../src/scroller';
import Debugger from './Debugger';
const rootScroller = new Scroller({
  scrollSizeOvserver: {
    interval: 500,
  }
});
new Debugger(rootScroller);

const anchors = Array.from(document.querySelectorAll('.anchor-test'));
anchors.forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const hash = anchor.getAttribute('href') as string;
    rootScroller.toElement(hash);
  });
});

const tops = Array.from(document.querySelectorAll('.top-test'));
tops.forEach(top => {
  top.addEventListener('click', e => {
    e.preventDefault();
    rootScroller.toTop();
  });
});

const bottoms = Array.from(document.querySelectorAll('.bottom-test'));
bottoms.forEach(bottom => {
  bottom.addEventListener('click', e => {
    e.preventDefault();
    rootScroller.toBottom();
  });
});

const $inner = document.getElementById('inner') as Element;
const innerScroller = new Scroller('#innerScroller');
new Debugger(innerScroller, $inner, {
  position: 'absolute',
});

const innerAnchors = Array.from(
  document.querySelectorAll('.inner-anchor-test'),
);
innerAnchors.forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const hash = anchor.getAttribute('href') as string;
    innerScroller.toElement(hash, { x: true, y: true });
  });
});

const innerTops = Array.from(document.querySelectorAll('.inner-top-test'));
innerTops.forEach(top => {
  top.addEventListener('click', e => {
    e.preventDefault();
    innerScroller.toLeftTop();
  });
});

const innerBottoms = Array.from(
  document.querySelectorAll('.inner-bottom-test'),
);
innerBottoms.forEach(bottom => {
  bottom.addEventListener('click', e => {
    e.preventDefault();
    innerScroller.toRightBottom();
  });
});
