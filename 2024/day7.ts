// --- Day 7: Bridge Repair ---
//
// The Historians take you to a familiar rope bridge over a river in the middle of a jungle. The Chief isn't on this side of the bridge, though; maybe he's on the other side?
//
// When you go to cross the bridge, you notice a group of engineers trying to repair it. (Apparently, it breaks pretty frequently.) You won't be able to cross until it's fixed.
//
// You ask how long it'll take; the engineers tell you that it only needs final calibrations, but some young elephants were playing nearby and stole all the operators from their calibration equations! They could finish the calibrations if only someone could determine which test values could possibly be produced by placing any combination of operators into their calibration equations (your puzzle input).
//
// For example:
//
// 190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20
//
// Each line represents a single equation. The test value appears before the colon on each line; it is your job to determine whether the remaining numbers can be combined with operators to produce the test value.
//
// Operators are always evaluated left-to-right, not according to precedence rules. Furthermore, numbers in the equations cannot be rearranged. Glancing into the jungle, you can see elephants holding two different types of operators: add (+) and multiply (*).
//
// Only three of the above equations can be made true by inserting operators:
//
// 190: 10 19 has only one position that accepts an operator: between 10 and 19. Choosing + would give 29, but choosing * would give the test value (10 * 19 = 190).
// 3267: 81 40 27 has two positions for operators. Of the four possible configurations of the operators, two cause the right side to match the test value: 81 + 40 * 27 and 81 * 40 + 27 both equal 3267 (when evaluated left-to-right)!
// 292: 11 6 16 20 can be solved in exactly one way: 11 + 6 * 16 + 20.
//
// The engineers just need the total calibration result, which is the sum of the test values from just the equations that could possibly be true. In the above example, the sum of the test values for the three equations listed above is 3749.
//
// Determine which equations could possibly be true. What is their total calibration result?

import { readFileSync } from "fs";

// main([
//     "190: 10 19",
//     "3267: 81 40 27",
//     "83: 17 5",
//     "156: 15 6",
//     "7290: 6 8 6 15",
//     "161011: 16 10 13",
//     "192: 17 8 14",
//     "21037: 9 7 18 13",
//     "292: 11 6 16 20",
// ]);
main(readFileSync("./day7.input", { encoding: "utf8" }).trim().split("\n"));

function doOperation(a: number, b: number, op: string): number {
    if (op === "+") return a + b;
    if (op === "*") return a * b;
    if (op === "||") return parseInt(`${a}${b}`);

    throw new Error("Unknown operator");
}

function calcEquations(
    total: number,
    [next, ...remaining]: number[],
    operators: string[],
): number[] {
    if (!next) return [total];

    return operators.reduce(
        (results: number[], operator: string) =>
            results.concat(
                calcEquations(
                    doOperation(total, next, operator),
                    remaining,
                    operators,
                ),
            ),
        [],
    );
}

function main(input: string[]) {
    const calibrationEquations = input.reduce(
        (equations: Map<number, number[]>, line) => {
            const matches = line.match(/\d+/g);

            if (!matches) return equations;

            return equations.set(
                parseInt(matches[0]),
                matches.slice(1).map((num) => parseInt(num)),
            );
        },
        new Map(),
    );

    part1(calibrationEquations);
    part2(calibrationEquations);
}

function part1(calibrationEquations: Map<number, number[]>) {
    let sum = 0;

    for (const [target, equations] of calibrationEquations.entries()) {
        const results = calcEquations(equations[0], equations.slice(1), [
            "+",
            "*",
        ]);

        if (!results.includes(target)) continue;

        sum += target;
    }

    console.log(`Part 1 results: ${sum}`);
}

function part2(calibrationEquations: Map<number, number[]>) {
    let sum = 0;

    for (const [target, equations] of calibrationEquations.entries()) {
        const results = calcEquations(equations[0], equations.slice(1), [
            "+",
            "*",
            "||",
        ]);

        if (!results.includes(target)) continue;

        sum += target;
    }

    console.log(`Part 2 results: ${sum}`);
}
