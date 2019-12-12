'use strict';
const Operation = require('./operation');
const prompt = require('prompt-sync')({sigint: true});

module.exports = class OperationThree extends Operation {
  noOfParams = 1;

  perform([address1]) {
    if (!address1) {
      throw new Error('OperationThree requires 1 params: Address the value should be stored in');
    }

    address1.value = Number(prompt('Input system number to perform diagnostics: '));
  }

  _positionModeForPointer() {
      return 0;
  }
}
