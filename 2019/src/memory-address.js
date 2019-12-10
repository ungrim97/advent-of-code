'use stict';
module.exports = class Address {
  value;

  constructor(initialValue) {
    this.value = Number(initialValue);
  }
}
