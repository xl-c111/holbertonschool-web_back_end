const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const students = lines.slice(1);

    console.log(`Number of students: ${students.length}`);

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
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
