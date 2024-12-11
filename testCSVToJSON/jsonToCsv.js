const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");

// read json file path
const jsonFilePath = path.join(__dirname, "data.json");

try {
  const jsonData = fs.readFileSync(jsonFilePath, "utf-8"); // string data
  // console.log(jsonData);
  const data = JSON.parse(jsonData); //
  //   console.log("Data : ", data);

  // create new csv parser
  const json2CsvParser = new Parser();
  const csv = json2CsvParser.parse(data);

  // write the csv data to file
  const csvFilePath = path.join(__dirname, "convertedData.csv");
  fs.writeFileSync(csvFilePath, csv);

  console.log("conversion successfull");
} catch (error) {
  console.error("Error while reading or creating json file");
}
