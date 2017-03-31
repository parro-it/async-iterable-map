import curry from 'curry';

async function * map(transform, source) {
	const asyncIterator = Symbol.asyncIterator || Symbol('asyncIterator');
	Symbol.asyncIterator = asyncIterator;

	if (typeof transform !== 'function') {
		throw new TypeError('First argument must be a function.');
	}

	if (source === null ||
		typeof source !== 'object' ||

		(typeof source[asyncIterator] !== 'function' &&
		typeof source[Symbol.iterator] !== 'function')) {
		throw new TypeError('Second argument must be an asyncIterable or iterable.');
	}
	for await (const item of source) { // eslint-disable-line semi
		yield transform(await item);
	}
}

export default curry(map);
