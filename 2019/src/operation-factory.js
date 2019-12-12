'use strict';
const OperationOne = require('./operation-one');
const OperationTwo = require('./operation-two');
const OperationThree = require('./operation-three');
const OperationFour = require('./operation-four');
const OperationFive = require('./operation-five');
const OperationSix = require('./operation-six');
const OperationSeven = require('./operation-seven');
const OperationEight = require('./operation-eight');
const OperationNintyNine = require('./operation-ninty-nine');

class OperationFactory {
  static operationForCode(opCode) {
    if (opCode == 1) return OperationOne;
    if (opCode == 2) return OperationTwo;
    if (opCode == 3) return OperationThree;
    if (opCode == 4) return OperationFour;
    if (opCode == 5) return OperationFive;
    if (opCode == 6) return OperationSix;
    if (opCode == 7) return OperationSeven;
    if (opCode == 8) return OperationEight;
    if (opCode == 99) return OperationNintyNine;

    throw new Error(`No operation exists for code: ${opCode}`);
  }
}

module.exports = OperationFactory;
