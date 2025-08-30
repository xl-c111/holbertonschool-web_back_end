export default function getStudentIdsSum(studentslist) {
  if (!Array.isArray(studentslist)) {
    return 0;
  }
  return studentslist.reduce(
    (accumulator, student) => accumulator + student.id,
    0
  );
}
