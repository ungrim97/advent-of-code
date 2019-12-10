'use strict';
const _ = require('lodash');

module.exports = class Password {
  constructor(characters) {
    this.characters = characters;
  }

  isValid() {
    return this._increasingCharValue() && this._identicalAdjacentChars();
  }

  _identicalAdjacentChars() {
    return _.some(this.characters, (character, index) => {
      // Doesn't match next character so not part of a double
      if (character != this.characters[index + 1]) {
        return false;
      }

      // Matches next 2 characters so part of a triple
      if (character == this.characters[index + 2]) {
        return false;
      }

      // Matches next character and previous character so part of a triple
      if (character == this.characters[index - 1]) {
        return false;
      }

      return true;
    });
  }

  _increasingCharValue() {
    return _.every(this.characters, (character, index) => {
      if (character > this.characters[index + 1]) {
        return false;
      }

      return true;
    });
  }
}
