require("dotenv").config();
const fs = require("fs");
const path = require("path");
const logError = require("./errorLogger");

const directoryPath = path.resolve(process.env.DIRECTORY_PATH);
const thresholdDays = parseInt(process.env.THRESHOLD_DAYS);
const thresholdDate = new Date(
  Date.now() - thresholdDays * 24 * 60 * 60 * 1000
);

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Error to detect reading file", err);
  }

  // read files array
  files.forEach((file) => {
    // join path (directory/files)
    const filePath = path.join(directoryPath, file);

    // get stats
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.log("Get error while getting stats", err);
        // return logError(`Get error while getting stats ${err}`);
      }
      logError(`Get error while getting stats ${err}`);

      if (stats.mtime < thresholdDate) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Error to delete file path");
          } else {
            console.log(`Deleted file path successfully, ${filePath} number of files deleted ${filePath.length}`);
          }
        });
      }
    });
  });
});
