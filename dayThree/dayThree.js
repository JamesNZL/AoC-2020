const readInput = require('../readInput');

const [OPEN, TREE] = ['.', '#'];

/** @type {string[]} */
const map = readInput('dayThree/', 'STRING')
	.map(line => line.split(''));

/**
 * Resolve the corresponding in-range index for a potential out-of-range repeated pattern index
 * @param {number} xIndex The potential out-of-range pattern repeated index
 * @returns {number} The corresponding in-range index
 */
const resolveX = xIndex => (xIndex >= map[0].length) ? resolveX(xIndex - map[0].length) : xIndex;

/**
 * Count the number of trees a specified [rise, run] slope encounters in the map
 * @param {[number, number]} param0 The [rise, run] of the slope to inspect
 * @returns {number} The number of trees the specified slope encounters
 */
const countTrees = ([rise, run]) => {
	let [xIndex, yIndex, count] = [0, 0, 0];

	while (yIndex < map.length) {
		if (map[yIndex][resolveX(xIndex)] === TREE) count++;

		yIndex += rise;
		xIndex += run;
	}

	return count;
};

const SLOPES = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];

const answer = SLOPES.map(slope => countTrees(slope))
	.reduce((product, value) => product * value);

console.log(answer);