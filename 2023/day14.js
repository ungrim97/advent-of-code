'use strict';

// const input = [
//     "O....#....",
//     "O.OO#....#",
//     ".....##...",
//     "OO.#O....O",
//     ".O.....O#.",
//     "O.#..O.#.#",
//     "..O..#O..O",
//     ".......O..",
//     "#....###..",
//     "#OO..#....",
// ];
const input = JSON.parse(require('fs').readFileSync('./day14.input.json').toString());

const tilt = (rows, dir) => {
    switch (dir) {
        case 'north': {
            const shifted = shiftRocks(rows[0].split('').map((_, x) => rows.map((row) => row.charAt(x)).join('')));
            return shifted[0].split('').map((_, x) => shifted.map((row) => row.charAt(x)).join(''));
        }
        case 'west':
            return shiftRocks(rows);
        case 'south': {
            const shifted = shiftRocks(rows[0].split('').map((_, x) => rows.map((row) => row.charAt(x)).join('')), 1);
            return shifted[0].split('').map((_, x) => shifted.map((row) => row.charAt(x)).join(''));
        }
        case 'east': {
            return shiftRocks(rows, 1);
        }
        default: throw new Error('Unknown direction');
    }
}

const seen = [];
const spin = (rows, maxCycles) => {
    let sorted = [...rows];
    for (let cycle = 0; cycle < maxCycles; cycle++) {
        sorted = tilt(sorted, 'north');
        sorted = tilt(sorted, 'west');
        sorted = tilt(sorted, 'south');
        sorted = tilt(sorted, 'east');

        const fieldString = sorted.join('|');
        const seenAt = Number(Object.keys(seen).find((key) => seen[key] == fieldString));

        if (seenAt) {
            const repeatLength = cycle - seenAt;
            const requiredOffset = (maxCycles - seenAt) % repeatLength;
            const requiredCycleResult = requiredOffset + seenAt - 1;

            return seen[requiredCycleResult].split('|');
        }

        seen[cycle] = sorted.join('|');
    }

    return sorted;
}

// Dir = -1 (forward) or 1 (backwards)
const shiftRocks = (rows, dir = -1) => {
    return rows.map((row) => {
        return row.split('#').map((chunk) => chunk.split('').sort((a,b) => a === 'O' ? dir : 0 - dir).join('')).join('#');
    });
}

console.log('Part 1 = %d', tilt(input, 'north').reduce((total, row, x, sorted) => total += (row.match(/O/g)?.length ?? 0) * (sorted.length - x), 0));
console.log('Part 2 = %d', spin(input, 1000000000).reduce((total, row, x, sorted) => total += (row.match(/O/g)?.length ?? 0) * (sorted.length - x), 0));
