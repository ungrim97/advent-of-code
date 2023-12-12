'use strict';

const input = JSON.parse(require('fs').readFileSync('./day11.input.json').toString());

const data = input.map((line) => {
    return line.split('');
});

const galaxyCoords = data.reduce((galaxies, row, y) => {
    row.forEach((point, x) => {
        if (point === '#') galaxies.push([x, y]);
    });

    return galaxies;
}, []);

const emptyRows = data.reduce((indecies, row, y) => {
    if (!row.find((point) => point === '#')) return indecies.concat(y);
    return indecies;
}, []);

const emptyColumns = data[0].reduce((indecies, _, x) => {
    if (!data.find((row) => row[x] === '#')) return indecies.concat(x);

    return indecies;
}, []);

const distanceBetweenGalaxies = (galaxies, expansionAmount) => {
    return galaxies.reduce((total, galaxy, index) => {
        const [x1, y1] = galaxy;
        for (const [x2, y2] of galaxyCoords.slice(index + 1)) {
            const emptyColumnsBetween = emptyColumns.filter((i) => (x1 < i && x2 > i) || (x1 > i && x2 < i)).length;
            const emptyRowsBetween = emptyRows.filter((i) => (y1 < i && y2 > i) || (y1 > i && y2 < i)).length;

            const xDist = Math.abs(x1 - x2) + (emptyColumnsBetween * (expansionAmount - 1));
            const yDist = Math.abs(y1 - y2) + (emptyRowsBetween * (expansionAmount - 1));

            total += xDist + yDist;
        }

        return total;
    }, 0);
}

console.log('Part 1 = %d', distanceBetweenGalaxies(galaxyCoords, 2));
console.log('Part 2 = %d', distanceBetweenGalaxies(galaxyCoords, 1000000));
