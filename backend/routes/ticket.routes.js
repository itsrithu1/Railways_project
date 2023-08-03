const { Router } = require("express");

const { createticket } = require("../controllers/ticket.controller");
const express = require("express");

const app = express();
const ticketRouter = Router();

ticketRouter.post("/api/v1/ticket/create", createticket);

module.exports = ticketRouter;
