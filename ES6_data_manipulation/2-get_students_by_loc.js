export default function getStudentsByLocation(studentslist, city) {
  if (!Array.isArray(studentslist)) {
    return [];
  }
  return studentslist.filter((student) => student.location === city);
}
