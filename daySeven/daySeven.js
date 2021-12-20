const readInput = require('../readInput');

const MY_BAG = 'shiny gold';

const REGEXES = {
	OUTER_BAG: /^([\w ]+) bags contain/,
	INNER_BAGS: /(\d|no) ([\w ]+) bags?/g,
};

/** @type {string[]} */
const rules = readInput('./daySeven/input.txt', 'STRING');

/**
 * Schema: {outerBag: [quantity, innerBagType][]}
 * @type {Object.<string, [string, string][]>}
 */
const processedRules = Object.fromEntries(rules.map(rule => {
	const outerBag = rule.match(REGEXES.OUTER_BAG);

	const innerBags = [...rule.matchAll(REGEXES.INNER_BAGS)]
		.map(([_, quantity, bagType]) => [quantity, bagType]);

	return [outerBag[1], innerBags];
}));

const validOuterBags = new Set();
let oldSetSize = 0;

while (validOuterBags.size !== oldSetSize || oldSetSize === 0) {
	oldSetSize = validOuterBags.size;

	Object.entries(processedRules).forEach(([outerBag, innerBags]) => {
		if (validOuterBags.has(outerBag)) return;

		if (innerBags.some(([_, innerBagType]) => innerBagType === MY_BAG || validOuterBags.has(innerBagType))) validOuterBags.add(outerBag);
	});
}

console.log(validOuterBags.size);