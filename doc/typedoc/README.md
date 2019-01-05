
is-doji [![Build Status](https://travis-ci.org/EricCrosson/is-doji.svg?branch=master)](https://travis-ci.org/EricCrosson/is-doji) [![npm](https://img.shields.io/npm/dt/is-doji.svg)](https://www.npmjs.com/package/is-doji) [![npm version](https://img.shields.io/npm/v/is-doji.svg)](https://npmjs.org/package/is-doji)
==========================================================================================================================================================================================================================================================================================================================

> Test if a Japanese candlestick qualifies as a doji

Install
-------

```shell
npm install is-doji
```

Use
---

```typescript
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

## Index

### Interfaces

* [Candle](interfaces/candle.md)

### Functions

* [isDoji](#isdoji)

---

## Functions

<a id="isdoji"></a>

###  isDoji

▸ **isDoji**(candle: *[Candle](interfaces/candle.md)*, maximumBodyAsPercentOfSpread?: *`number`*): `boolean`

*Defined in [is-doji.ts:25](https://github.com/ericcrosson/is-doji/blob/0cbdadd/src/is-doji.ts#L25)*

Returns true if candle qualifies as a doji.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| candle | [Candle](interfaces/candle.md) | - |
| `Default value` maximumBodyAsPercentOfSpread | `number` | 8 |  Largest body:spread ratio to qualify as a doji. |

**Returns:** `boolean`
True if candle is a doji.

___

