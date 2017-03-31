import curry from 'curry';

const asyncIterator = Symbol.asyncIterator || Symbol('asyncIterator');
Symbol.asyncIterator = asyncIterator;

function isAsyncIterable(source) {
	const isObject = source !== null && typeof source === 'object';
	if (!isObject) {
		return false;
	}

	return typeof source[asyncIterator] === 'function' ||
		typeof source[Symbol.iterator] === 'function';
}

async function * map(transform, source) {
	if (typeof transform !== 'function') {
		throw new TypeError('First argument must be a function.');
	}

	if (!isAsyncIterable(source)) {
		throw new TypeError('Second argument must be an asyncIterable or iterable.');
	}
	for await (const item of source) { // eslint-disable-line semi
		yield transform(await item);
	}
}

export default curry(map);
