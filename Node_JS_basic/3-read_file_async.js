const fs = require('fs').promises;

async function countStudents(path) {
  try {
    // await, unwrap the Promise and give me the value it resolves to
    // if file is read successfully, Promise resolves with a string
    // if not, Promise reject with an Error object
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const students = lines.slice(1);

    if (students.length === 0) {
      throw new Error('Cannot load the database');
    }

    console.log(`Number of students: ${students.length}`);

    let output = `Number of students: ${students.length}\n`;
    // create a new object to store key: value pairs
    const fieldStudents = {};

    students.forEach((line) => {
      const parts = line.split(',');
      const firstname = parts[0];
      const field = parts[3];

      if (!fieldStudents[field]) {
        fieldStudents[field] = [];
      }
      fieldStudents[field].push(firstname);
    });

    for (const [field, names] of Object.entries(fieldStudents)) {
      const line = `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      console.log(line);
      output += `${line}\n`;
    }
    return output.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;

// Object.entries(obj): loop through all key: value pairs, returns an array of arrays
