const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");

// read json file path
const jsonFilePath = path.join(__dirname, "orders.json");

try {
  // read json data parse into js object
  const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
  const data = JSON.parse(jsonData);

  // create new csv parser
  const json2CsvParser = new Parser();
  const csv = json2CsvParser.parse(data);

  // write csv file path
  const csvFilePath = path.join(__dirname, "orders.csv");
  fs.writeFileSync(csvFilePath, csv);

  console.log("JSON to CSV file conversion successfully");
} catch (error) {
  console.error("Error while reading json file path");

  if (error.code === "ENOENT") {
    console.error("File not found or cannot be read");
  } else if (error instanceof SyntaxError) {
    console.error("Invalid JOSN format");
  } else {
    console.error("Unexpected Error Occured", error.message);
  }
}
