'use stict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const OperationFactory = require('./operation-factory');

class Address {
  value;
  constructor(initialValue) {
    this.value = Number(initialValue);
  }
}

class Memory {
  buffer = [];
  instructionPointer = 0;

  constructor(addressBuffer) {
    this.buffer = addressBuffer.map(addressValue => new Address(addressValue));
  }

  addressAtPointer(pointer) {
    return this.buffer[pointer];
  }

  processBuffer() {
    const instructionAddress = this.addressAtPointer(this.instructionPointer);

    if (!instructionAddress) {
      throw new Error(`No instruction at ${this.instructionPointer}`);
    }

    const operation = OperationFactory.operationForCode(instructionAddress.value);
    if (operation.isTerminator) {
      return this;
    }

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

    this.instructionPointer += (operation.noOfParams + 1);
    return this.processBuffer();
  }
}

module.exports = Memory;
