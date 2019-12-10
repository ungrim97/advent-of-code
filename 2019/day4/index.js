'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const range = require('lodash').range;

const Password = require('../src/password');

fs.readFileAsync('./day4/input', 'utf8')
  .then(inputData => inputData.split('-'))
  .then(([bottom, top]) => range(bottom, (Number(top) + 1)))
  .map(variant => new Password(variant.toString().split('')))
  .filter(password => password.isValid())
  .then(validPasswords => console.log(`Total Valid passwords in range: ${validPasswords.length}`));
