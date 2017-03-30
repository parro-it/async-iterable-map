import test from 'ava';
import map from '.';

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

test('command with one argument', async t => { // eslint-disable-line ava/no-async-fn-without-await
	const source = asyncIterableFrom([1, 2, 3, 42, 43]);
	const result = [];
	for await (const value of map(i => i, source)) { // eslint-disable-line semi
		result.push(value);
	}
	t.deepEqual(result, [1, 2, 3, 42, 43]);
});
