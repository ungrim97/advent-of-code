'use strict';
const Operation = require('./operation');
module.exports = class OperationOne extends Operation {
  noOfParams = 3;

  perform([address1, address2, address3]) {
    if (!address1 || !address2 | !address3) {
      throw new Error('OperationOne requires 3 params: Address of value 1, Address of value 2 and Address the result should be stored in');
    }

    address3.value = address1.value + address2.value;
  }

  _positionModeForPointer(paramNumber) {
    if (paramNumber == 3) {
      return 0;
    }

    return super._positionModeForPointer(paramNumber);
  }
}
