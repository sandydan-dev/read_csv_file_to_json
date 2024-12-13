require("dotenv").config();
const fs = require("fs");
const path = require("path");

// read environmental variable
const directoryPath = path.resolve(process.env.DIRECTORY_PATH);
const thresholdDays = parseInt(process.env.THRESHOLD_DAYS);
const thresholdDate = new Date(
  Date.now() - thresholdDays * 24 * 60 * 60 * 1000
);

const deletedLogFiles = path.resolve(process.env.DELETED_LOG_FILE);

// console.log(deletedLogFiles)

// read directory files
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Error while reading files", err);
  }

  // array of files
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        return console.log("Error while getting file stats", err);
      }

      // unlink files or deleting files
      if (stats.mtime < thresholdDate) {
        // unlink files
        fs.unlink(filePath, (err) => {
          if (err) {
            return console.log("Error while deleting file", err);
          } else {
            // put deleted file details in deletedLogFiles this directory
            fs.appendFile(
              deletedLogFiles,
              `${new Date()}, file deleted ${file}\n`,
              (err) => {
                if (err) {
                  console.log("Error while appending files", err);
                }
              }
            );

            return console.log(`Deleted file: ${filePath}\n`);
          }
        });
      }
    });
  });
});
