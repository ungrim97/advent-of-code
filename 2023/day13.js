'use strict';

// const input = [
//     "#.##..##.",
//     "..#.##.#.",
//     "##......#",
//     "##......#",
//     "..#.##.#.",
//     "..##..##.",
//     "#.#.##.#.",
//     "",
//     "#...##..#",
//     "#....#..#",
//     "..##..###",
//     "#####.##.",
//     "#####.##.",
//     "..##..###",
//     "#....#..#",
// ];
const input = JSON.parse(require('fs').readFileSync('./day13.input.json').toString());

const data = input.join(',').split(',,').map((segment) => segment.split(','));

const getReflections = (rows, diffsAllowed = 0) => {
    // For each row
    FOO: for (let i = 0; i < rows.length - 1; i++) {
        let diffs = 0;

        // Find the reflection and move out
        for (let j = 0; j < rows.length - 2; j++) {
            const string1 = rows[i - j];
            const string2 = rows[i + j + 1];

            if (!string1 || !string2) break;

            // Calc Levenschtien distance between the two strings
            diffs += string1.split('').filter((char, index) => char !== string2.charAt(index)).length;

            if (diffs > diffsAllowed) break;
        }

        // If the total number of differences in this === our allowed error margin. Then this is a good reflection
        if (diffs === diffsAllowed) return i + 1;
    }

    return 0;
}

console.log('Part 1 = %d', data.reduce((total, rows, x) => {
    const horizontalReflectionPoint = getReflections(rows);

    const verticalReflectionPoint = getReflections(rows[0].split('').map((_, x) => rows.map((row) => row.charAt(x)).join('')));

    return total += verticalReflectionPoint + (100 * horizontalReflectionPoint);
}, 0));

console.log('Part 2 = %d', data.reduce((total, rows, x) => {
    const horizontalReflectionPoint = getReflections(rows, 1);

    const verticalReflectionPoint = getReflections(rows[0].split('').map((_, x) => rows.map((row) => row.charAt(x)).join('')), 1);

    return total += verticalReflectionPoint + (100 * horizontalReflectionPoint);
}, 0));
