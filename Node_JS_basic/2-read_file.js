const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.trim().split('\n');
    const students = lines.slice(1);
    console.log(`Number of students: ${students.length}`);

    const fieldStudents = new Map();

    students.forEach((line) => {
      const parts = line.split(',');
      const field = parts[3];
      const firstname = parts[0];

      if (!fieldStudents.has(field)) {
        fieldStudents.set(field, []);
      }
      fieldStudents.get(field).push(firstname);
    });
    for (const [field, names] of fieldStudents.entries()) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
