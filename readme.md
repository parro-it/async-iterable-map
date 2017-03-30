# async-iterable-map

[![Greenkeeper badge](https://badges.greenkeeper.io/parro-it/async-iterable-map.svg)](https://greenkeeper.io/)

> An iterable transform that spread each iterable received and emit its items

background details relevant to understanding what this module does

## Usage

Let's spread the `arr` array, each item of `arr` will became an item of resulting iterable:

```js
const spread = require('async-iterable-map');

const arr = [1, 2, 3];

for (const item of spread([arr, 42, 43])) {
	console.log({item});
}
```

This will output

```
{item :1}
{item :2}
{item :3}
{item :42}
{item :43}
```

[![Travis Build Status](https://img.shields.io/travis/parro-it/async-iterable-map/master.svg)](http://travis-ci.org/parro-it/async-iterable-map)
[![NPM downloads](https://img.shields.io/npm/dt/async-iterable-map.svg)](https://npmjs.org/package/async-iterable-map)


## API

```js
const spread = (iterable: Iterable): Iterable
```

Given a source iterable, return an iterable with all source item that are iterable spreaded.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install async-iterable-map
```


## See Also

- [`noffle/common-readme`](https://github.com/noffle/common-readme)

## License

MIT

