const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const csvFilePath = path.join(__dirname, "attendance.csv");

let results = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    const jsonFilePath = path.join(__dirname, "attendance.json");
    try {
      fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
    } catch (error) {
      console.error("Error while creating json file", error);
    }
  })
  .on("error", (err) => {
    console.error("Error while reading csv file", err);
  });
