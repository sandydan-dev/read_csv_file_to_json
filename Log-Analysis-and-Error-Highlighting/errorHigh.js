require("dotenv").config();
const fs = require("fs");
const readline = require("readline");
const logFilePath = process.env.LOG_FILE_DATA;

// Question 1: Analyze Login Success
function countSuccessfulLogins() {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    const lines = data.split("\n");

    let config = {
      threshold: 10,
    };

    let countMessage = 0;

    lines.forEach((line) => {
      if (line.includes("User logged in successfully")) countMessage++;
    });

    console.log("Total count message: ", countMessage);
  } catch (error) {
    console.error("Error while reading file ", error);
  }
}

// countSuccessfulLogins();
console.log("---------------------------");
// Question 2: Calculate Error-to-Warning Ratio
function calculateErrorToWarningRatio() {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    let lines = data.split("\n");

    let errorCount = 0;
    let warnCount = 0;

    lines.forEach((line) => {
      if (line.includes("ERROR")) errorCount++;
      if (line.includes("WARN")) warnCount++;
    });

    console.log("Logs summery counts");
    console.log("Total ERROR count", errorCount);
    console.log("Total WARN count", warnCount);
  } catch (error) {
    console.error("Error while reading file ", error);
  }
}

calculateErrorToWarningRatio();

// Question 3: Dynamic Threshold Checker

function highlightErrorsWithDynamicThreshold() {
  const data = fs.readFileSync(logFilePath, "utf-8");
  let lines = data.split("\n");

  let errorCounts = 0;
  lines.forEach((line) => {
    if (line.includes("ERRO")) errorCounts++;
  });

  let config = {
    threshold: 5,
  };

  // readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Choose one : ", (choice) => {
    if (choice === config.threshold) {
        countSuccessfulLogins()
      console.log(`alert if errors exceed the threshold ${errorCounts}`);
    } else {
        calculateErrorToWarningRatio()
      console.log(`error levels are safe ${errorCounts}`);
    }
  });
}

highlightErrorsWithDynamicThreshold();
