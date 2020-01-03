'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

const Satellite = require('../src/satellite');

fs.readFileAsync('./day6/input', 'utf8')
  .then(inputData => inputData.split('\n'))
  .map(orbit => orbit.split(')'))
  .filter(orbit => orbit.length == 2)
  .map(([satellite_a, satellite_b]) => ({ name: satellite_b, primary: satellite_a }))
  .then(buildSatellites)
  .then(satellites => {
    Promise
      .reduce(satellites, (totalOrbits, satellite) => totalOrbits + satellite.totalOrbits(), 0)
      .then(totalOrbits => console.log(`Total orbits: ${totalOrbits}`))
      .catch(console.error);

    Promise
      .filter(satellites, satellite => satellite.name === 'YOU')
      .any()
      .then(you => {
        if (!you) {
          return Infinity;
        }

        // Find common orbit between A and B
        return Promise.filter(satellites, satellite => satellite.name == 'SAN')
          .any()
          .then(san => {
            if (!san) {
              return Infinity;
            }

            return you.primary.stepsToSatellite(san.primary);
          });
      })
      .then(totalSteps => console.log(`Total steps: ${totalSteps}`))
      .catch(console.error);
  })
  .catch(console.error);

function buildSatellites(satelliteMap) {
  const seen_satellites = {};
  const buildSatellite = ({name, primary}) => {
    if (seen_satellites[name]) {
      return seen_satellites[name];
    }

    if (!primary) {
      seen_satellites[name] = new Satellite(name);
      return seen_satellites[name];
    }

    const orbitMap = _.find(satelliteMap, {name: primary}) || {name: primary};

    seen_satellites[name] = new Satellite(name, buildSatellite(orbitMap));
    return seen_satellites[name];
  };

  return satelliteMap.map(buildSatellite);

}

