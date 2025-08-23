export default function createReportObject(employeesList) {
  // build the report obj with two properties
  // one is data property whose value is another obj(the shallow copy of employeesList)
  const report = {
    allEmployees: { ...employeesList },
    // one is method property whose value is a function, this function takes one parameter named allEmployees, it returns the number of own enumerable string keys on that obj
    getNumberOfDepartments(allEmployees) {
      return Object.keys(allEmployees).length;
    }
  };
  return report;
}

// getNumberOfDepartments(allEmployees) { ... }: method shorthand = getNumberOfDepartments: function (allEmployees) { ... }.
// Object.keys(): built-in that returns an array of keys.
