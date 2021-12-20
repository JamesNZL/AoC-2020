const fs = require('fs');

/**
 * Read a specified file and return it as an array
 * @param {string} path The filename of the file to read
 * @param {'STRING' | 'NUMBER'} type The desired type of the returned array
 * @param {boolean} [isGrouped=false] Whether the input file is grouped by newlines
 * @returns {string[] | number[]} The read file as an array
 */
module.exports = (path, type, isGrouped = false) => {
	const input = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' })
		.trim();

	return (type === 'STRING')
		? (isGrouped)
			? input.split('\n\n')
			: input.split('\n')
		: input.split('\n')
			.map(string => Number(string));
};