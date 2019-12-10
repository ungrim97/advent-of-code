'use strict';
module.exports = class Wire {
  points = [];
  pointMap = {}; // Allow easier lookup
  constructor(points) {
    points.map(point => {
      this.points.push(point);
      if (this.pointMap[point.toString()]) {
        this.pointMap[point.toString()].push({ point, steps: this.points.length });
      }

      this.pointMap[point.toString()] = [{ point, steps: this.points.length }];
    });
  }

  distanceToPoint(point) {
    // We always want the shortest distance
    return Number(this.pointMap[point.toString()][0].steps);
  }

  hasPoint(point) {
    return this.pointMap[point.toString()];
  }
}
