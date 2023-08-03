const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Passenger } = require("../model/passenger.model");
const { Ticket } = require("../model/ticket.model");

exports.addPassenger = async (req, res) => {
  const { name, gender, dob, phoneNo,insurance, food, ticket_id,  train_Number } = req.body;
 

  try {
    

    await Passenger .create({
      
      name,
      gender,
      dob,
      phoneNo,
      insurance,
      food,
      ticket_id,
      train_Number
 
   
    });

    res
        .status(httpStatusCodes[200].code)
        .json(
          formResponse(httpStatusCodes[200].code, "Passenger Created")
        );
    
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatusCodes[500].code)
      .json(formResponse(httpStatusCodes[500].code, error));
  }
};

exports.createticket = async (req, res) => { 

  const { name, gender, dob, phoneNo,insurance, food, ticket_id } = req.body;
 

};


