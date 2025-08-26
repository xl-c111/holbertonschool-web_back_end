export default class Building {
  constructor(sqft) {
    if (typeof sqft !== 'number') {
      throw new TypeError('sqft must be a number');
    }
    this._sqft = sqft;

    if (
      this.constructor !== Building
      && this.evacuationWarningMessage
      === Building.prototype.evacuationWarningMessage
    ) {
      throw new Error(
        'Class extending Building must override evacuationWarningMessage',
      );
    }
  }

  // getter and setter
  get sqft() {
    return this._sqft;
  }

  set sqft(newSqft) {
    if (typeof newSqft !== 'number') {
      throw new TypeError('sqft must be a number');
    }
    this._sqft = newSqft;
  }

  // abstract method placeholder
  evacuationWarningMessage() {
    throw new Error(
      'Class extending Building must override evacuationWarningMessage',
    );
  }
}

// this.constructor !== Building means it's not created directly from Building class itself, it's subclass obj
// this.evacuationWarningMessage looks up the evacuationWarningMessage method on current instance
// prototype is where class methods live
// compare the two function reference, if they are same, that means subclass didn't override the method
// if they are different, subclass did provides its implement
