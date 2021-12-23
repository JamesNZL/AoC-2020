const readInput = require('../readInput');

/** @type {string[]} */
const input = readInput('dayThirteen/', 'STRING');

/** @type {{busId: number, departureDelay: number}[]} */
const BUS_IDS = input[1].split(',')
	.map((busId, index) => { return { busId: Number(busId), departureDelay: index }; })
	.filter(({ busId }) => !Number.isNaN(busId));

const longestDelayedBus = [...BUS_IDS].sort(({ busId:busIdOne }, { busId:busIdTwo }) => busIdTwo - busIdOne)[0];
let timestamp = longestDelayedBus.busId - longestDelayedBus.departureDelay;

while (!BUS_IDS.every(({ busId, departureDelay }) => (timestamp + departureDelay) % busId === 0)) {
	timestamp += longestDelayedBus.busId;
}

console.log(timestamp);