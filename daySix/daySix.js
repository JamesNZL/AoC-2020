const readInput = require('../readInput');

/** @type {string[]} */
const groups = readInput('./daySix/input.txt', 'STRING', true);

const groupAffirmativeCounts = groups.map(group => {
	const affirmativeQuestions = new Set();

	group.replace(/\n/g, '')
		.split('')
		.forEach(question => affirmativeQuestions.add(question));

	return affirmativeQuestions.size;
});

const sumAffirmativeCounts = groupAffirmativeCounts.reduce((sum, value) => sum + value);

console.log(sumAffirmativeCounts);