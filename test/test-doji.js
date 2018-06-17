const assert = require('assert')
const expect = require('chai').expect

/**
 * File under test
 */
const doji = require('../lib/doji')


function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// amchelle is da best
describe('libdoji', () => {

    /**
     * Create a candle object with specified body:spread ratio.
     *
     * @param {number} bodyToSpreadRatio Desired ratio of candle body to spread.
     * @return {candle} A candle with specified body:spread ratio.
     */
    function makeCandle(bodyToSpreadRatio = 8) {
	const open = getRandomInt(1, 100)
	const close = getRandomInt(1, 100)
	const spread = 100.0 * Math.abs(open - close) / bodyToSpreadRatio
        // console.log(`Spread is ${spread}`)
	const low = getRandomInt(Math.max(open, close) - spread, Math.min(open, close))
	const high = low + 100.0 * Math.abs(open - close)/bodyToSpreadRatio
	return {
	    open: open.toString(),
	    high: high.toString(),
	    low: low.toString(),
	    close: close.toString(),
	    volume: getRandomInt(0, 10000).toString()
	}
    }

    describe('makeCandle generator', () => {

	var candle
	var candleData

	beforeEach(() => {
	    candle = makeCandle()
	    delete candle.volume  // to allow max/min testing
            candleData = Object.values(candle).map(parseFloat)
            // console.log(candle)
	})

	it('should return low as the lowest value', () => {
	    expect(Math.min(...candleData)).to.equal(parseFloat(candle.low))
	})
	it('should return high as the highest value', () => {
            expect(Math.max(...candleData)).to.equal(parseFloat(candle.high))
	})
	it('should return open between high and low', () => {
	    expect(Math.max(...candleData)).to.be.at.least(parseFloat(candle.open))
	    expect(Math.min(...candleData)).to.be.at.most(parseFloat(candle.open))
	})
	it('should return close between high and low', () => {
	    expect(Math.max(...candleData)).to.be.at.least(parseFloat(candle.close))
	    expect(Math.min(...candleData)).to.be.at.most(parseFloat(candle.close))
	})
    })

    describe('#isDoji()', () => {

        var candle
        var spread

        beforeEach(() => {
            candle = makeCandle()
            spread = 8
        })

	it('should return true when given a doji', () => {
	    spread = 5
	    candle = makeCandle(spread)
            // console.log(candle)
	    expect(doji.isDoji(candle, spread)).to.equal(true)
	})

	it('should return false when not given a doji', () => {
	    spread = 5
	    candle = makeCandle(spread * 2)
            // console.log(candle)
	    expect(doji.isDoji(candle, spread)).to.equal(false)
	})

        it('should return true when spread is exactly the maximum threshold', () => {
            spread = 8
            candle = {open: 0, low: 0, high: 100, close: 8, volume: 1}
            expect(doji.isDoji(candle, spread)).to.equal(true)
        })

        it('should return true when spread is a pip under the maximum threshold', () => {
            spread = 8
            candle = {open: 0, low: 0, high: 100.0000001, close: 8, volume: 1}
            expect(doji.isDoji(candle, spread)).to.equal(true)
        })

        it('should return false when spread is a pip over the maximum threshold', () => {
            spread = 8
            candle = {open: 0, low: 0, high: 99.9999999, close: 8, volume: 1}
            expect(doji.isDoji(candle, spread)).to.equal(false)
        })

        it('should return true when given a doji expressed with strings', () => {
            expect(doji.isDoji(candle, spread)).to.equal(true)
        })

        it('should return true when given a doji expressed with numbers', () => {
            candle.open = parseFloat(candle.open)
            candle.high = parseFloat(candle.high)
            candle.low = parseFloat(candle.low)
            candle.close = parseFloat(candle.close)
            candle.volume = parseFloat(candle.volume)
            expect(doji.isDoji(candle, spread)).to.equal(true)
        })

        it('should return false when given a non-doji expressed with strings', () => {
            candle = makeCandle(spread * 2)
            expect(doji.isDoji(candle, spread)).to.equal(false)
        })

        it('should return false when given a non-doji expressed with numbers', () => {
            candle = makeCandle(spread * 2)
            candle.open = parseFloat(candle.open)
            candle.high = parseFloat(candle.high)
            candle.low = parseFloat(candle.low)
            candle.close = parseFloat(candle.close)
            candle.volume = parseFloat(candle.volume)
            expect(doji.isDoji(candle, spread)).to.equal(false)
        })
    })

})
