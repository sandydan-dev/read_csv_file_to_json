const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");

// read json file path
const jsonFilePath = path.join(__dirname, "movies.json");

try {
  const jsonData = fs.readFileSync(jsonFilePath, "utf-8"); // read json file as string
  //   console.log(jsonData);
  const data = JSON.parse(jsonData); // parse json as js object
  //   console.log(data);

  // create new csv parser
  const json2CsvParser = new Parser();
  const csv = json2CsvParser.parse(data);

  // write csv data to file
  const csvFilePath = path.join(__dirname, "movies.csv"); // create new csv file
  fs.writeFileSync(csvFilePath, csv);

  console.log("conversion successfull");
} catch (error) {
  console.error("Error while reading json file");

  if (error.code === "ENOENT") {
    console.error("File not found or cannot be read");
  } else if (error instanceof SyntaxError) {
    console.error("Invalid JSON format");
  } else {
    console.error("Unexpected Error Occured", error.message);
  }
}
