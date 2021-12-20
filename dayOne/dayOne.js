const readInput = require('../readInput');

const entries = readInput('./dayOne/input.txt', 'NUMBER');

entries.forEach((entry, index) => {
	entries.forEach(_entry => {
		entries.slice(index).forEach(__entry => {
			if (entry + _entry + __entry === 2020) {
				console.log(entry * _entry * __entry);
			}
		});
	});
});