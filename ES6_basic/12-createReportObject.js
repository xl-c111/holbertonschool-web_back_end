export default function createReportObject(employeesList) {
  const report = {
    allEmployees: { ...employeesList },
    getNumberOfDepartments(allEmployees) {
      return Object.keys(allEmployees).length;
    },
  };
  return report;
}
