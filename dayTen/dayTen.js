const readInput = require('../readInput');

const TOLERANCES = {
	LOWER: [1, 2, 3],
	HIGHER: 3,
};

const OUTLET_JOLTAGE = 0;

/** @type {number[]} */
const adapterJoltages = readInput('dayTen/', 'NUMBER')
	.sort((joltageOne, joltageTwo) => joltageOne - joltageTwo);

const highestAdapterJoltage = [...adapterJoltages].reverse()[0];

const deviceJoltage = highestAdapterJoltage + TOLERANCES.HIGHER;

/**
 * Calculate all the possible next steps for each current arrangement in the \<number[]>
 * @param {number[]} arrangements The array of arrangements
 * @returns {number[]} The array of arrangements with all the possible next steps added
 */
const calculateNextStep = arrangements => {
	return arrangements.flatMap(arrangementJoltage => {
		const compatibleJoltages = adapterJoltages.filter(joltage => TOLERANCES.LOWER.includes(joltage - arrangementJoltage));
		if (compatibleJoltages.length) return compatibleJoltages.map(joltage => joltage);
		else return arrangementJoltage;
	});
};

let arrangementJoltages = [OUTLET_JOLTAGE];

while (arrangementJoltages.some(joltage => joltage !== highestAdapterJoltage)) {
	arrangementJoltages = calculateNextStep(arrangementJoltages);
}

console.log(arrangementJoltages.length);