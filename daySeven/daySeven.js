const readInput = require('../readInput');

const MY_BAG = 'shiny gold';

const REGEXES = {
	OUTER_BAG: /^([\w ]+) bags contain/,
	INNER_BAGS: /(\d|no) ([\w ]+) bags?/g,
};

/** @type {string[]} */
const rules = readInput('daySeven/', 'STRING');

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

const innerBagRegex = /^(\d+):([\w ]+)$/;

/**
 * Schema: {outerBag: {nestLevel, innerBagRegex[], numberOfInnerBags}}
 * @type {Object.<string, {nestLevel: number, innerBags: string[], numberOfInnerBags: number}>}
 */
const foundOuterBags = {
	[MY_BAG]: {
		nestLevel: 0,
		innerBags: [],
		numberOfInnerBags: 0,
	},
};

let deepestNestedBags = [MY_BAG];
let currentNestLevel = 0;

while (!deepestNestedBags.every(outerBag => foundOuterBags[outerBag].innerBags[0] === 'EMPTY')) {
	const currentLevelBags = Object.entries(foundOuterBags).filter(outerBagEntry => outerBagEntry[1].nestLevel === currentNestLevel);

	currentNestLevel++;
	deepestNestedBags = [];

	currentLevelBags.forEach(([outerBag, outerBagObject]) => {
		processedRules[outerBag].forEach(([innerBagQuantity, innerBagType]) => {
			if (processedRules[outerBag][0][0] === 'no') return;

			outerBagObject.innerBags.push(`${innerBagQuantity}:${innerBagType}`);

			foundOuterBags[innerBagType] = {
				nestLevel: currentNestLevel,
				innerBags: (processedRules[innerBagType][0][0] === 'no') ? ['EMPTY'] : [],
				numberOfInnerBags: 0,
			};

			deepestNestedBags.push(innerBagType);
		});
	});
}

Object.entries(foundOuterBags)
	// Sort the found outer bags by nest level in descending order
	// i.e. the deepest bags are sorted to the left
	.sort((outerBagEntryOne, outerBagEntryTwo) => outerBagEntryTwo[1].nestLevel - outerBagEntryOne[1].nestLevel)
	.forEach(([_, outerBagObject]) => {
		outerBagObject.numberOfInnerBags = Object.entries(foundOuterBags)
			// Filter for the outer-bag objects of the inner bags, in order to inspect the nested inner-inner bags
			.filter(outerBagEntry => outerBagObject.innerBags.some(innerBag => innerBag.includes(outerBagEntry[0])))
			.reduce((count, [innerBagType, innerBagObject]) => {
				const innerBagQuantity = Number(outerBagObject.innerBags
					.find(innerBag => innerBag.includes(innerBagType))
					.match(innerBagRegex)[1]);

				return count + innerBagQuantity + (innerBagQuantity * innerBagObject.numberOfInnerBags);
			}
			, 0);
	});

console.log(foundOuterBags[MY_BAG].numberOfInnerBags);
