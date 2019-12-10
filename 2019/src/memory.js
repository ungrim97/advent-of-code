'use stict';

module.exports = class Memory {
  buffer = [];
  instructionPointer = 0;

  constructor(addressBuffer, opFactory) {
    this.buffer = addressBuffer;
    this.opFactory = opFactory;
  }

  addressAtPointer(pointer) {
    return this.buffer[pointer];
  }

  processBuffer() {
    const instructionAddress = this.addressAtPointer(this.instructionPointer);

    if (!instructionAddress) {
      throw new Error(`No instruction at ${this.instructionPointer}`);
    }

    const Operation = this.opFactory.operationForCode(instructionAddress.value);
    const operation = new Operation();
    if (operation.isTerminator) {
      return this;
    }

    this._processOperation(operation);

    this.instructionPointer += (operation.noOfParams + 1);
    return this.processBuffer();
  }

  _processOperation(operation) {
    const opParams = [];
    if (operation.noOfParams > 0) {
      for (let i = 1; i <= operation.noOfParams; i++) {
        const paramPointer = this.addressAtPointer(this.instructionPointer + i);

        opParams.push(
          this.addressAtPointer(paramPointer.value)
        );
      }
    }

    operation.perform(opParams);
  }
}
