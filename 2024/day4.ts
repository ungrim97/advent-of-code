// --- Day 4: Ceres Search ---
//
// "Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the Ceres monitoring station!
//
// As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input). She only has to find one word: XMAS.
//
// This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:
//
// ..X...
// .SAMX.
// .A..A.
// XMAS.S
// .X....
//
// The actual word search will be full of letters instead. For example:
//
// MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX
//
// In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:
//
// ....XXMAS.
// .SAMXMS...
// ...S..A...
// ..A.A.MS.X
// XMASAMX.MM
// X.....XA.A
// S.S.S.S.SS
// .A.A.A.A.A
// ..M.M.M.MM
// .X.X.XMASX
//
// Take a look at the little Elf's word search. How many times does XMAS appear?
// --- Part Two ---
//
// The Elf looks quizzically at you. Did you misunderstand the assignment?
//
// Looking for the instructions, you flip over the word search to find that this isn't actually an XMAS puzzle; it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:
//
// M.S
// .A.
// M.S
//
// Irrelevant characters have again been replaced with . in the above diagram. Within the X, each MAS can be written forwards or backwards.
//
// Here's the same example from before, but this time all of the X-MASes have been kept instead:
//
// .M.S......
// ..A..MSMS.
// .M.S.MAA..
// ..A.ASMSM.
// .M.S.M....
// ..........
// S.S.S.S.S.
// .A.A.A.A..
// M.M.M.M.M.
// ..........
//
// In this example, an X-MAS appears 9 times.
//
// Flip the word search from the instructions back over to the word search side and try again. How many times does an X-MAS appear?

import { readFileSync } from "fs";

type Row = Map<number, string>;
type Matrix = Map<number, Row>;

main(
    readFileSync("./day4.input", { encoding: "utf8" })
        .trim()
        .split("\n")
        .reduce((matrix: Matrix, line: string, index: number): Matrix => {
            const row: Row = new Map();
            line.split("").forEach((letter: string, i: number): void => {
                row.set(i, letter);
            });

            matrix.set(index, row);

            return matrix;
        }, new Map()),
);

function main(matrix: Matrix) {
    part1(matrix);
    part2(matrix);
}

function part1(matrix: Matrix) {
    let sum = 0;

    for (const [rindex, row] of matrix.entries()) {
        for (const [cindex, letter] of row.entries()) {
            if (letter !== "X") continue;

            for (const dir of [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
            ]) {
                if (matrix.get(rindex + dir[0])?.get(cindex + dir[1]) !== "M")
                    continue;

                if (
                    matrix
                        .get(rindex + dir[0] * 2)
                        ?.get(cindex + dir[1] * 2) !== "A"
                )
                    continue;

                if (
                    matrix
                        .get(rindex + dir[0] * 3)
                        ?.get(cindex + dir[1] * 3) !== "S"
                )
                    continue;

                sum += 1;
            }
        }
    }

    console.log(`Part 1 Result: ${sum}`);
}

function part2(matrix: Matrix) {
    let sum = 0;

    const checkPairs = (a: string, b: string) => {
        if (a === "M" && b === "S") return true;
        if (a === "S" && b === "M") return true;

        return false;
    };

    for (const [rindex, row] of matrix.entries()) {
        for (const [cindex, letter] of row.entries()) {
            if (letter !== "A") continue;

            const topLeft = matrix.get(rindex - 1)?.get(cindex - 1);
            const bottomRight = matrix.get(rindex + 1)?.get(cindex + 1);

            if (!topLeft || !bottomRight) continue;

            if (!checkPairs(topLeft, bottomRight)) continue;

            const topRight = matrix.get(rindex - 1)?.get(cindex + 1);
            const bottomLeft = matrix.get(rindex + 1)?.get(cindex - 1);

            if (!topRight || !bottomLeft) continue;

            if (!checkPairs(topRight, bottomLeft)) continue;

            sum += 1;
        }
    }
    console.log(`Part 2 Result: ${sum}`);
}
