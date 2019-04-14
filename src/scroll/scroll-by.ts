import scroll, { ScrollOptions, ScrollResult } from './scroll-by-internal';

/**
 * 指定の差分だけコンテナをスクロールします。
 * @param diffX 横軸の移動量（px）です。デフォルトは0です。
 * @param diffY 縦軸の移動量（px）です。デフォルトは0です。
 * @param options
 */
export default function scrollBy(
  diffX: number,
  diffY: number,
  options?: ScrollOptions,
): ScrollResult {
  return scroll(diffX, diffY, options);
}
