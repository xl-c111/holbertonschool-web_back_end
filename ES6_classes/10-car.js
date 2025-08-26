export default class Car {
  constructor(brand, motor, color) {
    if (
      typeof brand !== 'string'
      || typeof motor !== 'string'
      || typeof color !== 'string'
    ) {
      throw new TypeError('brand, motor and color must be string');
    }
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  // for Car, the species is Car, for any subclass, the species is the subclass itself
  static get [Symbol.species]() {
    return this;
  }

  cloneCar() {
    return new this.constructor(this._brand, this._motor, this._color);
  }
}
