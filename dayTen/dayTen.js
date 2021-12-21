const readInput = require('../readInput');

const TOLERANCES = {
	LOWER: [1, 2, 3],
	HIGHER: 3,
};

const OUTLET_JOLTAGE = 0;

/** @type {number[]} */
const adapterJoltages = readInput('dayTen/', 'NUMBER')
	.sort((joltageOne, joltageTwo) => joltageOne - joltageTwo);

const deviceJoltage = [...adapterJoltages].reverse()[0] + TOLERANCES.HIGHER;

const differences = Object.fromEntries(TOLERANCES.LOWER.map(joltage => [joltage, 0]));

let [currentJoltage, targetJoltage] = [OUTLET_JOLTAGE, deviceJoltage];

adapterJoltages.forEach(joltage => {
	differences[joltage - currentJoltage]++;
	currentJoltage = joltage;
});

differences[deviceJoltage - currentJoltage]++;

console.log(differences['1'] * differences['3']);