const readInput = require('../readInput');

/** @type {string[]} */
const groups = readInput('./daySix/input.txt', 'STRING', true);

const groupAffirmativeCounts = groups.map(group => {
	const affirmativeQuestions = new Set();

	const people = group.split('\n');

	people.forEach(person => {
		person.split('')
			.forEach(question => {
				if (affirmativeQuestions.has(question)) return;
				else if (people.every(_person => _person.includes(question))) affirmativeQuestions.add(question);
			});
	});

	return affirmativeQuestions.size;
});

const sumAffirmativeCounts = groupAffirmativeCounts.reduce((sum, value) => sum + value);

console.log(sumAffirmativeCounts);