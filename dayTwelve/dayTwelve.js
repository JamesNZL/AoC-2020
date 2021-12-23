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

/** Ship's absolute position (i.e. relative to (0, 0)) */
const SHIP_POSITION = {
	'N': 0,
	'E': 0,
	'S': 0,
	'W': 0,
};

/** Waypoint position relative to the ship */
const WAYPOINT_POSITION = {
	'N': 1,
	'E': 10,
	'S': 0,
	'W': 0,
};

const TURN_COEFFICIENTS = {
	'L': -1,
	'R': 1,
};

const ACTION_TYPES = {
	TRANSLATE: Object.keys(SHIP_POSITION),
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
 * Convert a specified coordinate space index to its corresponding cardinal direction
 * @param {number} index The index to convert
 * @returns {Cardinal} The cardinal direction of the specified index
 */
const indexToCardinal = index => {
	const length = Object.keys(SHIP_POSITION).length;

	if (index < 0) index = length - (-index % length);
	if (index >= length) index %= length;

	return Object.keys(SHIP_POSITION)[index];
};

instructions.forEach(([action, value]) => {
	if (ACTION_TYPES.TRANSLATE.includes(action)) WAYPOINT_POSITION[action] += value;

	else if (action === ACTION_TYPES.FORWARD) {
		// Add the product of each cardinal in WAYPOINT_POSITION and the instruction value to the cardinal in SHIP_POSITION
		// i.e. SHIP_POSITION.N += value * WAYPOINT_POSITION.N;
		Object.entries(WAYPOINT_POSITION).forEach(([cardinal, waypointPosition]) => {
			SHIP_POSITION[cardinal] += value * waypointPosition;
		});
	}

	else if (ACTION_TYPES.TURN.includes(action)) {
		const shift = {
			// Calculate the number of turns to make (i.e. the number of indices to shift the array of cardinal positions)
			indices: value / FULL_TURN,
			// Calculate the direction to shift, as per the sign convention
			direction: TURN_COEFFICIENTS[action],
		};

		// Shift each [N, E, S, W] position in WAYPOINT_POSITION the correct number of indices
		Object.values(WAYPOINT_POSITION).forEach((position, index) => {
			// i.e. 'N' will be re-assigned to 'W' on a shift of L90 (-1)
			WAYPOINT_POSITION[indexToCardinal(index + (shift.indices * shift.direction))] = position;
		});
	}
});

const manhattanDistance = Math.abs(SHIP_POSITION.N - SHIP_POSITION.S) + Math.abs(SHIP_POSITION.E - SHIP_POSITION.W);

console.log(manhattanDistance);