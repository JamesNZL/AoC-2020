const readInput = require('../readInput');

const [OPEN, TREE] = ['.', '#'];
const [RISE, RUN] = [1, 3];

/** @type {string[]} */
const map = readInput('./dayThree/input.txt', 'STRING')
	.map(line => line.split(''));

/**
 * Resolve the corresponding in-range index for a potential out-of-range repeated pattern index
 * @param {number} xIndex The potential out-of-range pattern repeated index
 * @returns {number} The corresponding in-range index
 */
const resolveX = xIndex => (xIndex >= map[0].length) ? resolveX(xIndex - map[0].length) : xIndex;

let [xIndex, yIndex, count] = [0, 0, 0];

while (yIndex < map.length) {
	if (map[yIndex][resolveX(xIndex)] === TREE) count++;

	yIndex += RISE;
	xIndex += RUN;
}

console.log(count);