const readInput = require('../readInput');

const TOLERANCES = {
	LOWER: [1, 2, 3],
	HIGHER: 3,
};

const OUTLET_JOLTAGE = 0;

/** @type {number[]} */
const adapterJoltages = readInput('dayTen/', 'NUMBER')
	.sort((joltageOne, joltageTwo) => joltageTwo - joltageOne);

const deviceJoltage = adapterJoltages[0] + TOLERANCES.HIGHER;

adapterJoltages.unshift(deviceJoltage);
adapterJoltages.push(OUTLET_JOLTAGE);

// Use lookup object to memoise all possible following arrangements from each joltage value
const arrangementsFromJoltage = {};

// Iterate through each adapter joltage in descending order and use the memoised values
// to calculate the number of possible arrangements after each joltage value
adapterJoltages.forEach(joltage => {
	// Filter the list of adapter joltages for the adapters that can be directly attached to the current adapter
	arrangementsFromJoltage[joltage] = adapterJoltages.filter(adapterJoltage => TOLERANCES.LOWER.includes(adapterJoltage - joltage))
		// Reduce the number[] of possible next adapters to the sum of their possible arrangements
		.reduce((arrangements, nextJoltage) => arrangements + (arrangementsFromJoltage[nextJoltage] || 1), 0);
});

console.log(arrangementsFromJoltage[OUTLET_JOLTAGE]);