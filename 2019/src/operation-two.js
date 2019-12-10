'use strict';
const Operation = require('./operation');

module.exports = class OperationTwo extends Operation {
  noOfParams = 3;

  perform(addressParams) {
    addressParams[2].value = addressParams[0].value * addressParams[1].value;
  }
}
