const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const csvFilePath = path.join(__dirname, "students.csv");

const results = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    const jsonFilePath = path.join(__dirname, "students.json");
    try {
      fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
    } catch (err) {
      console.error("Error While reading csv file", err);
    }
  })
  .on("error", (err) => {
    console.error("Error While reading csv file", err);
  });
