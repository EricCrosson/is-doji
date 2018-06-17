// Written by Eric Crosson
// 2018-06-16

/**
 * Example candle object
 *
 * {
 *   open: '0.05655000',
 *   high: '0.05656500',
 *   low: '0.05613200',
 *   close: '0.05632400',
 *   volume: '68.88800000'
 * }
 */

/**
 * Parse all candle values from strings into floats.
 *
 * @param {candle} candle Candle to return as numerical data.
 * @return A candle with strings parsed as floats.
 */
function parseCandle(candle) {
    return {
        open: parseFloat(candle.open),
        high: parseFloat(candle.high),
        low: parseFloat(candle.low),
        close: parseFloat(candle.close),
        volume: parseFloat(candle.volume)
    }
}

/**
 * Returns true if candle qualifies as a doji.
 *
 * @param {candle} The candle to inspect.
 * @param {number} maximumBodyAsPercentOfSpread Largest body:spread
 * ratio to qualify as a doji.
 * @return {boolean} True if candle is a doji.
 */
function isDoji(candle, maximumBodyAsPercentOfSpread = 8) {
    candle = parseCandle(candle)
    // console.log(candle)
    const body = Math.abs(candle.open - candle.close)
    const spread = candle.high - candle.low
    return body / spread * 100 <= maximumBodyAsPercentOfSpread
}

module.exports = {
    isDoji: isDoji
}
