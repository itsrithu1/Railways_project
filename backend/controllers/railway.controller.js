const httpStatusCodes = require("../Constants/http-status-codes");
const { SeatAllocation } = require("../model/seatAllocation.model");
const { Train } = require("../model/trainData.model");
const { formResponse } = require("../utils/helper");

exports.searchTrainUser = async (req, res) => {
  // const { source, destination, date } = req.body;

  const source=req.query.source;
  const destination=req.query.destination;
  const date=req.params.date;




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

      return {
        // train_Number: train.train_Number,
        seatAllocations: findTrainWithSeats
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


