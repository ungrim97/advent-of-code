'use strict';

const input = JSON.parse(require('fs').readFileSync('./day20.input.json').toString());

class Module {
    constructor(outputs, name) {
        this.name = name;
        this.outputs = outputs;
    }

    processPulse(value, origin) {
        return this.outputs.map((output) => this.createPulse(output, value));
    }

    createPulse(output, value) {
        return {
            destination: output,
            value,
            origin: this.name
        };
    }
}

// Switch
class FlipFlopModule extends Module {
    constructor(...args) {
        super(...args);
        this.on = false;
    }

    processPulse(value, origin) {
        if (value) return;

        this.on = !this.on;

        return super.processPulse(this.on, origin);
    }
}

// NAND Gate
class ConjunctionModule extends Module {
    constructor(...args) {
        super(...args);
        this.states = {};
    }

    addInputs(names) {
        names.forEach((name) => {
            this.states[name] = false;
        });
    }

    // If any input is false then we will return true otherwise false
    processPulse(value, origin) {
        this.states[origin] = value;

        const allActive = Object.keys(this.states).every((name) => this.states[name]);

        return this.outputs.map((output) => this.createPulse(output, !allActive));
    }
}

const processInput = () => {
    const data = input.reduce((out, line) => {
        const [_, type, name, outputs] = line.match(/^([&%]?)(.+) -> (.+)$/);
        out[name] = [type, outputs.split(', ')];
        return out;
    }, {});

    return Object.keys(data)
        .reduce((out, name) => {
            if (out[name]) return out;

            out[name] = buildModule(name, data, out);
            if (out[name] instanceof ConjunctionModule) {
                const inputs = Object.keys(data).filter((moduleName) => data[moduleName][1].includes(name));
                out[name].addInputs(inputs);
            }
            return out;
        }, {});
}

const buildModule = (name, data, modules) => {
    if (modules[name]) return modules[name];

    if (!name) return
    if (!data[name]) return new Module([], name);

    const [type, outputs] = data[name]

    if (!type) return new Module(outputs, name);

    switch (type) {
        case '&': return new ConjunctionModule(outputs, name);
        case '%': return new FlipFlopModule(outputs, name);
    }
}

const calcPulses = (modules, buttonCount) => {
    let highPulseCount = 0;
    let lowPulseCount = 0;

    for (let i = 0; i < buttonCount; i++) {
        // Push button
        lowPulseCount++;
        const queue = modules.broadcaster.processPulse(false, 'button');

        while (queue.length) {
            const pulse = queue.shift();
            pulse.value ? highPulseCount++ : lowPulseCount++;

            const destinationModule = modules[pulse.destination];

            if (!destinationModule) continue;
            const pulses = destinationModule.processPulse(pulse.value, pulse.origin);

            if (!pulses) continue;

            queue.push(...pulses);
        }
    }

    return lowPulseCount * highPulseCount;
}

const calcNeeded = (modules) => {
    const sourceModule = Object.keys(modules).find((module) => modules[module].outputs.includes('rx'));
    if (!sourceModule) return 0;

    const module = modules[sourceModule];
    if (!(module instanceof ConjunctionModule)) return 0;

    const gcd = (a, b) => a ? gcd(b % a, a) : b;
    const lcm = (a, b) => a * b / gcd(a, b);

    let seen = {};
    let iterations = 0;

    while (Object.keys(seen).length < Object.keys(module.states).length) {
        iterations += 1;

        // Push button
        const queue = modules.broadcaster.processPulse(false, 'button');

        while (queue.length) {
            const pulse = queue.shift();

            if (pulse.destination === module.name && !seen[pulse.origin] && pulse.value) {
                seen[pulse.origin] = iterations;
            };

            const destinationModule = modules[pulse.destination];

            if (!destinationModule) continue;
            const pulses = destinationModule.processPulse(pulse.value, pulse.origin);

            if (!pulses) continue;

            queue.push(...pulses);
        }
    };

    return Object.values(seen).reduce(lcm);
}

console.log('Part 1 = %d', calcPulses(processInput(), 1000));
console.log('Part 2 = %d', calcNeeded(processInput()));
