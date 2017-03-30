import curry from 'curry';

async function * map(func, source) {
	for await (const item of source) { // eslint-disable-line semi
		yield func(item);
	}
}

export default curry(map);
