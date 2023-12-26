'use strict';

const input = JSON.parse(require('fs').readFileSync('./day17.input.json').toString());

const parseInput = () => {
    return input.reduce((data, line, y) => {
        line.split('').forEach((char, x) => data[x][y] = Number(char));
        return data;
    }, Array.from({length: input.length}, () => Array(input[0].length)));
}

const calcMinCostRoute = (data, minMoves, maxMoves) => {
    /** @type {[number, number, number, (1|0)][]} queue */
    const queue = [[0, 0, 0, 1], [0, 0, 0, 0]];
    const seen = Array.from({length: data.length}, () => Array(data[0].length).fill(null).map(() => [null, null]));
    const goalX = data.length - 1;
    const goalY = data[0].length - 1;

    // Mods to surrounding points

    while (queue.length) {
        const [x, y, cost, direction] = queue.shift();

        if (seen[x][y][direction]) continue;
        seen[x][y][direction] = cost;

        if (x === goalX && y === goalY) return cost;

        // We can move relatively left/up/-1 or right/down/1
        for (const mod of [1, -1]) {
            let directionCost = cost;

            // Move max distance allowed
            for (let i = 1; i <= maxMoves; i++) {
                const x2 = direction ? x + i * mod : x;
                const y2 = direction ? y : y + i * mod;

                if (!data[x2]?.[y2]) break;

                directionCost += data[x2][y2];

                // Add a branch point to the queue by changing direction
                if (i >= minMoves) {
                    queue.push([x2, y2, directionCost, direction ? 0 : 1]);
                    queue.sort((a, b) => a[2] - b[2]);
                }
            }
        }
    }
}

console.log('Part 1 = %s', calcMinCostRoute(parseInput(), 1, 3));
console.log('Part 2 = %s', calcMinCostRoute(parseInput(), 4, 10));

