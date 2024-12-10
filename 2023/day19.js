'use strict';

const input = JSON.parse(require('fs').readFileSync('./day19.input.json').toString());

const parsePart = (partString) => {
    return partString
        .replaceAll('{', '')
        .replaceAll('}', '')
        .split(',')
        .reduce((part, categoryValue) => {
            const [cat, val] = categoryValue.split('=');
            part[cat] = Number(val);

            return part;
        }, {x: null, m: null, a: null, s: null});
};

const parseWorkflow = (name, workflowString) => {
    return workflowString.split(',').reduce((data, workflow) => {
        const [_, cat, op, val, out] = workflow.match(/^(?:([xmas])([<>])(\d+):)?(.+)$/);

        if (cat) {
            data.tests.push({cat, op, val: Number(val), out});
            return data;
        }

        data.name = name;
        data.out = out;
        return data;
    }, {tests: [], out: null});
}

const parseInput = () => {
    return input.reduce((data, line) => {
        if (line.length === 0) return data;

        if (line.charAt(0) === '{') {
            data.parts.push(parsePart(line));
            return data;
        }

        const [match, name, workflowString] = line.match(/([^{]+){(.*)}/);
        data.workflows[name] = parseWorkflow(name, workflowString);

        return data;
    }, {workflows: {}, parts: []});
}

const processPart = (part, workflow, workflows) => {
    const outputWorkflow = workflow.tests.find((test) => {
        switch(test.op) {
            case '>': {
                if (part[test.cat] > test.val) return true;
                break;
            }
            case '<': {
                if (part[test.cat] < test.val) return true;
                break;
            }
        }
    }) ?? workflow;

    if (outputWorkflow.out === 'A') return true;
    if (outputWorkflow.out === 'R') return false;

    return processPart(part, workflows[outputWorkflow.out], workflows);
}

const sumParts = (data) => {
    return data.parts.reduce((total, part) => {
        const approved = processPart(part, data.workflows.in, data.workflows);
        if (approved) total += (part.x + part.m + part.a + part.s);
        return total;
    }, 0);
};

const calcCombinations = (results) => {
    const combinations = (results.x[1] - results.x[0] + 1)
        * (results.m[1] - results.m[0] + 1)
        * (results.a[1] - results.a[0] + 1)
        * (results.s[1] - results.s[0] + 1);

    return combinations;
};

const sumCombinations = (workflow, results, workflows) => {
    const total = workflow.tests.reduce((value, test) => {
        const newResults = JSON.parse(JSON.stringify(results));
        let [min, max] = newResults[test.cat];
        if (test.op === '<') {
            max = Math.min(test.val - 1, max);
            results[test.cat][0] = Math.max(test.val, results[test.cat][0]);
        }
        if (test.op === '>') {
            min = Math.max(test.val + 1, min);
            results[test.cat][1] = Math.min(test.val, results[test.cat][1]);
        }

        newResults[test.cat] = [min, max];

        if (min > max) return value;
        if (test.out === 'R') return value;
        if (test.out === 'A') return value + calcCombinations(newResults);

        return value + sumCombinations(
            workflows[test.out],
            newResults,
            workflows
        );
    }, 0);

    if (workflow.out === 'R') return total;
    if (workflow.out === 'A') return total + calcCombinations(results);

    return total + sumCombinations(workflows[workflow.out], results, workflows);
}

const data = parseInput();
console.log('Part 1 = %j', sumParts(data));
console.log('Part 2 = %j', sumCombinations(data.workflows.in, {x: [1,4000], m: [1,4000], a: [1,4000], s: [1,4000]}, data.workflows));
