const readInput = require('../readInput');

/** @type {string[]} */
const input = readInput('dayThirteen/', 'STRING');

const TIMESTAMP = Number(input[0]);
const BUS_IDS = input[1].split(',')
	.filter(busId => busId !== 'x')
	.map(Number);

const waitTimes = BUS_IDS.map(busId => {
	return [busId, (Math.ceil(TIMESTAMP / busId) * busId) - TIMESTAMP];
});

const earliestBus = waitTimes.sort(([_, timeOne], [__, timeTwo]) => timeOne - timeTwo)[0];

console.log(earliestBus[0] * earliestBus[1]);