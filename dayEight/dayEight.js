const readInput = require('../readInput');

/** @type {['acc' | 'jmp' | 'nop', number][]} */
const instructions = readInput('./dayEight/input.txt', 'STRING')
	.map(instruction => instruction.split(' '))
	.map(([operation, argument]) => [operation, Number(argument)]);

const ranIndexes = new Set();

let accumulator = 0;

/**
 * Run the instruction from `instructions` at the specified index
 * @param {number} index The index of the instruction to run
 * @returns {0 | number} The exit code
 * - If `0`, the instructions have been executed without error
 * - If `non-zero`, an infinite loop has been detected and the program has ceased execution prematurely at the returned index
 */
const runInstruction = index => {
	if (ranIndexes.has(index)) return index;
	ranIndexes.add(index);

	const [operation, argument] = instructions[index];

	if (operation === 'jmp') return runInstruction(index + argument);
	else if (operation === 'acc') accumulator += argument;

	return (index + 1 < instructions.length)
		? runInstruction(index + 1)
		: 0;
};

const exitCode = runInstruction(0);

console.log({ exitCode, accumulator });