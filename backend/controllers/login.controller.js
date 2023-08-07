const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../model/user.model");
const { Passenger } = require("../model/passenger.model");



exports.loginUser = async (req, res) => {

  console.log(req.body)
  const { user, pwd } = req.body;

  let username=user
  let password = pwd


  if (!user || !pwd) {
    return res
      .status(httpStatusCodes[400].code)
      .json(formResponse(httpStatusCodes[400].code, "missing username or password"));
  }

  const checkuser = await User.findOne({ name : username});

  if (!checkuser) {
    return res
      .status(httpStatusCodes[401].code)
      .json(formResponse(httpStatusCodes[401].code, "Invalid credentials"));
  }

  if (await bcrypt.compare(password, checkuser.password)) {
    const token = await jwt.sign(
      { name: checkuser.name },
      process.env.JWT_SECRET
    );

    try {
      const filter = { name: checkuser.name };
      // this option instructs the method to create a document if no documents match the filter
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          token: token,
        },
      };
      const result = await User.updateOne(filter, updateDoc, options);
    } catch (error) {
      console.log(error);
    }

    if(username=="Admin" && password=="@Admin123"){
      return res
      .status(httpStatusCodes[200].code)
      .json(formResponse(httpStatusCodes[200].code, "Logged in as Admin"));
    }

    return res
      .status(httpStatusCodes[200].code)
      .json(formResponse(httpStatusCodes[200].code, "Logged in as User"));
  }
  return res
    .status(httpStatusCodes[404].code)
    .json(formResponse(httpStatusCodes[404].code, "Invalid credentials"));
};




exports.searchTicket = async (req, res) => {

  console.log("search Ticket Called")
  const result = await Passenger.find({ _id: Ids});
  
  
  console.log(result)


};