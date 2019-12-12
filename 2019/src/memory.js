'use stict';

module.exports = class Memory {
  buffer = [];
  instructionPointer = 0;

  constructor(addressBuffer, OperationFactory) {
    this.buffer = addressBuffer;
    this.OperationFactory = OperationFactory;
  }

  addressAtPointer(pointer) {
    return this.buffer[pointer];
  }

  processBuffer() {
    const instructionValue = this.addressAtPointer(this.instructionPointer).value;

    if (typeof instructionValue === 'undefined') {
      throw new Error(`No instruction at ${this.instructionPointer}`);
    }

    const operation = this._generateOperation(instructionValue);

    if (operation.isTerminator) {
      return this;
    }

    let newPointer = this._processOperation(operation);
    if (newPointer === undefined) {
      newPointer = this.instructionPointer + operation.noOfParams + 1;
    }

    this.instructionPointer = newPointer;

    return this.processBuffer();
  }

  _generateOperation(instruction) {
    const opCode = String(instruction).slice(-2);
    const positionModes = String(instruction).slice(0,-2).split('');

    const Operation = this.OperationFactory.operationForCode(opCode);
    return new Operation(positionModes);
  }

  _processOperation(operation) {
    const opParams = [];
    if (operation.noOfParams > 0) {
      for (let i = 1; i <= operation.noOfParams; i++) {
        const address = this.addressAtPointer(this.instructionPointer + i);

        opParams.push(
          operation.paramPositionIsPointer(i) ?
            this.addressAtPointer(address.value) :
            address
        )
      };
    }

    return operation.perform(opParams);
  }
}
