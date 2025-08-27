export default function updateStudentGradeByCity(
  studentslist,
  city,
  newGrades,
) {
  if (!Array.isArray(studentslist) || !Array.isArray(newGrades)) {
    return [];
  }
  const students = studentslist.filter((student) => student.location === city);
  return students.map((student) => {
    const newGrade = newGrades.find(
      (newGrade) => newGrade.studentId === student.id,
    );
    return {
      id: student.id,
      firstName: student.firstName,
      location: student.location,
      grade: newGrade ? newGrade.grade : 'N/A',
    };
  });
}
