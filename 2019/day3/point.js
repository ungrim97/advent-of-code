'use strict';
module.exports = class Point {
  constructor([x,y]) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x}:${this.y}`;
  }

  distanceFrom([x,y]) {
    return Math.abs((Math.abs(this.x) - x) + (Math.abs(this.y) - y));
  }
}
