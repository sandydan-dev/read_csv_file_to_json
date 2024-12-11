const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const csvFilePath = path.join(__dirname, "data.csv");

const results = []; // store csv data here

// fs.createReadStream(csvFilePath) //
//   .pipe(csv()) // parse csv data into rows
//   .on("data", (data) => {
//     results.push(data);
//   })
//   .on("end", () => {
//     console.log("csvData data end", results);
//   });

// cw

// read csv file
fs.createReadStream(csvFilePath) // create readable stream from the csv file
  .pipe(csv()) // parsing csv file

  // handle each row of data as its read
  .on("data", (data) => {
    results.push(data); // push data to result
  })
  // handle the end of the csv file

  .on("end", () => {
    const jsonFilePath = path.join(__dirname, "data.json"); //

    try {
      // write the parsed csv data to a JSON file
      fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
      // log errors that occur during file writing
    } catch (error) {
      console.log("Error writting json file");
    }
  })
  // handle errors that occur while reading the csv file
  .on("error", (error) => {
    console.error("Error reading the csv file", error);
  });
