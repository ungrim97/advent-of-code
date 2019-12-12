'use strict';
const Operation = require('./operation');
module.exports = class OperationFive extends Operation {
  noOfParams = 2;

  perform([address1, address2]) {
    if (!address1 || !address2 ) {
      throw new Error('OperationFive requires 2 params: Address of value 1, Address of value 2');
    }

    if (address1.value != 0) {
      return address2.value
    }
  }
}
