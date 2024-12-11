const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");

// read json file path
const jsonFilePath = path.join(__dirname, "library.json");

try {
  // read json file path and parse as js object
  const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
  const data = JSON.parse(jsonData);

  // create csv parser
  const csv2JsonFile = new Parser();
  const csv = csv2JsonFile.parse(data);

  // write csv file
  const csvFilePath = path.join(__dirname, "library.csv");
  fs.writeFileSync(csvFilePath, csv);
  console.log("Library file json to csv file converted successfully");
} catch (error) {
  console.error("Error while reading json file");

  // if file not found
  if (error.code === "ENOENT") {
    console.error("File not found or cannot be read");
  } else if (error instanceof SyntaxError) {
    console.error("Invalid json format");
  } else {
    console.error("Unexpected Error Occured", error.message);
  }
}
