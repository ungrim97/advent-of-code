class Module {
  constructor(mass) {
    this.mass = mass;
  }

  fuelReq() {
    return this._fuelForMass(this.mass)
  }

  _fuelForMass(mass) {
    const fuelNeeded = Math.floor(mass/3) - 2;

    if (fuelNeeded <= 0) {
      return 0;
    }

    return fuelNeeded + this._fuelForMass(fuelNeeded);
  }
}

module.exports = Module;
