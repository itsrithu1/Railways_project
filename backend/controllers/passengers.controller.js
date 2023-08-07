const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Passenger } = require("../model/passenger.model");
const { SeatAllocation } = require("../model/seatAllocation.model");

function calculateAge(dateOfBirth) {
  console.log("In Function");
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - dob.getFullYear();

  // Check if the birthday has already occurred this year
  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

exports.addPassenger = async (req, res) => {

  console.log(req.body);
  const { passengers } = req.body;
  var i = 0;
  var name, gender, dob, phoneNo, insurance, food, seatnum, ptrRS, ptrURS;

  const train_Number = req.query.train_Number;
  const date = req.query.date;

  var seatsAvailable = 1;
  var PassengerLength = passengers.length;  

  if(PassengerLength > seatsAvailable)
  {
    return res.status(httpStatusCodes[202].code).json(
      formResponse(httpStatusCodes[202].code, "No Seats Available")
    );
  }


  const maxTicket_id = await Passenger.aggregate([
    {
      $group: {
        _id: "$item",
        maxT: { $max: "$ticket_id" },
      },
    },
  ]);
  var result = 0;
  if (maxTicket_id) {
    result = parseInt(maxTicket_id[0].maxT) + 1;
  }


  const seats = await SeatAllocation.findOne({ train_Number, date }).exec();

  const unreservedSeat = seats.unreservedSeats;
  const reservedSeat = seats.reservedSeats;
  ptrURS = seats.ptrURS;
  ptrRS = seats.ptrRS;

  const seatArray = Object.keys(unreservedSeat);
  const urseatArray = Object.keys(reservedSeat);
  const bookedStatusArray = Object.values(unreservedSeat);

  console.log(seatArray[0]);
  console.log(bookedStatusArray[0]);
  console.log(ptrURS);
  console.log(ptrRS);

  var filter,update,options,updatedSeatAllocation;


    for (i = 0; i < passengers.length; i++) {
      name = passengers[i].name;
      gender = passengers[i].gender;
      dob = passengers[i].dob;
      phoneNo = passengers[i].phone;
      insurance = passengers[i].insurance;
      food = passengers[i].food;

      const age = calculateAge(dob);
      console.log(name);
        if (age < 65) {
          seatnum = seatArray[ptrURS];
          ptrURS++;
          console.log("p1");
          console.log(age);
          console.log(seatnum);
          console.log(ptrURS);

          filter = { train_Number, date };
        update = {
          $set: {
            [`unreservedSeats.${seatnum}`]: 1,
            ptrURS: ptrURS
          },
        };

        // By setting { new: true }, you will get the updated document as a result
        options = { new: true };

        updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);

        } 
        else {
          seatnum = urseatArray[ptrRS];
          ptrRS++;
          console.log("p2");
          console.log(age);
          console.log(seatnum);
          console.log(ptrRS);

          filter = { train_Number, date };
        update = {
          $set: {
            [`reservedSeats.${seatnum}`]: 1,
            ptrRS: ptrRS
          },
          $inc: {
            seatsAvailable: -1
          }
          
          };
          // By setting { new: true }, you will get the updated document as a result
          options = { new: true };
          updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);

        }

        try {
          await Passenger .create({
            
            name,
            gender,
            dob,
            phoneNo,
            insurance,
            food,
            ticket_id:result,
            train_Number,
            seat_Number: seatnum
          });

        } catch (error) {
          console.log(error);
        }
    }

  res.status(httpStatusCodes[200].code).json(formResponse(httpStatusCodes[200].code, "Passenger Created"));
};
