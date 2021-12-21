const readInput = require('../readInput');

const PREAMBLE = 25;

/** @type {number[]} */
const data = readInput('dayNine/', 'NUMBER');

const invalidNumber = data.find((value, index) => {
	if (index - PREAMBLE < 0) return;

	const section = data.slice(index - PREAMBLE, index);
	const hasSum = section.some(numberOne => section.some(numberTwo => numberOne + numberTwo === value && numberOne !== numberTwo));

	if (!hasSum) return value;
});

console.log(invalidNumber);