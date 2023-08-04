const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const { Ticket } = require("../model/ticket.model");

exports.createticket = async (req, res) => {
  const { name, gender, dob, phoneNo,insurance, food, ticket_id } = req.body;
 

  try {
    

    await Ticket .create({
      
      name,
      gender,
      dob,
      phoneNo,
      insurance,
      food,
      ticket_id,
 
   
    });

    res
        .status(httpStatusCodes[200].code)
        .json(
          formResponse(httpStatusCodes[200].code, "Ticket Created")
        );
    
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatusCodes[500].code)
      .json(formResponse(httpStatusCodes[500].code, error));
  }
};


