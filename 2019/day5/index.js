'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const Memory = require('../src/memory');
const MemoryAddress = require('../src/memory-address');
const OperationFactory = require('../src/operation-factory');

fs.readFileAsync('./day5/input', 'utf8')
  .then(inputData => inputData.split(','))
  .map(value => new MemoryAddress(value))
  .then(buffer => new Memory(buffer, OperationFactory))
  .then(memory => memory.processBuffer())
  .catch(console.error);
