const http = require('http');
const countStudents = require('./3-read_file_async');

const hostname = '0.0.0.0';
const port = 1245;

const app = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');

  if (request.url === '/') {
    response.end('Hello Holberton School!');
  } else if (request.url === '/students') {
    response.write('This is the list of our students\n');
    // process.argv[2] is the third command-line argument(database.csv)
    countStudents(process.argv[2])
      // countStudents returns a Promise that resolved with a formatted string
      // containing the student list
      .then((output) => {
        // write the content to HTTP response and close the connection
        response.end(output);
      })
      // if Promised is rejected, code inside catch runs
      .catch(() => {
        response.statusCode = 500;
        response.end('Cannot load the database');
      });
  } else {
    response.statusCode = 400;
    response.end('Not found');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
