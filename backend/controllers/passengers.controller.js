const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Passenger } = require("../model/passenger.model");
// const { Ticket } = require("../model/ticket.model");

exports.addPassenger = async (req, res) => {
  console.log("Heloo");
  console.log(req.body);
  const { passengers } = req.body;

  var i=0;
  var name,gender,dob,phoneNo,insurance,food;


  const train_Number = req.query.train_Number;
 
  const maxTicket_id = await Passenger.aggregate([
    {
      $group: {
        _id: "$item",
        maxT: { $max: "$ticket_id" }
      }
    }
  ])
  var result =0;
  if(maxTicket_id){
    console.log("Im in maxID");
    result = ((parseInt(maxTicket_id[0].maxT))+1);

  }
 
  console.log(maxTicket_id);
  // console.log((parseInt(maxTicket_id[0].maxT))+1);
 
  console.log(result);




  for(i=0;i<passengers.length;i++)
  {
    name = passengers[i].name;
    gender = passengers[i].gender;
    dob = passengers[i].dob;
    phoneNo = passengers[i].phone;
    insurance = passengers[i].insurance;
    food = passengers[i].food;



    try {
    

      await Passenger .create({
        
        name,
        gender,
        dob,
        phoneNo,
        insurance,
        food,
        ticket_id:result,
        train_Number
   
     
      });
  
     
      
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatusCodes[500].code)
        .json(formResponse(httpStatusCodes[500].code, error));
    }
  }
  
  res
  .status(httpStatusCodes[200].code)
  .json(
    formResponse(httpStatusCodes[200].code, "Passenger Created")
  );
 


  
};

exports.createticket = async (req, res) => { 

  const { name, gender, dob, phoneNo,insurance, food, ticket_id } = req.body;
 

};


