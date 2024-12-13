// --- Day 6: Guard Gallivant ---
//
// The Historians use their fancy device again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year 1518! It turns out that having direct access to history is very convenient for a group of historians.
//
// You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single guard is patrolling this part of the lab.
//
// Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?
//
// You start by making a map (your puzzle input) of the situation. For example:
//
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...
//
// The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map). Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.
//
// Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:
//
// If there is something directly in front of you, turn right 90 degrees.
// Otherwise, take a step forward.
//
// Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):
//
// ....#.....
// ....^....#
// ..........
// ..#.......
// .......#..
// ..........
// .#........
// ........#.
// #.........
// ......#...
//
// Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:
//
// ....#.....
// ........>#
// ..........
// ..#.......
// .......#..
// ..........
// .#........
// ........#.
// #.........
// ......#...
//
// Reaching another obstacle (a spool of several very long polymers), she turns right again and continues downward:
//
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#......v.
// ........#.
// #.........
// ......#...
//
// This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):
//
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#........
// ........#.
// #.........
// ......#v..
//
// By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:
//
// ....#.....
// ....XXXXX#
// ....X...X.
// ..#.X...X.
// ..XXXXX#X.
// ..X.X.X.X.
// .#XXXXXXX.
// .XXXXXXX#.
// #XXXXXXX..
// ......#X..
//
// In this example, the guard will visit 41 distinct positions on your map.
//
// Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?
//
// --- Part Two ---
//
// While The Historians begin working around the guard's patrol route, you borrow their fancy device and step outside the lab. From the safety of a supply closet, you time travel through the last few months and record the nightly status of the lab's guard post on the walls of the closet.
//
// Returning after what seems like only a few seconds to The Historians, they explain that the guard's patrol area is simply too large for them to safely search the lab without getting caught.
//
// Fortunately, they are pretty sure that adding a single new obstruction won't cause a time paradox. They'd like to place the new obstruction in such a way that the guard will get stuck in a loop, making the rest of the lab safe to search.
//
// To have the lowest chance of creating a time paradox, The Historians would like to know all of the possible positions for such an obstruction. The new obstruction can't be placed at the guard's starting position - the guard is there right now and would notice.
//
// In the above example, there are only 6 different positions where a new obstruction would cause the guard to get stuck in a loop. The diagrams of these six situations use O to mark the new obstruction, | to show a position where the guard moves up/down, - to show a position where the guard moves left/right, and + to show a position where the guard moves both up/down and left/right.
//
// Option one, put a printing press next to the guard's starting position:
//
// ....#.....
// ....+---+#
// ....|...|.
// ..#.|...|.
// ....|..#|.
// ....|...|.
// .#.O^---+.
// ........#.
// #.........
// ......#...
//
// Option two, put a stack of failed suit prototypes in the bottom right quadrant of the mapped area:
//
// ....#.....
// ....+---+#
// ....|...|.
// ..#.|...|.
// ..+-+-+#|.
// ..|.|.|.|.
// .#+-^-+-+.
// ......O.#.
// #.........
// ......#...
//
// Option three, put a crate of chimney-squeeze prototype fabric next to the standing desk in the bottom right quadrant:
//
// ....#.....
// ....+---+#
// ....|...|.
// ..#.|...|.
// ..+-+-+#|.
// ..|.|.|.|.
// .#+-^-+-+.
// .+----+O#.
// #+----+...
// ......#...
//
// Option four, put an alchemical retroencabulator near the bottom left corner:
//
// ....#.....
// ....+---+#
// ....|...|.
// ..#.|...|.
// ..+-+-+#|.
// ..|.|.|.|.
// .#+-^-+-+.
// ..|...|.#.
// #O+---+...
// ......#...
//
// Option five, put the alchemical retroencabulator a bit to the right instead:
//
// ....#.....
// ....+---+#
// ....|...|.
// ..#.|...|.
// ..+-+-+#|.
// ..|.|.|.|.
// .#+-^-+-+.
// ....|.|.#.
// #..O+-+...
// ......#...
//
// Option six, put a tank of sovereign glue right next to the tank of universal solvent:
//
// ....#.....
// ....+---+#
// ....|...|.
// ..#.|...|.
// ..+-+-+#|.
// ..|.|.|.|.
// .#+-^-+-+.
// .+----++#.
// #+----++..
// ......#O..
//
// It doesn't really matter what you choose to use as an obstacle so long as you and The Historians can put it into position without the guard noticing. The important thing is having enough options that you can find one that minimizes time paradoxes, and in this example, there are 6 different positions you could choose.
//
// You need to get the guard stuck in a loop by adding a single new obstruction. How many different positions could you choose for this obstruction?

