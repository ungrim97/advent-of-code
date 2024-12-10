// --- Day 2: Red-Nosed Reports ---
//
// Fortunately, the first location The Historians want to search isn't a long walk from the Chief Historian's office.
//
// While the Red-Nosed Reindeer nuclear fusion/fission plant appears to contain no sign of the Chief Historian, the engineers there run up to you as soon as they see you. Apparently, they still talk about the time Rudolph was saved through molecular synthesis from a single electron.
//
// They're quick to add that - since you're already here - they'd really appreciate your help analyzing some unusual data from the Red-Nosed reactor. You turn to check if The Historians are waiting for you, but they seem to have already divided into groups that are currently searching every corner of the facility. You offer to help with the unusual data.
//
// The unusual data (your puzzle input) consists of many reports, one report per line. Each report is a list of numbers called levels that are separated by spaces. For example:
//
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
//
// This example data contains six reports each containing five levels.
//
// The engineers are trying to figure out which reports are safe. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:
//
//     The levels are either all increasing or all decreasing.
//     Any two adjacent levels differ by at least one and at most three.
//
// In the example above, the reports can be found safe or unsafe by checking those rules:
//
//     7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
//     1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
//     9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
//     1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
//     8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
//     1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
//
// So, in this example, 2 reports are safe.
//
// Analyze the unusual data from the engineers. How many reports are safe?

import { readFileSync } from "fs";

main(
    readFileSync("./day2.input", { encoding: "utf8" })
        .trim()
        .split("\n")
        .reduce((reports: number[][], line: string): number[][] => {
            return [...reports, line.split(" ").map((num) => parseInt(num))];
        }, []),
);

function compareSafe(report: number[]): boolean {
    const isAsc = report[0] < report[1];

    for (let i = 0; i < report.length; i++) {
        const currentItem = report[i];
        const nextItem = report[i + 1];

        if (!nextItem) return true;

        if (currentItem === nextItem) {
            return false;
        }

        if (Math.abs(currentItem - nextItem) > 3) {
            return false;
        }

        if (isAsc !== currentItem < nextItem) {
            return false;
        }
    }

    return true;
}

function isSafeSeq({
    report,
    allowError = false,
}: {
    report: number[];
    allowError?: boolean;
}) {
    // Generate a list excluding 1 item
    const isSafe = compareSafe(report);

    if (isSafe) return true;
    if (!allowError) return false;

    for (let i = 0; i < report.length; i++) {
        const newReport = [...report.slice(0, i), ...report.slice(i + 1)];

        // Generate a list excluding 1 item
        const isSafe = compareSafe(newReport);

        if (isSafe) return true;
        if (!allowError) return false;
    }

    return false;
}

function main(reports: number[][]) {
    part1(reports);
    part2(reports);
}

function part1(reports: number[][]) {
    const sum = reports.filter((report) => {
        const isSafe = isSafeSeq({
            report,
            allowError: false,
        });
        return isSafe;
    }).length;
    console.log(`Part 1 Result: ${sum}`);
}

function part2(reports: number[][]) {
    const sum = reports.filter((report) => {
        const isSafe = isSafeSeq({
            report,
            allowError: true,
        });
        return isSafe;
    }).length;
    console.log(`Part 2 Result: ${sum}`);
}
