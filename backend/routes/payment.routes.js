const { Router } = require("express");

const { paymentuser } = require("../controllers/payment.controller");
const paymentRouter = Router();
// const searchTicketsRouter = Router();

paymentRouter.post("/api/v1/payment", paymentuser);

module.exports = paymentRouter;
