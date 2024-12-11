const fs = require("fs"); // # file system : for handling file operation
const path = require("path"); // # working with file paths
const { Parser } = require("json2csv"); // a library for converting json to csv

// read json file path
// # create a file path for the json file to be read
const jsonFilePath = path.join(__dirname, "data.json");

try {
  //
  const jsonData = fs.readFileSync(jsonFilePath, "utf-8"); // read file as string data

  // console.log(jsonData);
  const data = JSON.parse(jsonData); // converts the string data into a js object
  //   console.log("Data : ", data);

  // create new csv parser
  const json2CsvParser = new Parser(); // # creating new csv parser
  const csv = json2CsvParser.parse(data); // # convert json data to csv format

  // write the csv data to file
  const csvFilePath = path.join(__dirname, "convertedData.csv"); //# write csv data to a new file
  fs.writeFileSync(csvFilePath, csv); //# creating csv data

  console.log("conversion successfull");
} catch (error) {
  // # handle error during above process in this catch block
  console.error("Error while reading or creating json file");
  if (error.code === "ENOENT") {
    console.error("File not found or cannot be read.");
  } else if (error instanceof SyntaxError) {
    console.error("Invalid JSON format.");
  } else {
    console.error(`Unexpected error: ${error.message}`);
  }
}
