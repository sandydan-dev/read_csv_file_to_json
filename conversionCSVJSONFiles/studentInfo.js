const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// read csv file path
const csvFilePath = path.join(__dirname, "student.csv");

const results = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    // do something with the row
    results.push(row);
  })
  .on("end", () => {
    // create json file path
    const jsonFilePath = path.join(__dirname, "student.json");
    // write json file
    fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
    console.log("CSV TO JSON convertion successfull");
  });
