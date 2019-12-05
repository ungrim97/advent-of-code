const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const Module = require('./module');

fs.readFileAsync('./day1/input', 'utf8')
  .then(inputData => inputData.split('\n'))
  .filter(mass => mass)
  .map(mass => new Module(mass))
  .reduce((totalFuel, module) => {
    return totalFuel + module.fuelReq();
  }, 0)
  .then(totalFuelReq => console.log(`Total Fuel required: ${totalFuelReq}`));
