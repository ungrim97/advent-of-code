'use strict';
class OperationFactory {
  static operationForCode(opCode) {
    if (opCode == 1) return new OperationOne();
    if (opCode == 2) return new OperationTwo();
    if (opCode == 99) return new OperationNintyNine();

    throw new Error(`No operation exists for code: ${opCode}`);
  }
}

module.exports = OperationFactory;

class Operation {
  isTerminator = 0;
  noOfParams = 0;

  constructor() {}
}

class OperationOne extends Operation {
  noOfParams = 3;

  perform(addressParams) {
    if (addressParams.length !== 3) {
      throw new Error('OperationOne requires 3 params: Address of value 1, Address of value 2 and Address the result should be stored in');
    }

    addressParams[2].value = addressParams[0].value + addressParams[1].value;
  }
}

class OperationTwo extends Operation {
  noOfParams = 3;

  perform(addressParams) {
    addressParams[2].value = addressParams[0].value * addressParams[1].value;
  }
}

class OperationNintyNine extends Operation {
  isTerminator = 1;
}
