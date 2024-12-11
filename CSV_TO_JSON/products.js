const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const csvFilePath = path.join(__dirname, "products.csv");

let results = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    const jsonFilePath = path.join(__dirname, "products.json");
    try {
      fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
    } catch (error) {
      console.error("Error while creating json file", error);
    }
  })
  .on("error", (err) => {
    console.err("Error while reading csv file", err);
  });
