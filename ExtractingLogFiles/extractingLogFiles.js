require("dotenv").config();
const fs = require("fs");

// logs file path
const logFilePath = process.env.LOG_FILE_PATH;

function summerizeLog() {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    let lines = data.split("\n");

    // LOG COUNTS
    let infoCount = 0;
    let warnCount = 0;
    let errorCount = 0;
    

    lines.forEach((line) => {
      if (line.includes("INFO")) infoCount++;
      if (line.includes("WARN")) warnCount++;
      if (line.includes("ERROR")) errorCount++;
    });

    // summery of logs count
    console.log("summeries");
    console.log("Total Info count", infoCount);
    console.log("Total warn count", warnCount);
    console.log("Total error count", errorCount);
  } catch (error) {
    console.log("Errors : ", error.message);
  }
}

summerizeLog();
console.log('-------- end --------')
// extract error messages
function extractErrorMessages() {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    const logLines = data.split("\n");

    const errorMessages = logLines.filter((line) => line.includes("WARN"));

    
    console.log('Error Messages')

    // console.log(errorMessages);

    errorMessages.forEach((message)=> console.log(message))
  } catch (error) {
    console.log("Errors : ", error.message);
  }
}
extractErrorMessages()