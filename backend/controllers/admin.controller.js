const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const bcrypt = require("bcryptjs");
const { Train } = require("../model/trainData.model");
const { spawn } = require("child_process");
const axios = require("axios");
const { SeatAllocation } = require("../model/seatAllocation.model");

exports.searchTrain = async (req, res) => {
  // const { trainNumber, trainName } = req.params.id;
  const trainNumber = req.query.trainNumber;
  const trainName = req.query.trainName;

  // console.log("hello",trainName,trainNumber)

  try {
    const query = {
      $or: [{ train_Number: trainNumber }, { name: trainName }],
    };

    const foundTrains = await Train.find(query);

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
  const {
    train_Number,
    name,
    source,
    destination,
    numberOfCoach,
    numberOfSeatsPerCoach,
    startTime,
    endTime,
    fare,
  } = req.body;

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
      console.log(dataArray.length)
      console.log("unreserved array from backend: ",typeof dataArray[0])
      console.log("reserved array from backend: ",typeof dataArray[1])

      const cleanString1 = dataArray[0].replace(/^\{|\}$/g, "").replace(/'/g, "");
      const keyValuePairs1 = cleanString1.split(", ");
      unreservedArray = keyValuePairs1.map((pair) => {
        const [key, value] = pair.split(": ");
        return { [key]: parseInt(value) }; // Convert value to integer
      });

      const cleanString2 = dataArray[1].replace(/^\{|\}$/g, "").replace(/'/g, "");
      const keyValuePairs2 = cleanString2.split(", ");
      reservedArray = keyValuePairs2.map((pair) => {
        const [key, value] = pair.split(": ");
        return { [key]: parseInt(value) }; // Convert value to integer
      });


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
  train_Number = req.params.id;
  console.log(train_Number);

  const {
    name,
    source,
    destination,
    numberOfCoach,
    numberOfSeatsPerCoach,
    startTime,
    endTime,
    fare,
  } = req.body;

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

    // Find the document by ID and update with the provided fields
    const updatedTrain = await Train.findOneAndUpdate(
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
  // const { trainNumber, trainName } = req.params.id;
  const trainNumber = req.query.trainNumber;
  const trainName = req.query.trainName;

  // console.log("hello",trainName,trainNumber)

  try {
    const query = {
      $or: [{ train_Number: trainNumber }, { name: trainName }],
    };

    const deletedTrain = await Train.findOneAndDelete(query);

    if (!deletedTrain) {
      return res
        .status(httpStatusCodes[404].code)
        .json(formResponse(httpStatusCodes[404].code, "Train not found"));
    }

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
  const findAll = await Train.find();
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