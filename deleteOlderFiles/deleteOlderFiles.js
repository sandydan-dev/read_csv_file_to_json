require("dotenv").config();
const fs = require("fs");
const path = require("path");
const logError = require("./errorLogger");
// const directoryPath = process.env.DIRECTORY_PATH;
const directoryPath = path.resolve(process.env.DIRECTORY_PATH);
const thresholdDays = parseInt(process.env.THRESHOLD_DAYS);
const thresholdDate = new Date(
  Date.now() - thresholdDays * 24 * 60 * 60 * 1000
);

// read directory file
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error("Error detected", err);
  }

  // array files read
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    fs.stat(filePath, (err, stats) => {
      //   if (err) {
      //     logError(`rror getting file stats ${err}`);
      //   }
      logError(`rror getting file stats ${err}`);
      if (stats.mtime < thresholdDate) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Error in deleting file", err);
          } else {
            console.log("Delete old files successfully", filePath);
          }
        });
      }
    });
  });
});
