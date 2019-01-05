# is-doji [![Build Status](https://travis-ci.org/EricCrosson/is-doji.svg?branch=master)](https://travis-ci.org/EricCrosson/is-doji) [![npm](https://img.shields.io/npm/dt/is-doji.svg)](https://www.npmjs.com/package/is-doji) [![npm version](https://img.shields.io/npm/v/is-doji.svg)](https://npmjs.org/package/is-doji)

> Test if a Japanese candlestick qualifies as a doji

## Install

``` shell
npm install is-doji
```

## Use

``` typescript
import { isDoji, Candle } from '../src/is-doji'

const dojiCandle: Candle = {
  open: 0,
  high: 100,
  low: 0,
  close: 8
}

const nonDojiCandle: Candle = {
  open: 0,
  high: 100,
  low: 0,
  close: 100
}


console.log(isDoji(dojiCandle))
//=> true

console.log(isDoji(nonDojiCandle))
//=> false
```
