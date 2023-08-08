const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const bcrypt = require("bcryptjs");
const { Train } = require("../model/trainData.model");
const { TrainData } = require("../model/trainDataNew.model");
const { spawn } = require("child_process");
const axios = require("axios");
const { SeatAllocation } = require("../model/seatAllocation.model");

exports.searchTrain = async (req, res) => {
  // const { trainNumber, trainName } = req.params.id;
  const trainNumber = req.query.trainNumber;
console.log(trainNumber);
  // console.log("hello",trainName,trainNumber)

  try {
    // const query = {
    //   $or: [{ train_Number: trainNumber }, { name: trainName }],
    // };

    const foundTrains = await TrainData.find({train_Number: trainNumber});

    if (!foundTrains || foundTrains.length === 0) {
      return res
        .status(httpStatusCodes[404].code)
        .json(formResponse(httpStatusCodes[404].code, "Train not found"));
    }

    return res
      .status(httpStatusCodes[200].code)
      .json(formResponse(httpStatusCodes[200].code, foundTrains));
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatusCodes[500].code)
      .json(formResponse(httpStatusCodes[500].code, error));
  }
};

exports.createTrain = async (req, res) => {
// console.log(req.body);


  const {
    train_Number,
    name,
    source,
    destination,
    numberOfCoach,
    numberOfSeatsPerCoach,
    startTime,
    endTime,
    fare
  } = req.body.Trains;

  const Tnumber = parseInt(train_Number,2) 

  console.log(
    {Tnumber,
    name,
    source,
    destination,
    numberOfCoach,
    numberOfSeatsPerCoach,
    startTime,
    endTime,
    fare});


  // const numberOfCoach = parseInt(numberOfCoach,2) 
  // const numberOfSeatsPerCoach = parseInt(numberOfSeatsPerCoach,2) 
  

  try {
    if (
      !train_Number ||
      !name ||
      !source ||
      !destination ||
      !numberOfCoach ||
      !numberOfSeatsPerCoach ||
      !startTime ||
      !endTime ||
      !fare
    ) {
      return res
        .status(httpStatusCodes[400].code)
        .json(formResponse(httpStatusCodes[400].code, "Enter All details"));
    }
    const checktrain = await Train.findOne({ train_Number });
    // console.log(checktrain);

    if (checktrain) {
      return res
        .status(httpStatusCodes[202].code)
        .json(
          formResponse(
            httpStatusCodes[202].code,
            "train with same Train Number is Present"
          )
        );
    }

    const newTrain = new Train({
      train_Number,
      name,
      source,
      destination,
      numberOfCoach,
      numberOfSeatsPerCoach,
      startTime,
      endTime,
      fare
    });

    await newTrain.save();

    try {
    
    const args = [numberOfCoach,numberOfSeatsPerCoach]
    var reservedArray = []
    var unreservedArray = []

    const py = spawn("C:/Python311/python", [__dirname + "/seatAlloc.py",args]);
    let data1 = "";
    py.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
      data1 += data;
      const dataArray = data1.split("\n")

      var jsonStringWithDoubleQuotes = dataArray[0].replace(/'/g, '"');

    var myObject = JSON.parse(jsonStringWithDoubleQuotes);

    unreservedArray=myObject;

    myObject=null;

    jsonStringWithDoubleQuotes = dataArray[1].replace(/'/g, '"');

    myObject = JSON.parse(jsonStringWithDoubleQuotes);

    reservedArray=myObject;

    console.log(reservedArray)
      
      // console.log(dataArray.length)
      // console.log("unreserved array from backend: ",typeof dataArray[0])
      // console.log("reserved array from backend: ",typeof dataArray[1])

      // const cleanString1 = dataArray[0].replace(/^\{|\}$/g, "").replace(/'/g, "");
      // const keyValuePairs1 = cleanString1.split(", ");
      // unreservedArray = keyValuePairs1.map((pair) => {
      //   const [key, value] = pair.split(": ");
      //   return { [key]: parseInt(value) }; // Convert value to integer
      // });

      // const cleanString2 = dataArray[1].replace(/^\{|\}$/g, "").replace(/'/g, "");
      // const keyValuePairs2 = cleanString2.split(", ");
      // reservedArray = keyValuePairs2.map((pair) => {
      //   const [key, value] = pair.split(": ");
      //   return { [key]: parseInt(value) }; // Convert value to integer
      // });


      // console.log("UnreservedArray : ",typeof unreservedArray)
      // console.log("reservedArray : ",reservedArray)
    });



    py.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
      // Now you can proceed with your remaining logic.
      // For example, you can process `data1` and use it.
    });


      const today = new Date();
      const numberOfDays = 30;
      for (let i = 0; i < numberOfDays; i++) {
        const incrementedDate = new Date(today);
        incrementedDate.setDate(today.getDate() + i);

        const year = incrementedDate.getFullYear();
        const month = String(incrementedDate.getMonth() + 1).padStart(2, "0");
        const day = String(incrementedDate.getDate()).padStart(2, "0");

        const formattedDate = `${day}-${month}-${year}`;

        const newSeatAllocation = new SeatAllocation({
          train_Number,
          name,
          unreservedSeats: unreservedArray,
          reservedSeats: reservedArray,
          ptrURS:0,
          ptrRS:0,
          date:formattedDate,
        });

        await newSeatAllocation.save();
      }
    } catch (error) {
      console.log(error);
    }

    res
      .status(httpStatusCodes[200].code)
      .json(formResponse(httpStatusCodes[200].code, "Train Created"));
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatusCodes[500].code)
      .json(formResponse(httpStatusCodes[500].code, error));
  }
};

