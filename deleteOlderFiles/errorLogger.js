const fs = require("fs");
const path = require("path");

// Function to log errors
const logError = (message) => {
  const errorFilePath = path.resolve("./logs/error.log"); // Set the error log file path
  fs.appendFile(
    errorFilePath,
    `${new Date().toISOString()}: ${message}\n`,
    (err) => {
      if (err) console.error("Failed to log error:", err);
    }
  );
};

module.exports = logError;
