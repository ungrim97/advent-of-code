// --- Day 8: Resonant Collinearity ---
//
// You find yourselves on the roof of a top-secret Easter Bunny installation.
//
// While The Historians do their thing, you take a look at the familiar huge antenna. Much to your surprise, it seems to have been reconfigured to emit a signal that makes people 0.1% more likely to buy Easter Bunny brand Imitation Mediocre Chocolate as a Christmas gift! Unthinkable!
//
// Scanning across the city, you find that there are actually many such antennas. Each antenna is tuned to a specific frequency indicated by a single lowercase letter, uppercase letter, or digit. You create a map (your puzzle input) of these antennas. For example:
//
// ............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............
//
// The signal only applies its nefarious effect at specific antinodes based on the resonant frequencies of the antennas. In particular, an antinode occurs at any point that is perfectly in line with two antennas of the same frequency - but only when one of the antennas is twice as far away as the other. This means that for any pair of antennas with the same frequency, there are two antinodes, one on either side of them.
//
// So, for these two antennas with frequency a, they create the two antinodes marked with #:
//
// ..........
// ...#......
// ..........
// ....a.....
// ..........
// .....a....
// ..........
// ......#...
// ..........
// ..........
//
// Adding a third antenna with the same frequency creates several more antinodes. It would ideally add four antinodes, but two are off the right side of the map, so instead it adds only two:
//
// ..........
// ...#......
// #.........
// ....a.....
// ........a.
// .....a....
// ..#.......
// ......#...
// ..........
// ..........
//
// Antennas with different frequencies don't create antinodes; A and a count as different frequencies. However, antinodes can occur at locations that contain antennas. In this diagram, the lone antenna with frequency capital A creates no antinodes but has a lowercase-a-frequency antinode at its location:
//
// ..........
// ...#......
// #.........
// ....a.....
// ........a.
// .....a....
// ..#.......
// ......A...
// ..........
// ..........
//
// The first example has antennas with two different frequencies, so the antinodes they create look like this, plus an antinode overlapping the topmost A-frequency antenna:
//
// ......#....#
// ...#....0...
// ....#0....#.
// ..#....0....
// ....0....#..
// .#....A.....
// ...#........
// #......#....
// ........A...
// .........A..
// ..........#.
// ..........#.
//
// Because the topmost A-frequency antenna overlaps with a 0-frequency antinode, there are 14 total unique locations that contain an antinode within the bounds of the map.
//
// Calculate the impact of the signal. How many unique locations within the bounds of the map contain an antinode?
// --- Part Two ---
//
// Watching over your shoulder as you work, one of The Historians asks if you took the effects of resonant harmonics into your calculations.
//
// Whoops!
//
// After updating your model, it turns out that an antinode occurs at any grid position exactly in line with at least two antennas of the same frequency, regardless of distance. This means that some of the new antinodes will occur at the position of each antenna (unless that antenna is the only one of its frequency).
//
// So, these three T-frequency antennas now create many antinodes:
//
// T....#....
// ...T......
// .T....#...
// .........#
// ..#.......
// ..........
// ...#......
// ..........
// ....#.....
// ..........
//
// In fact, the three T-frequency antennas are all exactly in line with two antennas, so they are all also antinodes! This brings the total number of antinodes in the above example to 9.
//
// The original example now has 34 antinodes, including the antinodes that appear on every antenna:
//
// ##....#....#
// .#.#....0...
// ..#.#0....#.
// ..##...0....
// ....0....#..
// .#...#A....#
// ...#..#.....
// #....#.#....
// ..#.....A...
// ....#....A..
// .#........#.
// ...#......##
//
// Calculate the impact of the signal using this updated model. How many unique locations within the bounds of the map contain an antinode?

import { readFileSync } from "fs";

main(readFileSync("./day8.input", { encoding: "utf8" }).trim().split("\n"));

type Coord = [number, number];

function main(input: string[]) {
    const antennaMap = new Map();

    for (let rindex = 0; rindex < input.length; rindex++) {
        const cells = input[rindex].split("");
        for (let cindex = 0; cindex < cells.length; cindex++) {
            if (cells[cindex] === ".") continue;

            antennaMap.set(cells[cindex], [
                ...(antennaMap.get(cells[cindex]) ?? []),
                [rindex, cindex],
            ]);
        }
    }

    part1(antennaMap, [input.length, input[0].split("").length]);
    part2(antennaMap, [input.length, input[0].split("").length]);
}

function isInBounds(antinode: Coord, rbound: number, cbound: number): boolean {
    if (antinode[0] < 0) return false;
    if (antinode[0] >= rbound) return false;
    if (antinode[1] < 0) return false;
    if (antinode[1] >= cbound) return false;

    return true;
}

function isSamePoint(pointA: Coord, pointB: Coord) {
    if (pointA[0] !== pointB[0]) return false;
    return pointA[1] === pointB[1];
}

function getAntinodes(
    antennaMap: Map<string, Coord[]>,
    findAntinodesForPoint: (pointA: Coord, pointB: Coord) => Coord[],
): Set<string> {
    const antinodePositions = new Set<string>();

    for (const [, points] of antennaMap.entries()) {
        for (let i = 0; i < points.length; i++) {
            const pointA = points[i];
            for (let j = 0; j < points.length; j++) {
                const pointB = points[j];
                if (isSamePoint(pointA, pointB)) continue;

                const antinodes = findAntinodesForPoint(pointA, pointB);
                if (antinodes) {
                    antinodes.forEach((antinode) => {
                        antinodePositions.add(`${antinode}`);
                    });
                }
            }
        }
    }

    return antinodePositions;
}

function part1(antennaMap: Map<string, Coord[]>, [rbound, cbound]: Coord) {
    const antinodePositions = getAntinodes(
        antennaMap,
        (pointA: Coord, pointB: Coord): Coord[] => {
            const rdist = pointA[0] - pointB[0];
            const cdist = pointA[1] - pointB[1];

            const antinode: Coord = [pointA[0] + rdist, pointA[1] + cdist];

            if (isInBounds(antinode, rbound, cbound)) return [antinode];

            return [];
        },
    );

    console.log(`Part 1 results: ${antinodePositions.size}`);
}

function part2(antennaMap: Map<string, Coord[]>, [rbounds, cbounds]: Coord) {
    const antinodePositions = getAntinodes(
        antennaMap,
        (pointA: Coord, pointB: Coord): Coord[] => {
            // Draw antinodes in a line from PointA bisecting PointB
            const rdist = pointA[0] - pointB[0];
            const cdist = pointA[1] - pointB[1];

            const antinodes = [];

            let antinode: Coord = [pointA[0] - rdist, pointA[1] - cdist];

            while (isInBounds(antinode, rbounds, cbounds)) {
                antinodes.push(antinode);
                antinode = [antinode[0] - rdist, antinode[1] - cdist];
            }

            return antinodes;
        },
    );

    console.log(`Part 2 results: ${antinodePositions.size}`);
}
