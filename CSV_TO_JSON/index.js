const studentsJsonFile = require("./students.json");
const productsJsonFile = require("./products.json");
const attendanceJsonFile = require('./attendance.json')

// students data
const studentData = studentsJsonFile.map((data) => {
  return data;
});
console.log(studentData);

console.log("----- end -----");

// products data
const productsData = productsJsonFile.map((data) => {
  return data;
});
console.log(productsData);

console.log("----- end -----");

// attendance data
const attendanceData = attendanceJsonFile.map((data) => {
    return data;
  });
  console.log(attendanceData);
  