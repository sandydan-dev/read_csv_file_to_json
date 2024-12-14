require("dotenv").config();
const fs = require("fs");
const path = require("path");

const logData = path.join(__dirname, process.env.LOG_DATA);


// Question 2: Filter and Save Error Messages
function extractErrorMessages() {
  try {
    // / Read the contents of the log file
    const logContent = fs.readFileSync(logData, "utf8");

    console.log(`Log file content length: ${logContent.length} characters`);

    if (!fs.existsSync(logData)) {
      console.log("file does not exists, createing new file");
      fs.writeFileSync("errorMessage.log", `Hello there`, "utf-8");
    } else {
      console.log("Already exist file");
    }

    // write error message and store in file
    const errorMessage = logContent.split("\n");
    const filterMessage = errorMessage.filter((message) =>
      message.includes("ERROR")
    );
    filterMessage.forEach((msg) => console.log(msg));
  } catch (error) {
    console.log("Error: ", error);
  }
}

extractErrorMessages();
