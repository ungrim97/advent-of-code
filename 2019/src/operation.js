'use strict';
module.exports = class Operation {
  isTerminator = 0;
  noOfParams = 0;
  positionModes = [];

  constructor(positionModes) {
    this.positionModes = positionModes.reverse();
  }

  paramPositionIsPointer(paramNumber) {
    // 0 is Pointer, 1 is Immediate
    // so return true if positionMode == 0
    return this._positionModeForPointer(paramNumber) == 0;
  }

  paramPositionIsImmediate(paramNumber) {
    // 0 is Pointer, 1 is Immediate
    // so return true if positionMode == 1
    return this._positionModeForPointer(paramNumber) == 1;
  }

  _positionModeForPointer(paramNumber) {
    return this.positionModes[Number(paramNumber) - 1] || 0;
  }
}
