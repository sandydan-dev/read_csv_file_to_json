const fs = require("fs");
require("dotenv").config();

const logFilPath = process.env.LOG_FILE_PATH;

const config = {
  errorThreshold: 3,
  authenticationLogCount: 6,
};

function highlightErrors() {
  try {
    const data = fs.readFileSync(logFilPath, "utf-8");
    let logLines = data.split("\n");

    let errorCounts = 0;

    logLines.forEach((line) => {
      if (line.includes("WARN")) {
        errorCounts++;
      }
    });

    // errorCounts.forEach((message)=> console.log(message))
    console.log("Total Errors Detected: ", errorCounts);

    if (errorCounts >= config.errorThreshold) {
      console.log(
        `Alert! Errors have exceeded the threshold of ${config.errorThreshold}`
      );
    } else {
      console.log("Errors are within acceptable limits. : ", errorCounts);
    }
  } catch (error) {
    console.error("Error occured : ", error);
  }
}

highlightErrors();

function authenticationLogCountMessage() {
  try {
    const data = fs.readFileSync("logs.txt", "utf-8");
    const logLines = data.split("\n");

    let logErrorCounts = 0;

    logLines.forEach((line) => {
      if (line.includes("Data saved to database")) {
        logErrorCounts++;
      }
    });

    console.log(`Failed Login Attempts: ${logErrorCounts}`);
    if (logErrorCounts >= config.authenticationLogCount) {
      console.log(`Suspicious activity has been logged`);
    } else {
      const msg = `Login activity is within safe limits ${logErrorCounts}`;

      fs.writeFileSync(
        "suspiciousActivity.log",
        `${new Date(Date.now())} : ${msg} \n`
      );

    }
    rl.close()
  } catch (error) {
    console.error("Error occured : ", error);
  }
}

authenticationLogCountMessage();
