process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('readable', () => {
  const input = process.stdin.read();

  if (input !== null) {
    process.stdout.write(`Your name is: ${input}`);
  }
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
});

// process.stdin.setEncoding('utf8');

// console.log('Welcome to Holberton School, what is your name?');

// if (process.stdin.isTTY) {
//   process.stdin.on('data', (input) => {
//     console.log(`Your name is: ${input.trim()}`);
//     process.exit(0);
//   });
// } else {
//   process.stdin.on('data', (input) => {
//     console.log(`Your name is: ${input.trim()}`);
//   });
//   process.stdin.on('end', () => {
//     console.log('This important software is now closing');
//   });
// }
