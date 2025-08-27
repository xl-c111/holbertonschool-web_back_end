export default function hasValuesFromArray(Set, array) {
  for (const value of array) {
    if (!Set.has(value)) {
      return false;
    }
  }
  return true;
}
