const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports.getFuelReq = inputData => {
  return inputData
    .filter(mass => mass)
    .reduce((totalFuel, mass) => {
      return totalFuel + fuelForMass(mass);
    }, 0);
};

function fuelForMass(mass) {
  const fuelNeeded = Math.floor(mass/3) - 2;

  if (fuelNeeded <= 0) {
    return 0;
  }

  return fuelNeeded + fuelForMass(fuelNeeded);
}
