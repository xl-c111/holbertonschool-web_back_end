import { promises as fs } from 'fs';

export default async function readDatabase(filepath) {
  try {
    const data = await fs.readFile(filepath, 'utf8');
    const lines = data.trim().split('\n');
    const students = lines.slice(1);

    if (students.length === 0) {
      throw new Error('Cannot load the database');
    }

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

    return fieldStudents;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
