'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const Wire = require('./wire');
const Point = require('./point');
const Path = require('./Path');

fs.readFileAsync('./day3/input', 'utf8')
  .then(inputData => inputData.split('\n'))
  .filter(instructionsString => instructionsString.length)
  .map(instructionsString => new Path(instructionsString.split(',')))
  .map(path => path.coordinatesOnPath())
  .map(points => new Wire(points))
  .then(wires => {
    return Promise.map(wires, wire => wire)
      .then(wires => Promise.filter(wires[0].points, point => wires[1].hasPoint(point)))
      .reduce((totalDistance, intersection) => {
        const distanceToIntersection = wires[0].distanceToPoint(intersection) + wires[1].distanceToPoint(intersection);
        if (totalDistance > distanceToIntersection) {
          return distanceToIntersection
        }

        return totalDistance
      }, Infinity);
  })
  .then(distance => console.log(`Shortest distance to an intersection: ${distance}`));


function getIntersections(wires) {
  return Promise.filter(wires[0].points, point => wires[1].hasPoint(point));
}




