const readInput = require('../readInput');

/** @typedef {'N' | 'E' | 'S' | 'W'} Cardinal */

/*
 * Coordinate space:
 * - North -> 0
 * - East -> 1
 * - South -> 2
 * - West -> 3
 *
 * Angle sign convention:
 * Clockwise is positive
 * - Left -> -90
 * - Right -> +90
 */

const COORDINATE_SPACE = {
	'N': 0,
	'E': 0,
	'S': 0,
	'W': 0,
};

const TURN_COEFFICIENTS = {
	'L': -1,
	'R': 1,
};

const ACTION_TYPES = {
	TRANSLATE: Object.keys(COORDINATE_SPACE),
	TURN: Object.keys(TURN_COEFFICIENTS),
	FORWARD: 'F',
};

const FULL_TURN = 90;

/**
 * Schema: [action, value][]
 * @type {[string, number][]}
 */
const instructions = readInput('dayTwelve/', 'STRING')
	.map(instruction => {
		const [_, action, value] = instruction.match(/^(\w)(\d+)$/);
		return [action, Number(value)];
	});

/**
 * Convert a specified cardinal direction to its corresponding index in the coordinate space
 * @param {Cardinal} cardinal The cardinal direction to convert
 * @returns {number} The index of the specified cardinal in the coordinate space
 */
const cardinalToIndex = cardinal => Object.keys(COORDINATE_SPACE).indexOf(cardinal);

/**
 * Convert a specified coordinate space index to its corresponding cardinal direction
 * @param {number} index The index to convert
 * @returns {Cardinal} The cardinal direction of the specified index
 */
const indexToCardinal = index => {
	const length = Object.keys(COORDINATE_SPACE).length;

	if (index < 0) index = length - (-index % length);
	if (index >= length) index %= length;

	return Object.keys(COORDINATE_SPACE)[index];
};

/** @type {Cardinal} */
let facing = 'E';

instructions.forEach(([action, value]) => {
	if (ACTION_TYPES.TRANSLATE.includes(action)) COORDINATE_SPACE[action] += value;
	else if (action === ACTION_TYPES.FORWARD) COORDINATE_SPACE[facing] += value;

	else if (ACTION_TYPES.TURN.includes(action)) {
		const numberOfTurns = value / FULL_TURN;

		facing = indexToCardinal(cardinalToIndex(facing) + (numberOfTurns * TURN_COEFFICIENTS[action]));
	}
});

const manhattanDistance = Math.abs(COORDINATE_SPACE.N - COORDINATE_SPACE.S) + Math.abs(COORDINATE_SPACE.E - COORDINATE_SPACE.W);

console.log(manhattanDistance);