import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const prefix = 'This is the list of our students\n';
    const filepath = process.argv[2];

    readDatabase(filepath)
      .then((fieldStudents) => {
        let output = prefix;
        for (const [field, names] of Object.entries(fieldStudents)) {
          output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        }
        response.status(200).type('text').send(output.trim());
      })
      .catch(() => {
        response.status(500).type('text').send(`${prefix}Cannot load the database`);
      });
  }

  static getAllStudentsByMajor(request, response) {
    const prefix = 'This is the list of our students\n';
    const { major } = request.params;
    const filepath = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).type('text').send('Major parameter must be CS or SWE');
    }

    readDatabase(filepath)
      .then((fieldStudents) => {
        const students = fieldStudents[major] || [];
        const names = students.join(', ');
        return response.status(200).type('text').send(`List: ${names}`);
      })
      .catch(() => {
        response.status(500).type('text').send(`${prefix}Cannot load the database`);
      });
  }
}

export default StudentsController;
