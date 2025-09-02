const fs = require("fs");

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, "utf8");
    const lines = data.trim().split("\n");
    const students = lines.slice(1); // skip the header
    console.log(`Number of students: ${students.length}`);

    // create a map object to store key: value pairs, key is field, value is an array of firstnames
    const fieldStudents = new Map();

    students.forEach((line) => {
      const parts = line.split(",");
      const field = parts[3];
      const firstname = parts[0];

      // check if map already has this field
      if (!fieldStudents.has(field)) {
        // if not, create an new entry in the map with field as key, an empty array as value
        fieldStudents.set(field, []);
      }
      // get the array for this field and add the new firstname to it
      fieldStudents.get(field).push(firstname);
    });
    // loop through all [field, nanmes] pairs in the map
    for (const [field, names] of fieldStudents.entries()) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(", ")}`);
    }
  } catch (error) {
    throw new Error("Cannot load the database");
  }
}
module.exports = countStudents;

// Create a new Map: const map = new Map();
// Check if Map has a specific key: map.has(key) -> return true or false
// Set a key → value pair in a Map: map.set(key, value)
// Get the value for a key: map.get(key) -> return the value
// Get all [key, value] pairs: map.entries() -> return an iterator of [key, value] arrays
