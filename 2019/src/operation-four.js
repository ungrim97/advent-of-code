'use strict';
const Operation = require('./operation');
module.exports = class OperationFour extends Operation {
  noOfParams = 1;

  perform(addressParams) {
    if (addressParams.length !== 1) {
      throw new Error('OperationThree requires 1 params: Address of value 1');
    }

    console.log(addressParams[0].value);
  }
}

