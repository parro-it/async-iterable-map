const async = require('rollup-plugin-async');

export default {
	entry: 'main.js',
	dest: 'index.js',
	format: 'cjs',
	external: ['curry'],
	plugins: [async()]
};
