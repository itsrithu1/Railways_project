function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const { spawn } = require("child_process");
const { Console } = require("console");

numberOfCoach = 3
numberOfSeatsPerCoach = 10

stations=["Margao","Panvel","Banglore"]
const args = [numberOfCoach, numberOfSeatsPerCoach,stations]

let res = []
let unres = []

const py = spawn("C:/Python311/python", [__dirname + "/seatAlloc5.py", args]);
let data1 = "";

py.stdout.on("data", (data) => {
    // console.log(`stdout: ${data}`);
    console.log(`data: ${data}`)
    data1 += data;
    // const dataArray = data1.split("\n")
    // // console.log(dataArray.length)

    // var jsonStringWithDoubleQuotes = dataArray[0].replace(/'/g, '"');
    // var myObject = JSON.parse(jsonStringWithDoubleQuotes);
    // unres=myObject;
    // myObject=null;
    // jsonStringWithDoubleQuotes = dataArray[1].replace(/'/g, '"');
    // myObject = JSON.parse(jsonStringWithDoubleQuotes);
    // res=myObject;
    
});


py.on("close", (code) => {

    console.log(`Python script exited with code ${code}`);
});
