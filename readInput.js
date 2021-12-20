const fs = require('fs');

/**
 * Read a specified file and return it as an array
 * @param {string} path The filename of the file to read
 * @param {'STRING' | 'NUMBER'} type The desired type of the returned array
 * @returns {any[]} The read file as an array
 */
module.exports = (path, type) => {
	const input = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' });

	return (type === 'STRING')
		? input.split('\n')
		: input.split('\n')
			.map(string => Number(string));
};