'use strict';

const input = JSON.parse(require('fs').readFileSync('./day10.input.json').toString());

const data = input.reduce((map, line, lineIndex) => {
    const points = line.split('');

    points.forEach((point, index) => {
        if (point === 'S') map.start = [lineIndex, index];

        if (!map[lineIndex]) map[lineIndex] = [];

        map[lineIndex][index] = {value: point, inPath: false};
    });

    return map;
}, []);

const pipeExits = (type) => {
    switch (type) {
        case '|': return [[-1, 0], [1, 0]];
        case '-': return [[0, -1], [0, 1]];
        case 'L': return [[-1, 0], [0, 1]];
        case 'J': return [[-1, 0], [0, -1]];
        case '7': return [[0, -1], [1, 0]];
        case 'F': return [[1, 0], [0, 1]];
        case 'S': return [[1, 0], [0, 1], [-1, 0], [0, -1]];
        default: throw new Error(`Unknown pipe type ${type}`);
    }
}

const getNextPipe = ([row, column], [previousRow, previousColumn]) => {
    const next = pipeExits(data[row][column].value).find(([rowMod, columnMod]) => {
        const nextRow = row + rowMod;
        const nextColumn = column + columnMod;

        if (nextRow === previousRow && nextColumn === previousColumn) return false;
        if (data[nextRow][nextColumn].value === '.') return false;
        if (data[nextRow][nextColumn].value === 'S') return false;

        return true;
    });

    if (!next) return null;

    return [row + next[0], column + next[1]];
};

const findPath = ([row, column]) => {
    let currentPipe = [row, column];
    let previousPipe = [0, 0];
    let nextPipe = getNextPipe(currentPipe, previousPipe);

    const path = [currentPipe];
    while (nextPipe) {
        path.push(nextPipe);

        previousPipe = currentPipe;
        currentPipe = nextPipe;
        nextPipe = getNextPipe(currentPipe, previousPipe);
    }

    return path;
}

console.log('Part 1 - %j', findPath(data.start).length / 2);

const findEnclosed = () => {
    const path = findPath(data.start);
    const pathLength = path.length;

    let sum = 0;

    // Shoelace theorem to get the area of a polygon
    for (let i = 0; i < pathLength; i++) {
        const [x1, y1] = path[i];
        const [x2, y2] = path[i+1] ?? path[0];
        sum += (x1 + x2) * (y1 - y2);
    }

    const area = Math.abs(sum) / 2;

    // Picks Theorem to get the verticies bounded by a polygon
    return (area - (pathLength / 2) + 1);
};

console.log('Part 2 - %j', findEnclosed());
