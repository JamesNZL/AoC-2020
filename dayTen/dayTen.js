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
 * Extract the highest joltage value from a specified arrangement string
 * @param {string} arrangement The arrangement string, in the form `X, Y, Z, `
 * @returns {number} The number value of the highest joltage
 */
const highestJoltage = arrangement => Number(arrangement.match(/\(?(\d+)\)?, $/)[1]);

/**
 * Calculate all the possible next steps for each current arrangement in the \<string[]>
 * @param {string[]} _arrangements The array of arrangements
 * @returns {string[]} The array of arrangements with all the possible next steps added
 */
const calculateNextStep = _arrangements => {
	return _arrangements.flatMap(arrangement => {
		const compatibleJoltages = adapterJoltages.filter(joltage => TOLERANCES.LOWER.includes(joltage - highestJoltage(arrangement)));
		if (compatibleJoltages.length) return compatibleJoltages.map(joltage => arrangement + `${joltage}, `);
		else return arrangement;
	});
};

let arrangements = [`(${OUTLET_JOLTAGE}), `];

while (arrangements.some(arrangement => highestJoltage(arrangement) !== highestAdapterJoltage)) {
	arrangements = calculateNextStep(arrangements);
}

// Add device joltage to the end of each arrangement string
arrangements = arrangements
	.map(arrangement => arrangement + `(${deviceJoltage})`);

console.log(arrangements.length);