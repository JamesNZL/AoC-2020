const readInput = require('../readInput');

/** @type {['acc' | 'jmp' | 'nop', number][]} */
const corruptedInstructions = readInput('dayEight/', 'STRING')
	.map(instruction => instruction.split(' '))
	.map(([operation, argument]) => [operation, Number(argument)]);

const ranIndexes = new Set();

let accumulator = 0;

/**
 * Run the instruction from the specified `instructions` at the specified index
 * @param {['acc' | 'jmp' | 'nop', number][]} instructions The instructions to execute
 * @param {number} [index=0] The index of the instruction to run
 * @returns {0 | number} The exit code
 * - If `0`, the instructions have been executed without error
 * - If `non-zero`, an infinite loop has been detected and the program has ceased execution prematurely at the returned index
 */
const runInstruction = (instructions, index = 0) => {
	if (ranIndexes.has(index)) return index;
	ranIndexes.add(index);

	if (index >= instructions.length) return 0;

	const [operation, argument] = instructions[index];

	if (operation === 'jmp') return runInstruction(instructions, index + argument);
	else if (operation === 'acc') accumulator += argument;

	return runInstruction(instructions, index + 1);
};

let exitCode = runInstruction(corruptedInstructions);

if (exitCode) {
	const recentIndexes = [...ranIndexes.values()]
		.reverse();

	for (const index of recentIndexes) {
		const modifiedInstructions = corruptedInstructions
			.map(instruction => [...instruction]);

		if (modifiedInstructions[index][0] === 'acc') continue;

		modifiedInstructions[index][0] = (modifiedInstructions[index][0] === 'jmp')
			? 'nop'
			: 'jmp';

		accumulator = 0;
		ranIndexes.clear();
		exitCode = runInstruction(modifiedInstructions);

		if (exitCode) continue;
		else break;
	}
}

console.log({ exitCode, accumulator });