const assert = require('assert')
const expect = require('chai').expect

/**
 * Library under test
 */
import { isDoji, Candle } from '../src/is-doji'


/**
 * Generate a random number between min and max
 */

function getRandomInt(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
}

describe('is-doji', () => {

    /**
     * Create a candle object with specified body:spread ratio.
     *
     * @param {number} bodyToSpreadRatio Desired ratio of candle body to spread.
     * @return {candle} A candle with specified body:spread ratio.
     */
    function makeCandle(bodyToSpreadRatio: number = 8): Candle {
	const open = getRandomInt(1, 100)
        let close
        do {
            close = getRandomInt(1, 100)
        } while (close == open)
	const spread = 100.0 * Math.abs(open - close) / bodyToSpreadRatio
	const low = getRandomInt(Math.max(open, close) - spread, Math.min(open, close))
	const high = low + 100.0 * Math.abs(open - close) / bodyToSpreadRatio
	const candle: Candle = {
	    open: open,
	    high: high,
	    low: low,
	    close: close
	}
        // console.log(candle)
        return candle
    }

    describe('makeCandle generator', () => {

	var candle: Candle
        var candleData: number[]

	beforeEach(() => {
	    candle = makeCandle()
            candleData = Object.values(candle)
	})

	it('should return low as the lowest value', () => {
	    expect(Math.min(...candleData)).to.equal(candle.low)
	})
	it('should return high as the highest value', () => {
            expect(Math.max(...candleData)).to.equal(candle.high)
	})
	it('should return open between high and low', () => {
	    expect(Math.max(...candleData)).to.be.at.least(candle.open)
	    expect(Math.min(...candleData)).to.be.at.most(candle.open)
	})
	it('should return close between high and low', () => {
	    expect(Math.max(...candleData)).to.be.at.least(candle.close)
	    expect(Math.min(...candleData)).to.be.at.most(candle.close)
	})
        it('should not have open equal to close', () => {
            expect(candle.open).to.not.equal(candle.close)
        })
    })

    describe('#isDoji()', () => {

        var candle: Candle
        var spread: number

        beforeEach(() => {
            candle = makeCandle()
            spread = 8
        })

	it('should return true when given a doji', () => {
	    spread = 5
	    candle = makeCandle(spread)
	    expect(isDoji(candle, spread)).to.equal(true)
	})

	it('should return false when given a non-doji', () => {
	    spread = 5
	    candle = makeCandle(spread * 2)
            // DEBUG
            // fails when makeCandle returns 12,12,12,12
	    expect(isDoji(candle, spread)).to.equal(false)
	})

        it('should return true when given a candle with open equal to close', () => {
            candle = {open: 26, high: 26, low: 26, close: 26}
	    expect(isDoji(candle)).to.equal(true)
        })

        it('should return true when spread is exactly the maximum threshold', () => {
            spread = 8
            candle = {open: 0, low: 0, high: 100, close: 8}
            expect(isDoji(candle, spread)).to.equal(true)
        })

        it('should return true when spread is a pip under the maximum threshold', () => {
            spread = 8
            candle = {open: 0, low: 0, high: 100.0000001, close: 8}
            expect(isDoji(candle, spread)).to.equal(true)
        })

        it('should return false when spread is a pip over the maximum threshold', () => {
            spread = 8
            candle = {open: 0, low: 0, high: 99.9999999, close: 8}
            expect(isDoji(candle, spread)).to.equal(false)
        })
    })

})
