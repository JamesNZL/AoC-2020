const readInput = require('../readInput');

const [FLOOR, EMPTY_SEAT, OCCUPIED_SEAT] = ['.', 'L', '#'];
const [OCCUPY, VACATE] = [[0], [5, 6, 7, 8]];

/** @type {string[][]} */
const seatLayout = readInput('dayEleven/', 'STRING')
	.map(row => row.trim().split(''));

/**
 * Traverse outwards from a specified [row, column] seat in the provided seat array in the specified direction
 * @param {string[][]} seatArray The seat array to traverse
 * @param {[number, number]} param1 The [rowIndex, columnIndex] of the specified seat
 * @param {[number, number]} param2 The last delta distance that has been traversed
 * @param {string} direction The direction in which to traverse
 * - Valid values are combinations of the strings `top` | `bottom` | `left` | `right`
 * - If `self`, the seat at the specified [row, column] is returned
 * @returns {[undefined | null | string, [number, number]]} The [foundSeat, [xDelta, yDelta]] of this execution
 * - If `foundSeat` is `undefined`, a floor tile was found and therefore must traverse further outwards
 * - If `null`, the edge of the seatArray has been reached without finding a seat
 */
const traverseOutwards = (seatArray, [rowIndex, columnIndex], [xDelta, yDelta], direction) => {
	// Perform the appropriate increments/decrements to xDelta and yDelta depending on the specified direction
	if (direction.includes('top')) yDelta--;
	if (direction.includes('bottom')) yDelta++;
	if (direction.includes('left')) xDelta--;
	if (direction.includes('right')) xDelta++;

	let foundSeat = (direction === 'self') ? seatArray[rowIndex][columnIndex] : undefined;

	try {
		const seat = seatArray[rowIndex + yDelta][columnIndex + xDelta];

		// If the element at the traversed index is undefined, i.e. out of range, return null
		if (seat === undefined) throw undefined;
		// If a valid seat was found, return it
		else if (seat === EMPTY_SEAT || seat === OCCUPIED_SEAT) foundSeat = seat;
	}

	// If an error was thrown because the index(es) were out of range, return null
	catch { foundSeat = null; }

	// Return this execution's xDelta and yDelta so that it can be incremented/decremented upon if necessary
	return [foundSeat, [xDelta, yDelta]];
};

/**
 * Identify the first visible seats from a specified [row, column] seat in the provided seat array
 * @param {string[][]} seatArray The seat array to extract seats from
 * @param {[number, number]} param1 The [rowIndex, columnIndex] of the specified seat
 * @returns {string[][]} A seat array of the specified seat and its first visible seats
 */
const identifyVisibleSeats = (seatArray, [rowIndex, columnIndex]) => {
	const DIRECTIONS = ['topLeft', 'top', 'topRight', 'left', 'self', 'right', 'bottomLeft', 'bottom', 'bottomRight' ];

	const foundSeats = DIRECTIONS.map(direction => {
		let foundSeat = undefined;
		let [xDelta, yDelta] = [0, 0];

		// Iterate until the seat is found, or the edge is reached
		while (foundSeat === undefined) {
			[foundSeat, [xDelta, yDelta]] = traverseOutwards(seatArray, [rowIndex, columnIndex], [xDelta, yDelta], direction.toLowerCase());
		}

		return foundSeat;
	});

	// Re-structure the 1x9 array into a 2D 3x3 array to maintain compatibility
	return [foundSeats.slice(0, 3), foundSeats.slice(3, 6), foundSeats.slice(6)];
};

/**
 * Count all the occupied seats within a provided seat array
 * - If `countSelf` is `true` and `self` is specified and occupied, it will be excluded from the total count of occupied seats
 * @param {string[][]} seatArray The seat array to count occupied seats from
 * @param {boolean} [countSelf=true] Whether to include the specified `self` in the total count
 * @param {string} [self] A seat symbol to exclude from the total count if occupied and `countSelf` is `true`
 * @returns {number} The total number of occupied seats
 */
const countOccupiedSeats = (seatArray, countSelf = true, self) => {
	return seatArray.reduce((totalOccupied, row) => {
		return totalOccupied + row.reduce((rowOccupied, seat) => rowOccupied + ((seat === OCCUPIED_SEAT) ? 1 : 0), 0);
		// If the 'self' seat is occupied and should be negelected from the count, set the initial value to be -1
	}, (!countSelf && self === OCCUPIED_SEAT) ? -1 : 0);
};

/**
 * Return the state a specified [row, column] seat in the provided seat array should be in the next generation
 * @param {string[][]} seatArray The seat array the seat belongs to
 * @param {[number, number]} param1 The [rowIndex, columnIndex] of the specified seat
 * @param {string} seat The seat symbol of the specified seat
 * @returns {string} The seat symbol for the specified seat in the next generation
 */
const mutateSeat = (seatArray, [rowIndex, columnIndex], seat) => {
	// Floor never changes
	if (seat === FLOOR) return FLOOR;

	// Find the number of occupied surrounding seats
	const occupiedSurroundingSeats = countOccupiedSeats(identifyVisibleSeats(seatArray, [rowIndex, columnIndex]), false, seat);

	// Return the correct seat symbol based on the seat mutation rules
	if (VACATE.includes(occupiedSurroundingSeats)) return EMPTY_SEAT;
	else if (OCCUPY.includes(occupiedSurroundingSeats)) return OCCUPIED_SEAT;
	else return seat;
};

let previousLayout = seatLayout.map(row => [...row]);
let mutatedLayout = seatLayout.map(row => Array.from(Array(row.length)));

// Loop until steady-state is reached
while (!previousLayout.every((row, rowIndex) => row.every((seat, columnIndex) => mutatedLayout[rowIndex][columnIndex] === seat))) {
	if (mutatedLayout[0][0] !== undefined) previousLayout = mutatedLayout;

	// Apply the seat mutation rules for the next generation
	mutatedLayout = previousLayout.map((row, rowIndex) => {
		return row.map((seat, columnIndex) => mutateSeat(previousLayout, [rowIndex, columnIndex], seat));
	});
}

console.log(countOccupiedSeats(mutatedLayout));