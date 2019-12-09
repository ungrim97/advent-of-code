'use strict';
module.exports = class Path {
  constructor(instructions) {
    this.instructions = instructions;
  }

  // Generate all coordinates hit by the path
  coordinatesOnPath() {
    // Start at 0, 0
    let instructionStartCoords = [ 0, 0 ];

    // For each instruction
    return this.instructions
      .map(instruction => {

        // return a list of all coords on that segment
        const segmentCoords = this.coordinatesOnSegment({instruction, instructionStartCoords})

        // Set the new starting point to the end of the segment
        instructionStartCoords = segmentCoords[segmentCoords.length -1];
        return segmentCoords;
      })
      .reduce((a,b) => a.concat(b), []);
  }

  // Generate all the coordinates hit by this segment
  coordinatesOnSegment({instruction, instructionStartCoords: startingCoords}) {
    const found = instruction.match(/(?<direction>[RDUL])(?<distance>\d+)/);
    const {direction, distance} = found.groups;

    const step = this._stepFuncForDirection(direction);

    let currentCoords = startingCoords;
    const allCoords = [];

    for (let steps = 0; steps < distance; steps++) {
      currentCoords = step(currentCoords);
      allCoords.push(currentCoords);
    }

    return allCoords;
  }

  // Function for moving one step along the path
  _stepFuncForDirection(direction) {
    if (direction == 'R') {
      return ([x, y]) => {
        return [ (x + 1), y ];
      };
    }
    if (direction == 'L') {
      return ([x,y]) => {
        return [ (x - 1), y ]
      };
    }
    if (direction == 'U') {
      return ([x,y]) => {
        return [ x, (y + 1) ];
      };
    }

    return ([x,y]) => {
      return [ x, (y - 1) ];
    }
  }
}
