const readInput = require('../readInput');

const [FLOOR, EMPTY_SEAT, OCCUPIED_SEAT] = ['.', 'L', '#'];
const [OCCUPY, VACATE] = [[0], [4, 5, 6, 7, 8]];

/** @type {string[][]} */
const seatLayout = readInput('dayEleven/', 'STRING')
	.map(row => row.trim().split(''));

/**
 * Extract the adjacent seats of a specified [row, column] seat from the provided seat array
 * @param {string[][]} seatArray The seat array to extract seats from
 * @param {[number, number]} param1 The [rowIndex, columnIndex] of the specified seat
 * @returns {string[][]} A seat array of the specified seat and its directly adjacent seats
 */
const extractAdjacentSeats = (seatArray, [rowIndex, columnIndex]) => {
	// Specify the range of rows and columns that are directly adjacent to the specified indices
	const rowRange = [rowIndex - 1, rowIndex, rowIndex + 1];
	const columnRange = [columnIndex - 1, columnIndex, columnIndex + 1];

	// Filter the 2D array for the rows and columns which are within the specified ranges
	return seatArray.filter((_, _rowIndex) => rowRange.includes(_rowIndex))
		.map(row => row.filter((__, _columnIndex) => columnRange.includes(_columnIndex)));
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
	const occupiedSurroundingSeats = countOccupiedSeats(extractAdjacentSeats(seatArray, [rowIndex, columnIndex]), false, seat);

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