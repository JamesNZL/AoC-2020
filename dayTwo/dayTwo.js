const readInput = require('../readInput');

/** @type {string[]} */
const passwords = readInput('./dayTwo/input.txt', 'STRING');

let count = 0;

passwords.forEach(line => {
	const [range, letter, password] = line.split(/:? /g);

	const [minimum, maximum] = range.split('-');

	const letterRegex = new RegExp(`${letter}`, 'g');

	try {
		const occurences = password.match(letterRegex).length;
		if (occurences >= minimum && occurences <= maximum) count++;
	}

	catch { null; }
});

console.log(count);