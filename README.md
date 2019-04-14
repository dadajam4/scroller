# scroller

本モジュールは大きく2つの機能を提供します。

- Scrollerクラス
DOM要素（DocumentElement含む）のスクロール情報を検知したり、スムーススクロールさせるためのクラスモジュールです。
ブラウザJS、Node.jsの両環境でユニバーサルに動作します。（Node.js上では処理がキャンセルされます）
そのためSPAサービス等にそのまま組み込んで利用する事が可能です。
また、TypeScriptの型情報を併せ持つため、TypeScriptプロジェクトにおいて型情報を利用したコーディングが可能です。

- スムーススクロール系メソッド
root要素（document.scrollingElement）、もしくは任意のElementにおいてスムーススクロールさせるためのメソッドです。
これら全てのメソッドはScrollerクラスに含まれていますが、「スクロールだけを行えれば良い」場合こちらを直接利用します。

[docs](https://dadajam4.github.io/scroller/classes/_scroller_.scroller.html)

[See the demo](https://dadajam4.github.io/scroller/playground/)

## インストール
```
npm install @dadajam4/scroller --save
```

## Polyfill
Scrollerクラスにおいて自身のスクロール領域のリサイズを検知するために[ResizeObserver](https://wicg.github.io/ResizeObserver/)を利用します。（※スムーススクロール系メソッドでは必要ありません）未対応ブラウザにおいては[resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill)の利用をお勧めします。

### JavaScript
```JavaScript
import ResizeObserver from 'resize-observer-polyfill';
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}
```

### TypeScript
```TypeScript
import ResizeObserver from 'resize-observer-polyfill';
if (typeof window !== 'undefined' && !(window as any).ResizeObserver) {
  (window as any).ResizeObserver = ResizeObserver;
}
```

## Scrollerクラスの使い方

### ducument.scrollingElementにシンプルに適用
```JavaScript
import Scroller from '@dadajam4/scroller';

// Elementを未指定、かつブラウザ上である場合は
// ducument.scrollingElement が自動設定されます。
const scroller = new Scroller();
scroller.on('scrollEnd', e => {
  console.log(e.totalAmmount);
});
```

### Vueインスタンスでの利用例

```JavaScript
SomeVueComponent = Vue.extend({
  data() {
    return {
      innerScrollTop: 0,
      // ...and more observable keys
    }
  },

  computed: {
    scrollTop: {
      get() { return this.innerScrollTop },
      set(scrollTop) {
        this.innerScrollTop = scrollTop;
        // >>> some actions...
      },
    },
    // ...and more observable keys
  },

  methods: {
    toElement(queryString) {
      this._scroller.toElement(queryString);
    },
  },

  created() {
    this._scroller = new Scroller(this.$el);
    this._scroller.observe(this);
  },

  beforeDestroy() {
    this._scroller.destroy();
    delete this._scroller;
  },
});
```

## スムーススクロール系メソッドの使い方

```JavaScript

// 必要に応じてメソッドをimportします
import {
  scrollBy,
  scrollTo,
  scrollToElement,
  scrollToSide,
  scrollToTop,
  scrollToRight,
  scrollToBottom,
  scrollToLeft,
  scrollToLeftTop,
  scrollToLeftBottom,
  scrollToRightTop,
  scrollToRightBottom,
} from '@dadajam4/scroller';

const result = scrollToElement('#some-element');
result.promise.then(() => {

  // >>> スクロール完了後の処理,,,
});

```
