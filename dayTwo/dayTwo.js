const readInput = require('../readInput');

/** @type {string[]} */
const passwords = readInput('dayTwo/', 'STRING');

let count = 0;

passwords.forEach(line => {
	/* const [range, letter, password] = line.split(/:? /g);

	const [minimum, maximum] = range.split('-');

	const letterRegex = new RegExp(`${letter}`, 'g');

	try {
		const occurences = password.match(letterRegex).length;
		if (occurences >= minimum && occurences <= maximum) count++;
	}

	catch { null; } */

	const [indexes, letter, password] = line.split(/:? /g);

	const matches = indexes.split('-')
		.map(index => (password[index - 1] === letter) ? 1 : 0);

	if (matches.reduce((sum, value) => sum + value) === 1) count++;
});

console.log(count);