const { Router } = require("express");

const { addPassenger } = require("../controllers/passengers.controller");

const passengerRouter = Router();

passengerRouter.post("/api/v1/passenger/addPassenger", addPassenger);
// passengerRouter.post("/api/v1/ticket/create", createticket);

module.exports = passengerRouter;
