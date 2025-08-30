export default function updateStudentGradeByCity(
  studentslist,
  city,
  newGrades
) {
  if (!Array.isArray(studentslist) || !Array.isArray(newGrades)) {
    return [];
  }
  const students = studentslist.filter((student) => student.location === city);
  return students.map((student) => {
    // .find() loops through each element of array and returns the first element that makes the callback function return true
    const newGrade = newGrades.find(
      // this is a callback function, for each newGrade, checks whether newGrade.StudentId equals Student.id.
      // returns true if they are equal
      (newGrade) => newGrade.studentId === student.id
    );
    return {
      id: student.id,
      firstName: student.firstName,
      location: student.location,
      grade: newGrade ? newGrade.grade : 'N/A'
    };
  });
}
