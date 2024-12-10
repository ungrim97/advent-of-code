'use strict';

const input = JSON.parse(require('fs').readFileSync('./day18.input.json').toString());

const dirFromInt = (int) => {
    switch (int) {
        case '0': return 'R';
        case '1': return 'D';
        case '2': return 'L';
        case '3': return 'U';
        default: throw new Error('Unknown Direction code');
    }
};

const extractDirAndLength = (line, useHexComponent) => {
    const [_, dir, length, colour] = line.match(/^([UDLR]) (\d+) \((.*)\)$/);

    if (! useHexComponent) return [dir, Number(length)];

    return [
        dirFromInt(colour.slice(6)),
        parseInt(colour.slice(1, 6), 16),
    ];
}

const findEnclosed = (useHexComponent) => {
    const result = input.reduce((sum, line, index) => {
        const [dir, length] = extractDirAndLength(line, useHexComponent);
        const {x: x1, y: y1, total, length: pathLength} = sum;

        const xMod = dir === 'R' ? length : dir === 'L' ? - length : 0;
        const yMod = dir === 'D' ? length : dir === 'U' ? - length : 0;
        const x2 = x1 + xMod;
        const y2 = y1 + yMod;

        return {
            total: total + ((x1 + x2) * (y1 - y2)),
            length: pathLength + length,
            x: x2,
            y: y2,
        };
    }, {total: 0, length: 0, x: 0, y:0});

    // Shoelace results
    const area = Math.abs(result.total) / 2;

    // Picks for the internal
    return result.length + (area - (result.length / 2) + 1);
}

console.log('Part 1 = %d', findEnclosed(0));
console.log('Part 2 = %d', findEnclosed(1));
