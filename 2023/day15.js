'use strict';

const input = JSON.parse(require('fs').readFileSync('./day15.input.json').toString());

const hashString = (string) => {
    return string.split('').reduce((stringTotal, char) => {
        stringTotal += char.charCodeAt(0);
        stringTotal *= 17;
        return stringTotal % 256;
    }, 0);
};

const sortToBoxes = (instructions) => {
    const boxes = Array(256);

    instructions.forEach((instruction) => {
        const [match, label, sign, focalLength] = instruction.match(/^([^=-]*)(=|-)(\d*)$/);
        const box = boxes[hashString(label)] ??= new Map();

        if (sign === '-') {
            return box.delete(label);
        }

        box.set(label, focalLength);
    });

    return boxes;
};

console.log('Part 1 = %d', input.reduce((total, string) => total += hashString(string), 0));

console.log('Part 2 = %d', sortToBoxes(input).reduce((total, box, boxIndex) => {
    if (!box) return total;

    Array.from(box.entries()).forEach(([label, focalLength], lensIndex) => {
        total += (boxIndex + 1) * (lensIndex + 1) * focalLength;
    });

    return total;
}, 0));
