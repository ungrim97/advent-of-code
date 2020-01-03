'use strict';
const _ = require('lodash');

module.exports = class Satellite {
  primary = [];
  _allOrbits;

  constructor(name, primary) {
    this.name = name;
    this.primary = primary;
  }

  allOrbits() {
    if (!_.isEmpty(this._allOrbits)) {
      return this._allOrbits;
    }

    if (!this.primary) {
      return [];
    }

    this._allOrbits = [
      this.primary,
      ...this.primary.allOrbits()
    ];

    return this._allOrbits;
  }

  totalOrbits() {
    if (!this.primary) {
      return 0;
    }

    return 1 + this.primary.totalOrbits();
  }

  firstCommonPrimary(satellite) {
    const commonPrimaries = _.intersectionBy(this.allOrbits(), satellite.allOrbits(), 'name');
    if (_.isEmpty(commonPrimaries)) {
      return undefined;
    }

    return commonPrimaries[0];
  }

  orbits(satellite) {
    return _.find(this.allOrbits(), {name: satellite.name}) ? true : false;
  }

  stepsToSatellite(satellite) {
    // Current satellite is a satellite of input satellite
    if (this.orbits(satellite)) {
      return _.indexOf(this.allOrbits(), satellite) + 1;
    }

    const commonPrimary = this.firstCommonPrimary(satellite);

    // Current satellite and input satellite do not share a common orbit
    if (!commonPrimary) {
      return Infinity;
    }

    return this.stepsToSatellite(commonPrimary) + satellite.stepsToSatellite(commonPrimary);
  }
}
