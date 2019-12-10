'use strict';
const OperationOne = require('./operation-one');
const OperationTwo = require('./operation-two');
const OperationNintyNine = require('./operation-ninty-nine');

class OperationFactory {
  static operationForCode(opCode) {
    if (opCode == 1) return OperationOne;
    if (opCode == 2) return OperationTwo;
    if (opCode == 99) return OperationNintyNine;

    throw new Error(`No operation exists for code: ${opCode}`);
  }
}

module.exports = OperationFactory;
