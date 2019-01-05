const assert = require('assert')
const expect = require('chai').expect

/**
 * Library under test
 */
import { isDoji, Candle } from '../src/is-doji'


function getRandomInt(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// amchelle is da best
describe('is-doji', () => {

    /**
     * Create a candle object with specified body:spread ratio.
     *
     * @param {number} bodyToSpreadRatio Desired ratio of candle body to spread.
     * @return {candle} A candle with specified body:spread ratio.
     */
    function makeCandle(bodyToSpreadRatio: number = 8): Candle {
	const open = getRandomInt(1, 100)
	const close = getRandomInt(1, 100)
	const spread = 100.0 * Math.abs(open - close) / bodyToSpreadRatio
        // console.log(`Spread is ${spread}`)
	const low = getRandomInt(Math.max(open, close) - spread, Math.min(open, close))
	const high = low + 100.0 * Math.abs(open - close)/bodyToSpreadRatio
	return {
	    open: open,
	    high: high,
	    low: low,
	    close: close
	}
    }

    describe('makeCandle generator', () => {

	var candle: Candle
        var candleData: number[]

	beforeEach(() => {
	    candle = makeCandle()
            candleData = Object.values(candle)
            // console.log(candle)
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
            // console.log(candle)
	    expect(isDoji(candle, spread)).to.equal(true)
	})

	it('should return false when not given a doji', () => {
	    spread = 5
	    candle = makeCandle(spread * 2)
            // console.log(candle)
	    expect(isDoji(candle, spread)).to.equal(false)
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

        it('should return true when given a doji expressed with strings', () => {
            expect(isDoji(candle, spread)).to.equal(true)
        })

        it('should return true when given a doji expressed with numbers', () => {
            candle.open = candle.open
            candle.high = candle.high
            candle.low = candle.low
            candle.close = candle.close
            expect(isDoji(candle, spread)).to.equal(true)
        })

        it('should return false when given a non-doji expressed with strings', () => {
            candle = makeCandle(spread * 2)
            expect(isDoji(candle, spread)).to.equal(false)
        })

        it('should return false when given a non-doji expressed with numbers', () => {
            candle = makeCandle(spread * 2)
            candle.open = candle.open
            candle.high = candle.high
            candle.low = candle.low
            candle.close = candle.close
            expect(isDoji(candle, spread)).to.equal(false)
        })
    })

})
