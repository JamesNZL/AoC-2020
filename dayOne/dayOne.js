const readInput = require('../readInput');

const entries = readInput('./dayOne/input.txt', 'NUMBER');

entries.forEach((entry, index) => {
	entries.slice(index).forEach(_entry => {
		if (entry + _entry === 2020) {
			console.log(entry * _entry);
		}
	});
});