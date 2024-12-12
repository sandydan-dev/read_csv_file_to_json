require("dotenv").config();
const fs = require("fs");

const path = process.env.DIRECTORY_PATH;
const fileNames = process.env.FILE_NAMES.split(",");

console.log(`Checking files in directory: ${path}`);

try {
  if (!fs.existsSync(path)) {
    console.log(`Creating directory: ${path}`);
    fs.mkdirSync(path);
  }

  fileNames.forEach((fileName) => {
    console.log(`Processing file: ${fileName}`);
    
    const filePath = `${path}/${fileName}`;
    
    if (fs.existsSync(filePath)) {
      console.log(`${fileName} already exists`);
    } else {
      try {
        fs.writeFileSync(filePath, 'sample data'); 
        console.log(`${fileName} created successfully`);
      } catch (writeError) {
        console.error(`Failed to write ${fileName}:`, writeError.message);
      }
    }
  });
} catch (error) {
  console.error("Error occurred:", error.message);
  if (error.code === "ENOENT") {
    console.error("Directory not found or permission issues");
  }
}
