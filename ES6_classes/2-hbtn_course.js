export default class HolbertonCourse {
  constructor(name, length, students) {
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }
    this._name = name;
    if (typeof length !== 'number') {
      throw new TypeError('Length must be a number');
    }
    this._length = length;
    if (
      !Array.isArray(students)
      || students.every((s) => typeof s !== 'string')
    ) {
      throw new TypeError('Students must be an array of strings');
    }
    this._students = students;
  }

  // getters and setters must be OUTSIDE constructor
  get name() {
    return this._name;
  }

  set name(newName) {
    if (typeof newName !== 'string') {
      throw new TypeError('Name must be a string');
    }
    this._name = newName;
  }

  get length() {
    return this._length;
  }

  set length(newLength) {
    if (typeof newLength !== 'number') {
      throw new TypeError('Length must be a number');
    }
    this._length = newLength;
  }

  get students() {
    return this._students;
  }

  set students(newStudents) {
    if (
      !Array.isArray(newStudents)
      || newStudents.every((s) => typeof s !== 'string')
    ) {
      throw new TypeError('Students must be an array of strings');
    }
    this._students = newStudents;
  }
}
