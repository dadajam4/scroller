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
  anchor.addEventListener('click', async e => {
    e.preventDefault();
    const hash = anchor.getAttribute('href') as string;
    await rootScroller.toElement(hash).promise;
    console.log('scrolled!!');
  });
});

const tops = Array.from(document.querySelectorAll('.top-test'));
tops.forEach(top => {
  top.addEventListener('click', async e => {
    e.preventDefault();
    await rootScroller.toTop().promise;
    console.log('scrolled!!');
  });
});

const bottoms = Array.from(document.querySelectorAll('.bottom-test'));
bottoms.forEach(bottom => {
  const duration = bottom.getAttribute('data-duration');
  const opts = typeof duration === 'string' ? {
    duration: parseInt(duration, 0),
  } : {};
  bottom.addEventListener('click', async e => {
    e.preventDefault();
    await rootScroller.toBottom(opts).promise;
    console.log('scrolled!!');
  });
});

const bys = Array.from(document.querySelectorAll('.by-test'));
bys.forEach(by => {
  by.addEventListener('click', async e => {
    e.preventDefault();
    await rootScroller.by(0, 0).promise;
    console.log('scrolled!!');
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
  anchor.addEventListener('click', async e => {
    e.preventDefault();
    const hash = anchor.getAttribute('href') as string;
    await innerScroller.toElement(hash, { x: true, y: true }).promise;
    console.log('scrolled!!');
  });
});

const innerTops = Array.from(document.querySelectorAll('.inner-top-test'));
innerTops.forEach(top => {
  top.addEventListener('click', async e => {
    e.preventDefault();
    await innerScroller.toLeftTop().promise;
    console.log('scrolled!!');
  });
});

const innerBottoms = Array.from(
  document.querySelectorAll('.inner-bottom-test'),
);
innerBottoms.forEach(bottom => {
  bottom.addEventListener('click', async e => {
    e.preventDefault();
    await innerScroller.toRightBottom().promise;
    console.log('scrolled!!');
  });
});
