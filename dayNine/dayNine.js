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

/**
 * Calculate the sum of the values in a \<number[]>
 * @param {number[]} array The array to sum
 * @returns {number} The sum of the values in the array
 */
const sumArray = array => array.reduce((sum, value) => sum + value);

data.forEach((value, index) => {
	const values = [value];

	while (sumArray(values) < invalidNumber) {
		values.push(data[++index]);
	}

	if (sumArray(values) === invalidNumber && values.length > 1) {
		const sortedValues = values.sort((valueOne, valueTwo) => valueOne - valueTwo);

		const encryptionWeakness = sortedValues[0] + sortedValues.reverse()[0];

		console.log(encryptionWeakness);
	}
});