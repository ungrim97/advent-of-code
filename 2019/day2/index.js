'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const range = require('lodash').range;

const Memory = require('./memory');

fs.readFileAsync('./day2/input', 'utf8')
  .then(inputData => inputData.split(','))
  .then(buffer => {
    return range(100)
      .map(noun => {
        return range(100)
          .map(verb => ({ buffer, noun, verb }))
      })
      .reduce((a,b) => a.concat(b));
  })
  .then(variants => variants.map(variant => runVariant(variant)))
  .any()
  .then(variant => {
    return 100 * variant.noun + variant.verb;
  })
  .then(result => console.log(`Result: ${result}`))
  .catch(console.error);

function runVariant(variant) {
  return new Promise((resolve, reject) => {
    const memory = new Memory(variant.buffer);

    memory.addressAtPointer(1).value = variant.noun;
    memory.addressAtPointer(2).value = variant.verb;

    memory.processBuffer();
    const value = memory.addressAtPointer(0).value;

    if (value == 19690720) {
      resolve(variant);
    }

    reject(`Noun: ${variant.noun}. Verb: ${variant.verb}`);
  });
}
