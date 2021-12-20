const readInput = require('../readInput');

/** @type {string[]} */
const seats = readInput('./dayFive/input.txt', 'STRING');

/**
 * Convert a specified binary string into its decimal number representation
 * @param {string} binary The binary string to convert to decimal
 * @returns {number} The decimal representation of the binary string
 */
const binaryToDecimal = binary => Number(parseInt(binary, 2).toString(10));

/**
 * Find the row, column, and seatId of a specified binary space partitioned seat
 * @param {string} seat The seat to find
 * @returns {{row: number, column: number, seatId: number}} The row, column, and seatId of the specified seat
 */
const findSeat = seat => {
	const row = binaryToDecimal(seat.substring(0, 7)
		.replace(/F/g, '0')
		.replace(/B/g, '1'),
	);

	const column = binaryToDecimal(seat.substring(7)
		.replace(/L/g, '0')
		.replace(/R/g, '1'),
	);

	const seatId = (row * 8) + column;

	return { row, column, seatId };
};

const foundSeats = seats.map(seat => findSeat(seat))
	.sort((seatOne, seatTwo) => seatTwo.seatId - seatOne.seatId);

console.log(foundSeats[0]);