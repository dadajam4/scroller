import Scroller, {
  ScrollerObserver,
  ScrollerState,
  ScrollAxis,
  ScrollDirection,
  ScrollYDirection,
  ScrollXDirection,
} from '../src/scroller';

export default class Debugger implements ScrollerObserver {
  scroller: Scroller;
  el: HTMLElement;
  state!: ScrollerState;
  isPending!: boolean;
  isReady!: boolean;
  isRunning!: boolean;
  isDestroyed!: boolean;
  scrollEnabled!: boolean;
  containerWidth!: number;
  containerHeight!: number;
  scrollWidth!: number;
  scrollHeight!: number;
  scrollableX!: boolean;
  scrollableY!: boolean;
  scrollTop!: number;
  scrollRight!: number;
  scrollBottom!: number;
  scrollLeft!: number;
  lastAxis!: ScrollAxis;
  lastDirection!: ScrollDirection;
  lastYDirection!: ScrollYDirection;
  lastXDirection!: ScrollXDirection;
  nowScrolling!: boolean;

  constructor(
    scroller: Scroller,
    parent: Element = document.body,
    injectStyles?: Partial<CSSStyleDeclaration>,
  ) {
    const self = <any>this;

    this.scroller = scroller;

    this.el = document.createElement('div');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    this.el.appendChild(table);
    table.appendChild(tbody);
    for (const key of Scroller.scrollerObservableKeys) {
      const row = document.createElement('tr');
      const th = document.createElement('tr');
      th.innerText = key;
      const td = document.createElement('td');
      row.appendChild(th);
      row.appendChild(td);

      Object.defineProperty(self, key, {
        enumerable: true,
        configurable: true,
        get: () => {
          return self['_' + key];
        },
        set: (val: any) => {
          self['_' + key] = val;
          td.innerText = val;

          if (key === 'scrollEnabled') {
            scrollHandle.innerHTML =
              'Scrollを ' + (val ? 'OFF' : 'ON') + ' にする';
          }
        },
      });
      tbody.appendChild(row);
    }

    const actions = document.createElement('div');
    const scrollHandle = document.createElement('button');
    scrollHandle.addEventListener('click', e => {
      e.stopPropagation();
      if (scroller.scrollEnabled) {
        scroller.pushScrollStopper(this);
      } else {
        scroller.removeScrollStopper(this);
      }
    });
    actions.appendChild(scrollHandle);
    this.el.appendChild(actions);

    scroller.observe(this);
    const styles: Partial<CSSStyleDeclaration> = {
      zIndex: '32767',
      position: 'fixed',
      top: '0',
      right: '0',
      background: 'rgba(0, 0, 0, .5)',
      color: '#fff',
      fontSize: '10px',
      ...injectStyles,
    };

    for (const key in styles) {
      this.el.style[key] = styles[key] as string;
    }
    parent.appendChild(this.el);
  }
}
