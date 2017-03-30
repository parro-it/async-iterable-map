const spread = require('async-iterable-map');

for (const item of spread([[1, 2, 3], 42, 43])) {
	console.log({item});
}

