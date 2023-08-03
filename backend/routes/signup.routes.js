const { Router } = require("express");

const { createUser } = require("../controllers/signup.controller");
const express = require("express");

const app = express();
const signUpRouter = Router();

signUpRouter.post("/api/v1/user/create", createUser);

module.exports = signUpRouter;
