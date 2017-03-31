import test from 'ava';
import map from '.';

const doubleFn = n => n * 2;
const promise = n => Promise.resolve(n);

function asyncIterableFrom(array) {
	Symbol.asyncIterator = Symbol.asyncIterator || Symbol('asyncIterator');
	async function * asyncGen() {
		for (const item of array) {
			yield item;
		}
	}
	return {
		[Symbol.asyncIterator]: asyncGen
	};
}

async function concat(asyncIterable) {
	const result = [];
	for await (const value of asyncIterable) { // eslint-disable-line semi
		result.push(value);
	}
	return result;
}

test('Apply the function to all items', async t => {
	const source = asyncIterableFrom([1, 2, 3, 42, 43]);
	const result = await concat(map(doubleFn, source));
	t.deepEqual(result, [2, 4, 6, 84, 86]);
});

test('Resolve promise items', async t => {
	const source = asyncIterableFrom([1, Promise.resolve(2)]);
	const result = await concat(map(doubleFn, source));
	t.deepEqual(result, [2, 4]);
});

test('Await transformer result', async t => {
	const source = asyncIterableFrom([1, Promise.resolve(2)]);
	const result = await concat(map(promise, source));
	t.deepEqual(result, [1, 2]);
});

test('is Curried', async t => {
	const source = asyncIterableFrom([1, Promise.resolve(2)]);
	const doubleThem = map(doubleFn);
	const result = await concat(doubleThem(source));
	t.deepEqual(result, [2, 4]);
});

test('throw if first argument is not a function', async t => {
	const err = await t.throws(concat(map(42, null)));
	t.is(err.message, 'First argument must be a function.');
	t.true(err instanceof TypeError);
});

test('throw if second argument is not an asyncIterable or iterable', async t => {
	const err = await t.throws(concat(map(doubleFn, 42)));
	t.is(err.message, 'Second argument must be an asyncIterable or iterable.');
	t.true(err instanceof TypeError);
});
