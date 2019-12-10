'use strict';
const Operation = require('./operation');
module.exports = class OperationOne extends Operation {
  noOfParams = 3;

  perform(addressParams) {
    if (addressParams.length !== 3) {
      throw new Error('OperationOne requires 3 params: Address of value 1, Address of value 2 and Address the result should be stored in');
    }

    addressParams[2].value = addressParams[0].value + addressParams[1].value;
  }
}