exports.updateTrain = async (req, res) => {
  train_Number = req.query.train_Number;
  // console.log(train_Number);
  // console.log(req.body)

  const {
    name,
    source,
    destination,
    numberOfCoach,
    numberOfSeatsPerCoach,
    startTime,
    endTime,
    fare,
  } = req.body.editedTrain;

  try {
    // Construct the update object with the fields to update
    const updateObject = {};
    if (name) updateObject.name = name;
    if (source) updateObject.source = source;
    if (destination) updateObject.destination = destination;
    if (numberOfCoach) updateObject.numberOfCoach = numberOfCoach;
    if (numberOfSeatsPerCoach)
      updateObject.numberOfSeatsPerCoach = numberOfSeatsPerCoach;
    if (startTime) updateObject.startTime = startTime;
    if (endTime) updateObject.endTime = endTime;
    if (fare) updateObject.fare = fare;


    const findTrain = await TrainData.findOne({train_Number})
    if(!findTrain){
      return res.status(404).json({ message: "Train not found" });
    }else{
      if( findTrain.numberOfCoach !=numberOfCoach || findTrain.numberOfSeatsPerCoach!=numberOfSeatsPerCoach){
        //find in seatalloc collection and update 

        try {
    
          const args = [numberOfCoach,numberOfSeatsPerCoach]
          var reservedArray = []
          var unreservedArray = []
      
          const py = spawn("C:/Python311/python", [__dirname + "/seatAlloc.py",args]);
          let data1 = "";
          py.stdout.on("data", (data) => {
            // console.log(`stdout: ${data}`);
            data1 += data;
            const dataArray = data1.split("\n")
      
            var jsonStringWithDoubleQuotes = dataArray[0].replace(/'/g, '"');
      
          var myObject = JSON.parse(jsonStringWithDoubleQuotes);
      
          unreservedArray=myObject;
      
          myObject=null;
      
          jsonStringWithDoubleQuotes = dataArray[1].replace(/'/g, '"');
      
          myObject = JSON.parse(jsonStringWithDoubleQuotes);
      
          reservedArray=myObject;
          // console.log(unreservedArray)
 
        
          });
      
      
      
          py.on("close",async (code) => {
            console.log(`Python script exited with code ${code}`);
            const updateResult = await SeatAllocation.updateMany(
              { train_Number: train_Number },
              {
                $set: {
                  
                  unreservedSeats: unreservedArray,
                  reservedSeats: reservedArray,
                  ptrURS:0,
                  ptrRS:0,
                  seatsAvailable:numberOfCoach*numberOfSeatsPerCoach,
                },
              }
            );
          });

          // console.log("outside ",unreservedArray)
          
          // console.log("success")
      

        }catch(error){
          console.log(error)
        }

        
      }
       if(findTrain.name!=name ){
        const updateResult = await SeatAllocation.updateMany(
          { train_Number: train_Number },
          {
            $set: {
              name:name
            },
          }
        );

      }
    }




    // Find the document by ID and update with the provided fields
    const updatedTrain = await TrainData.findOneAndUpdate(
      { train_Number },
      updateObject,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation on updated data
      }
    );

    if (!updatedTrain) {
      return res.status(404).json({ message: "Train not found" });
    }

    if (updatedTrain) {
      res
        .status(httpStatusCodes[200].code)
        .json(
          formResponse(
            httpStatusCodes[200].code,
            "Train Updated Successfully",
            updatedTrain
          )
        );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTrain = async (req, res) => {

  const trainNumber = req.query.trainNumber;

  try {
    const query = {
      $or: [{ train_Number: trainNumber }],
    };

    const deletedTrain = await TrainData.findOneAndDelete(query);

    if (!deletedTrain) {
      return res
        .status(httpStatusCodes[404].code)
        .json(formResponse(httpStatusCodes[404].code, "Train not found"));
    }


    const result = await SeatAllocation.deleteMany({ train_Number:trainNumber });
    console.log(result.deletedCount)

    return res
      .status(httpStatusCodes[200].code)
      .json(
        formResponse(httpStatusCodes[200].code, "Train Deleted Successfully")
      );
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatusCodes[500].code)
      .json(formResponse(httpStatusCodes[500].code, error));
  }
};



exports.displayTrains = async (req, res) => {
  console.log("the username from token is :",req.name)
  const findAll = await TrainData.find();
  // console.log("here", findAll);
  if(!findAll){

    return res
      .status(httpStatusCodes[202].code)
      .json(
        formResponse(httpStatusCodes[202].code, "No Trains found")
      );
  }


  return res
      .status(httpStatusCodes[200].code)
      .json(
        formResponse(httpStatusCodes[200].code, findAll)
      );

}













function processStationsData(sourceToDest, sourceToDestDepTime) {
  const stationsArray = sourceToDest.split(',');
  const depTimeArray = sourceToDestDepTime.split(',');

  const stationsData = {};
  for (let i = 0; i < stationsArray.length; i++) {
    stationsData[stationsArray[i]] = depTimeArray[i];
  }

  return stationsData;
}




exports.createTrainNew = async (req, res) => {
  const frontendData = req.body.Trains;


  const train_Number = parseInt(frontendData.train_Number);
  const name = frontendData.name;
  const Stations = processStationsData(frontendData.sourceToDest, frontendData.sourceToDestDepTime);
  const Distance = frontendData.distanceFromSource.split(',').map(Number);
  const numberOfCoach = parseInt(frontendData.numberOfCoach);
  const numberOfSeatsPerCoach = parseInt(frontendData.numberOfSeatsPerCoach);
  const fare = parseFloat(frontendData.fare);
  
    // const Tnumber = parseInt(train_Number,2) 
// console.log("processed data ", processedData)
    
  
    try {
      if (
        !train_Number ||
        !name ||
        !Stations ||
        !numberOfCoach ||
        !numberOfSeatsPerCoach ||
        !Distance ||
        !fare
      ) {
        return res
          .status(httpStatusCodes[400].code)
          .json(formResponse(httpStatusCodes[400].code, "Enter All details"));
      }
      const checktrain = await TrainData.findOne({ train_Number });
      // console.log(checktrain);
  
      if (checktrain) {
        return res
          .status(httpStatusCodes[202].code)
          .json(
            formResponse(
              httpStatusCodes[202].code,
              "train with same Train Number is Present"
            )
          );
      }
  
      const newTrain = new TrainData({
        train_Number,
        name,
        Stations,
        numberOfCoach,
        numberOfSeatsPerCoach,
        Distance,
        fare
      });
  
      await newTrain.save();
  

      try {
      
const totalSeats = numberOfCoach*numberOfSeatsPerCoach
      const args = [numberOfCoach,numberOfSeatsPerCoach]
      var reservedArray = []
      var unreservedArray = []
  
      const py = spawn("C:/Python311/python", [__dirname + "/seatAlloc.py",args]);
      let data1 = "";
      py.stdout.on("data", (data) => {
        // console.log(`stdout: ${data}`);
        data1 += data;
        const dataArray = data1.split("\n")
  
        var jsonStringWithDoubleQuotes = dataArray[0].replace(/'/g, '"');
  
      var myObject = JSON.parse(jsonStringWithDoubleQuotes);
  
      unreservedArray=myObject;
  
      myObject=null;
  
      jsonStringWithDoubleQuotes = dataArray[1].replace(/'/g, '"');
  
      myObject = JSON.parse(jsonStringWithDoubleQuotes);
  
      reservedArray=myObject;
  
      console.log(reservedArray)
        
        
      });
  
  
  
      py.on("close", (code) => {
        console.log(`Python script exited with code ${code}`);
        // Now you can proceed with your remaining logic.
        // For example, you can process `data1` and use it.
      });
  
  
        const today = new Date();
        const numberOfDays = 30;
        for (let i = 0; i < numberOfDays; i++) {
          const incrementedDate = new Date(today);
          incrementedDate.setDate(today.getDate() + i);
  
          const year = incrementedDate.getFullYear();
          const month = String(incrementedDate.getMonth() + 1).padStart(2, "0");
          const day = String(incrementedDate.getDate()).padStart(2, "0");
  
          const formattedDate = `${day}-${month}-${year}`;
  
          const newSeatAllocation = new SeatAllocation({
            train_Number,
            name,
            unreservedSeats: unreservedArray,
            reservedSeats: reservedArray,
            ptrURS:0,
            ptrRS:0,
            date:formattedDate,
            seatsAvailable:totalSeats
          });
  
          await newSeatAllocation.save();
        }
      } catch (error) {
        console.log(error);
      }
  
      res
        .status(httpStatusCodes[200].code)
        .json(formResponse(httpStatusCodes[200].code, "Train Created"));
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatusCodes[500].code)
        .json(formResponse(httpStatusCodes[500].code, error));
    }
  };


  exports.displayAllTrainDetails = async (req, res) => {
    const {train_Number} = req.body
    // console.log(train_Number);
    const findTrain = await TrainData.findOne({train_Number})
    if(!findTrain){
      return res
        .status(httpStatusCodes[202].code)
        .json(
          formResponse(httpStatusCodes[202].code, "No Trains found")
        );
    }
  
    return res
        .status(httpStatusCodes[200].code)
        .json(
          formResponse(httpStatusCodes[200].code, findTrain)
        );
  }
