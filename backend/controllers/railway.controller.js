const httpStatusCodes = require("../Constants/http-status-codes");
const { SeatAllocation } = require("../model/seatAllocation.model");
const { Train } = require("../model/trainData.model");
const { formResponse } = require("../utils/helper");
const { displayTrains } = require("./admin.controller");

exports.searchTrainUser = async (req, res) => {
  // const { source, destination, date } = req.body;

  const source=req.query.source;
  const destination=req.query.destination;
  const date=req.query.date;



// console.log(source,destination,date)
  try {
    const checkTrain = await Train.find({ source, destination });

    if (!checkTrain.length) {
      return res.status(httpStatusCodes[202].code).json(
        formResponse(httpStatusCodes[202].code, "No Trains found for this route")
      );
    }

    const foundTrainsPromises = checkTrain.map(async (train) => {
      const findTrainWithSeats = await SeatAllocation.find({
        train_Number: train.train_Number,
        date
      });

      if(!findTrainWithSeats){
        return res.status(httpStatusCodes[204].code).json(
          formResponse(httpStatusCodes[204].code, "No Trains found")
        );
      }

      // console.log(findTrainWithSeats[0].ptrURS);


      let reserverdSeatsPerCoach =Math.floor( 0.1 * train.numberOfSeatsPerCoach)
      let totalReservedSeats = reserverdSeatsPerCoach* train.numberOfCoach

      let totalUnreservedSeats = (train.numberOfCoach*train.numberOfSeatsPerCoach)-totalReservedSeats

      let totalSeatsAvailable = totalReservedSeats - findTrainWithSeats[0].ptrRS +totalUnreservedSeats - findTrainWithSeats[0].ptrURS 


      return {
        train_Number: train.train_Number,
        name : train.name,
        arrival_time : train.startTime,
        departure_time : train.endTime,
        fare:train.fare,
        totalSeatsAvailable: totalSeatsAvailable,

      };
    });

    const foundTrains = await Promise.all(foundTrainsPromises);

    return res
      .status(httpStatusCodes[200].code)
      .json(
        formResponse(httpStatusCodes[200].code, foundTrains)
      );
  } catch (error) {
    console.error('Error:', error);
    return res
      .status(httpStatusCodes[500].code)
      .json(formResponse(httpStatusCodes[500].code, "Internal Server Error"));
  }
};

exports.displayTrains = async (req, res) => {

  const trainNumber = req.query.trainNumber;
  console.log(trainNumber);
  
  try {
    

    const foundTrains = await Train.find({train_Number: trainNumber});

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