import { readFileSync } from "fs";

main(readFileSync("./day6.input", { encoding: "utf8" }).trim().split("\n"));

type Row = Map<number, string>;
type Matrix = Map<number, Row>;
type Coords = [number, number];

function main(input: string[]) {
    const matrix = input.reduce(
        (matrix: Matrix, line: string, rindex: number): Matrix => {
            const row: Row = new Map();
            line.split("").forEach((symbol: string, cindex: number): void => {
                row.set(cindex, symbol);
            });

            matrix.set(rindex, row);

            return matrix;
        },
        new Map(),
    );

    const [guardLocation, guardDir] = findGuard(matrix);

    const [touched] = moveGuard(matrix, guardLocation, guardDir);

    part1(touched);
    part2(touched, matrix);
}

function rotateGuard([rowDir, columnDir]: Coords): Coords {
    // Down -> Left
    if (rowDir === 1 && columnDir === 0) return [0, -1];

    // Left -> Up
    if (rowDir === 0 && columnDir === -1) return [-1, 0];

    // Up -> Right
    if (rowDir === -1 && columnDir === 0) return [0, 1];

    // Right -> Down
    return [1, 0];
}

function moveGuard(
    matrix: Matrix,
    [startRow, startColumn]: Coords,
    startDir: Coords,
): [Map<string, string[]>, boolean] {
    const touched: Map<string, string[]> = new Map();

    let currentRow = startRow;
    let currentColumn = startColumn;
    let nextRow = currentRow + startDir[0];
    let nextColumn = currentColumn + startDir[1];
    let dir = startDir;

    // While we are in the map
    while (matrix.get(currentRow)?.get(currentColumn)) {
        // Next position would be a block, rotateGuard
        if (matrix.get(nextRow)?.get(nextColumn) === "#") {
            dir = rotateGuard(dir);

            nextRow = currentRow + dir[0];
            nextColumn = currentColumn + dir[1];

            continue;
        }

        // Protect from loops
        const seen = touched.get(`${currentRow}:${currentColumn}`) ?? [];
        if (seen?.includes(`${dir[0]}:${dir[1]}`)) return [touched, true];

        touched.set(`${currentRow}:${currentColumn}`, [
            ...seen,
            `${dir[0]}:${dir[1]}`,
        ]);

        // Take a step
        currentRow = nextRow;
        currentColumn = nextColumn;
        nextRow = currentRow + dir[0];
        nextColumn = currentColumn + dir[1];
    }

    return [touched, false];
}

function findGuard(matrix: Matrix): [Coords, Coords] {
    for (const rindex of matrix.keys()) {
        const row = matrix.get(rindex) as Row;

        for (const cindex of matrix.keys()) {
            const symbol = row.get(cindex) as string;

            const currPos: Coords = [rindex, cindex];

            if (symbol === "^") return [currPos, [-1, 0]];
            if (symbol === ">") return [currPos, [0, 1]];
            if (symbol === "v") return [currPos, [1, 0]];
            if (symbol === "<") return [currPos, [0, -1]];
        }
    }

    throw new Error("No Guard found");
}

function deepCloneMatrix<Type extends Map<number, string | Row>>(
    matrix: Type,
): Type {
    const newMatrix = new Map() as Type;
    for (const [key, value] of matrix.entries()) {
        if (value instanceof Map) {
            newMatrix.set(key, deepCloneMatrix<typeof value>(value));
            continue;
        }

        newMatrix.set(key, value);
    }

    return newMatrix;
}

function part1(touched: Map<string, string[]>) {
    console.log(`Part 1 result: ${touched.size}`);
}

function part2(touched: Map<string, string[]>, matrix: Matrix) {
    const blockerLocations = new Set();
    const [guardLocation, guardDir] = findGuard(matrix);

    for (const [position, dirs] of touched.entries()) {
        const [rposition, cposition] = position
            .split(":")
            .map((coord) => parseInt(coord));

        for (const dir of dirs) {
            const [rdir, cdir] = dir.split(":").map((coord) => parseInt(coord));
            const blockerLocation = [rposition + rdir, cposition + cdir];
            if (matrix.get(blockerLocation[0])?.get(blockerLocation[1]) !== ".")
                continue;

            const newMatrix = deepCloneMatrix<Matrix>(matrix);
            newMatrix.get(blockerLocation[0])?.set(blockerLocation[1], "#");

            const [, looped] = moveGuard(newMatrix, guardLocation, guardDir);

            if (looped) {
                blockerLocations.add(
                    `${blockerLocation[0]}:${blockerLocation[1]}`,
                );
            }
        }
    }

    console.log(`Part 2 result: ${blockerLocations.size}`);
}