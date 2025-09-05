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
        response.status(500).type('text').send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    // request is the whole HTTP object, params is a property of it, containing only route parameters extracted from URL path
    const { major } = request.params;
    const filepath = process.argv[2];

    if (!major || (major !== 'CS' && major !== 'SWE')) {
      response.status(500).type('text').send('Major parameter must be CS or SWE');
    } else {
      readDatabase(filepath)
        .then((fieldStudents) => {
          // extract the value for the key major from the object fieldStudents
          // if no students exists, then use an empty string instead
          const students = fieldStudents[major] || [];
          // students is an array, .join() takes all the elements in the array and converts them into a single string
          const names = students.join(', ');
          return response.status(200).type('text').send(`List: ${names}`);
        })
        .catch(() => {
          response.status(500).type('text').send('Cannot load the database');
        });
    }
  }
}

export default StudentsController;
