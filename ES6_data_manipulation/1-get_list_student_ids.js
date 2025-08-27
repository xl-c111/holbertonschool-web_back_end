export default function getListStudentIds(array) {
  if (!Array.isArray(array)) {
    return [];
  }
  // Using Destructuring: return array.map(({ id }) => id);
  return array.map((element) => element.id);
}
