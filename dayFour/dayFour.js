const readInput = require('../readInput');

const REQUIRED_KEYS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
const FAUX_REQUIRED_KEYS = REQUIRED_KEYS.filter(key => !['cid'].includes(key));

/** @type {string[]} */
const passports = readInput('./dayFour/input.txt', 'STRING')
	.join('\n')
	.split('\n\n')
	.map(passport => {
		return Object.fromEntries(
			passport.replace(/\n/g, ' ')
				.split(' ')
				.map(entries => entries.split(':')),
		);
	});

const valid = passports.filter(passport => FAUX_REQUIRED_KEYS.every(key => Object.keys(passport).includes(key)));

console.log(valid.length);