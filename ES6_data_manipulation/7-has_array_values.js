export default function hasValuesFromArray(Set, array) {
  for (const value of array) {
    if (!Set.has(value)) {
      return false; // as soon as one is missing, return false
    }
  }
  return true; // all values were found
}
// return array.every(value) => Set.has(value);
