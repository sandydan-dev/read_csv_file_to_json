const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");


// read json file path
const jsonFilePath = path.join(__dirname, 'student.json')

try {
    // read json file 
    const jsonData  = fs.readFileSync(jsonFilePath, 'utf-8')
    const data = JSON.parse(jsonData)

    // create csv parser
    const csv2Parser = new Parser()
    const csv = csv2Parser.parse(data)

    // write csv file
    const csvFilePath = path.join(__dirname, 'studentInformation.csv')
    fs.writeFileSync(csvFilePath, csv)

    console.log('json to csv file convert successfully')
    
} catch (error) {
    console.error('Error while reading json file')
    // if file not found
    if(error.code === "ENOENT"){
        console.error('File not found, or cannot read file')
    }else if(error instanceof SyntaxError){
        console.error('Invalid json format')
    }else{
        console.error('Enexpected error occured', error.message)
    }
}