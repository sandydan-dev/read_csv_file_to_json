require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const path = require('path');

// read file path
const errorPath = path.resolve(process.env.LOG_DATA);
// console.log(errorMessages);
// extract tags
function extractTagsSummery() {
  try {
    // read file path
    const errorLogPath = fs.readFileSync(errorPath, 'utf-8');
    let lines = errorLogPath.split('\n'); // split its every single tag

    // initialize or store data here
    let errorsCount = 0;
    let infoCount = 0;
    let warnCount = 0;
    // array of tags
    lines.forEach((line) => {
      if (line.includes('ERROR')) errorsCount++;
      else if (line.includes('INFO')) infoCount++;
      else if (line.includes('WARN')) warnCount++;
      else {
        console.log('Invalid tags');
      }
    });

    console.log('Error Tags summery');
    console.log('Errors tag ', errorsCount);
    console.log('Info tag ', infoCount);
    console.log('Warn tag ', warnCount);
  } catch (error) {
    console.log('Error ocuured ', error.message);
  }
}
// extractTagsSummery();

// extract error tags messages
function extractErrorMessages() {
  try {
    const logMessagesPath = fs.readFileSync(errorPath, 'utf-8');
    const lines = logMessagesPath.split('\n');

    let errorMessages = [];
    lines.forEach((line) => {
      if (line.includes('WARN')) {
        errorMessages.push(line);
      }
    });

    // console.log('Error Messages ', errorMessages);
    errorMessages.forEach((message) => console.log(message));
  } catch (error) {
    console.error('Error messages occured ', error.message);
  }
}

// extractErrorMessages();

console.log('-----------------------');

// Use the readline module to interact with the user.

function readlineUser() {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `Choose an option:\n 1. Summarize Errors and Warnings\n 2. Extract Error Messages\n Enter your choice: `,
      (choice) => {
        if (choice === '1') {
          extractTagsSummery();
        } else if (choice === '2') {
          extractErrorMessages();
        }

        rl.close();
      }
    );
  } catch (error) {
    console.error('Error occured while user input', error.message);
  }
}

readlineUser();
