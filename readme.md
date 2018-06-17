# is-doji

[![Build Status](https://travis-ci.org/EricCrosson/is-doji.svg?branch=master)](https://travis-ci.org/EricCrosson/is-doji)

> Check if a candle qualifies as a doji

## Install

```
$ npm install is-doji
```

## Usage

```javascript
const doji = require('is-doji')

const dojiCandle = {
  open: 0,
  high: 100,
  low: 0,
  close: 8
}

const nonDojiCandle = {
  open: 0,
  high: 100,
  low: 0,
  close: 100
}


console.log(doji.isDoji(dojiCandle))
//=> true

console.log(doji.isDoji(nonDojiCandle))
//=> false
```

## API

### isDoji(candle, maximumBodyAsPercentOfSpread = 8)

Returns true if specified candle qualifies as a doji, meaning the
body:spread ratio is less than or equal to specified
`maximumBodyAsPercentOfSpread`.

## License

MIT
