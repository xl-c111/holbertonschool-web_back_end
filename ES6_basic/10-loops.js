export default function appendToEachArrayValue(array, appendString) {
  const newArray = [];
  for (const value of array) {
    newArray.push(appendString + value);
  }
  return newArray;
}

// Using for...in
/*
for (const idx in array) {
  array[idx] = appendString + array[idx];
}
*/
