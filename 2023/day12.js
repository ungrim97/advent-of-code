'use strict';

const input = JSON.parse(require('fs').readFileSync('./day12.input.json').toString());

const cache = new Map();
const runCached = (string, groups, matchedString = '') => {
    const cacheKey = string + ' ' + groups.join(',');

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    const result = checkPermutations(string, groups, matchedString);

    cache.set(cacheKey, result);

    return result;
}

const checkPermutations = (string, groups, matchedString) => {
    // We have mapped every group of #'s. Success!
    if (groups.length === 0) {
        // We mapped every group but we have # points left. Fail
        if (string.match(/#/)) return 0;

        matchedString += string.replaceAll(/./g, '.');
        return 1;
    }

    // If string is shorter than required components then we failed.
    if (string.length < groups.reduce((a,b) => a += b)) {
        return 0;
    }


    if (string.charAt(0) === '.') {
        matchedString += '.';
        return runCached(string.slice(1), groups, matchedString);
    }

    if (string.charAt(0) === '?') {
        let total = 0;
        total += runCached('.' + string.slice(1), groups, matchedString);
        total += runCached('#' + string.slice(1), groups, matchedString);

        return total;
    }

    const exactRegexp = new RegExp('^(' + '[#?]'.repeat(groups[0]) + ')([^#]|$)');
    const [_, match, extra] = string.match(exactRegexp) ?? [];

    if (!match) {
        return 0;
    }

    matchedString += string.slice(0, groups[0], matchedString).replaceAll('?', '#');
    if (extra) matchedString += '.';
    return runCached(string.slice(groups[0] + 1), groups.slice(1), matchedString);
}

console.log('Part 1 = %d', input.reduce((total, line) => {
    const [string, groupings] = line.split(' ');
    const result = runCached(string, groupings.split(',').map(Number));

    return total += result;
}, 0));

console.log('Part 2 = %d', input.reduce((total, line) => {
    const [string, groupings] = line.split(' ');
    const result = runCached(`${string}?${string}?${string}?${string}?${string}`, `${groupings},${groupings},${groupings},${groupings}, ${groupings}`.split(',').map(Number));

    return total += result;
}, 0));
