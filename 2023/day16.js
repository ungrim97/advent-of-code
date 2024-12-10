'use strict';

const input = JSON.parse(require('fs').readFileSync('./day16.input.json').toString());

const getData = () => input.reduce((map, line, y) => {
    const points = line.split('');

    points.forEach((point, x) => {
        map[x] ??= [];

        map[y][x] = {value: point, energized: false};
    });

    return map;
}, []);

const findPath = (data, [x, y], [px, py]) => {
    const point = data[y]?.[x];
    const movingLeft = x - px === -1;
    const movingRight = x - px === 1;
    const movingUp = y - py === -1;
    const movingDown = y - py === 1;

    if (!point) return [];
    if (point.value !== '.' && point.energized) {
        if (point.energized === 'left' && movingLeft) return [];
        if (point.energized === 'right' && movingRight) return [];
        if (point.energized === 'up' && movingUp) return [];
        if (point.energized === 'down' && movingDown) return [];
    };

    point.energized = movingLeft ? 'left': movingRight ? 'right' : movingUp ? 'up' : movingDown ? 'down' : 'null';

    switch(point.value) {
        case ('.'): {
            return [[x,y]].concat(findPath(data, [x + (x - px), y + (y - py)], [x, y]));
        }
        case ('|'): {
            if (movingUp || movingDown) return [[x,y]].concat(findPath(data, [x + (x - px), y + (y - py)], [x, y]));
            return [[x,y]]
                .concat(
                    findPath(data, [x, y + 1], [x, y])
                )
                .concat(
                    findPath(data, [x, y - 1], [x, y]),
                );
        }
        case ('-'): {
            if (movingLeft || movingRight) return [[x,y]].concat(findPath(data, [x + (x - px), y + (y - py)], [x, y]));
            return [[x,y]]
                .concat(
                    findPath(data, [x + 1, y], [x, y]),
                )
                .concat(
                    findPath(data, [x - 1, y], [x, y]),
                );
        }
        case ('/'): {
            return [[x,y]].concat(
                movingLeft ? findPath(data, [x, y + 1], [x, y]) :
                movingRight ? findPath(data, [x, y - 1], [x, y]) :
                movingUp ? findPath(data, [x + 1, y], [x, y]) :
                movingDown ? findPath(data, [x - 1, y], [x, y]) : []
            );
        }
        case ('\\'): {
            return [[x,y]].concat(
                movingLeft ? findPath(data, [x, y - 1], [x, y]) :
                movingRight ? findPath(data, [x, y + 1], [x, y]) :
                movingUp ? findPath(data, [x - 1, y], [x, y]) :
                movingDown ? findPath(data, [x + 1, y], [x, y]) : []
            );
        }
        default: throw new Error(`Unknown symbol ${point.value}`);
    }
}

const calcEnergised = (start, entry) => {
    const data = getData();
    const path = findPath(data, start, entry);
    const energizedTotal = Object.values(data).reduce((total, line, y) => {
        return total += line.reduce((lineTotal, point, x) => lineTotal += point.energized ? 1 : 0, 0);
    }, 0)

    return energizedTotal;
}

const calcMax = () => {
    let max = 0;
    for (let y = 0; y < input.length; y++) {
        // Ingress from the left
        const left = calcEnergised([0, y], [-1, y]);
        if (left > max) max = left;

        // Ingress from the right
        const right = calcEnergised([input[y].length, y], [input[y].length +1, y]);
        if (right > max) max = right;

        for (let x = 0; x < input[y].length; x++) {
            if (y === 0) {
                // Ingress from above
                const above = calcEnergised([x, y], [x, y - 1]);
                if (above > max) max = above;
            }

            if (y === input.length) {
                // Ingress From below
                const below = calcEnergised([x, y], [x, y + 1]);
                if (below > max) max = below;
            }
        }
    }

    return max;
}

console.log('Part 1 - %d', calcEnergised([0,0], [-1,0]));

console.log('Part 2 - %d', calcMax());
