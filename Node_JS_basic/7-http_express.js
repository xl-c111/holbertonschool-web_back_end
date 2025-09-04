const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (request, response) => {
  response.type('text');
  response.send('Hello Holberton School!');
});

app.get('/students', (request, response) => {
  const prefix = 'This is the list of our students\n';
  countStudents(process.argv[2])
    .then((output) => {
      response.type('text').send(prefix + output);
    })
    .catch(() => {
      response
        .status(500)
        .type('text')
        .send(`${prefix}Cannot load the database`);
    });
});

const port = 1245;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
