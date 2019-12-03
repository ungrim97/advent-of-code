const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const parts = require('./parts');

fs.readFileAsync('./inputs/part1a', 'utf8')
  .then(inputData => parts.getFuelReq(inputData.split('\n')))
  .then(totalFuelReq => console.log(`Total Fuel required: ${totalFuelReq}`));
