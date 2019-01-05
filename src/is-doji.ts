/**
 * is-doji
 * Test if a Japanese candlestick qualifies as a doji
 */

/**
 * Represents a Japanese candlestick
 */
export interface Candle {
    open: number,
    high: number,
    low: number,
    close: number
}


/**
 * Returns true if candle qualifies as a doji.
 *
 * @param {candle} The candle to inspect.
 * @param {number} maximumBodyAsPercentOfSpread Largest body:spread
 * ratio to qualify as a doji.
 * @return {boolean} True if candle is a doji.
 */
export function isDoji(candle: Candle, maximumBodyAsPercentOfSpread: number = 8): boolean {
    const body = Math.abs(candle.open - candle.close)
    const spread = candle.high - candle.low
    return body / spread * 100 <= maximumBodyAsPercentOfSpread
}
