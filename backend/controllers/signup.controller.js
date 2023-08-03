const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const bcrypt = require("bcryptjs");
const { User } = require("../model/user.model");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  return emailRegex.test(email);
}

exports.createUser = async (req, res) => {
    // console.log("hello")
    // console.log(req.body)
  const { user, email, pwd, number } = req.body;

let name = user
let password = pwd
  

  if (password.length < 6) {
    return res
      .status(httpStatusCodes[202].code)
      .json(
        formResponse(httpStatusCodes[202].code, "password length is too short")
      );
  }
  if (!isValidEmail(email)) {
    return res
      .status(httpStatusCodes[202].code)
      .json(formResponse(httpStatusCodes[202].code, "not a valid email"));
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ name: user });
    if (oldUser) {
      return res
        .status(httpStatusCodes[202].code)
        .json(
          formResponse(httpStatusCodes[202].code, "User with same username found")
        );
    }

    await User.create({
      name,
      email,
      password: encryptedPassword,

      phoneNo:number,
   
    });

    res
        .status(httpStatusCodes[200].code)
        .json(
          formResponse(httpStatusCodes[200].code, "User Created")
        );
    
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatusCodes[500].code)
      .json(formResponse(httpStatusCodes[500].code, error));
  }
};
