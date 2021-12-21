const readInput = require('../readInput');

/* const REQUIRED_KEYS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
const FAUX_REQUIRED_KEYS = REQUIRED_KEYS.filter(key => !['cid'].includes(key)); */

const REQUIRED_FIELDS = {
	'byr': {
		REGEX: /^(\d{4})$/,
		MINIMUM: 1920,
		MAXIMUM: 2002,
	},
	'iyr': {
		REGEX: /^(\d{4})$/,
		MINIMUM: 2010,
		MAXIMUM: 2020,
	},
	'eyr': {
		REGEX: /^(\d{4})$/,
		MINIMUM: 2020,
		MAXIMUM: 2030,
	},
	'hgt': {
		REGEX: /^(\d+)(cm|in)$/,
		MINIMUM: {
			cm: 150,
			in: 59,
		},
		MAXIMUM: {
			cm: 193,
			in: 76,
		},
	},
	'hcl': {
		REGEX: /^#[0-9a-f]{6}$/,
	},
	'ecl': {
		REGEX: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
	},
	'pid': {
		REGEX: /^\d{9}$/,
	},
	'cid': {
		REGEX: /^\d{9}$/,
	},
};

const FAUX_REQUIRED_FIELDS = Object.fromEntries(
	Object.entries(REQUIRED_FIELDS)
		.filter(([key, _]) => !['cid'].includes(key)),
);

/** @type {string[]} */
const passports = readInput('dayFour/', 'STRING', true)
	.map(passport => {
		return Object.fromEntries(
			passport.replace(/\n/g, ' ')
				.split(' ')
				.map(entries => entries.split(':')),
		);
	});

const valid = passports.filter(passport => {
	/* return FAUX_REQUIRED_KEYS.every(key => Object.keys(passport).includes(key)) */

	// First check that all required fields exist in the passport
	if (Object.keys(FAUX_REQUIRED_FIELDS).every(key => Object.keys(passport).includes(key))) {
		// Iterate through each required field and validate their values
		return Object.entries(FAUX_REQUIRED_FIELDS).every(([key, { REGEX, MINIMUM = null, MAXIMUM = null }]) => {
			// Attempt to match the validation regex
			const match = passport[key].match(REGEX);

			// If no match is made, the field must be invalid
			if (!match) return false;

			// If there is no further minimum/maximum validation to complete, the field must be valid
			else if (!MINIMUM && !MAXIMUM) return true;

			// If the MINIMUM/MAXIMUM for the field is an object with multiple values, perform the correct validation
			else if (MINIMUM instanceof Object) {
				const value = Number(match[1]);
				const validationKey = match[2];

				if (value < MINIMUM[validationKey] || value > MAXIMUM[validationKey]) return false;
				else return true;
			}

			// Otherwise, if MINIMUM/MAXIMUM are simply numbers, perform the appropriate validation
			else {
				const value = Number(match[1]);

				if (value < MINIMUM || value > MAXIMUM) return false;
				else return true;
			}
		});
	}

	// If there are missing required fields, immediately return false
	else return false;
});

console.log(valid.length);