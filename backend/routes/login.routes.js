const { Router } = require("express");

const { loginUser } = require("../controllers/login.controller");
const { searchTicket } = require("../controllers/login.controller");
const loginRouter = Router();
// const searchTicketsRouter = Router();

loginRouter.post("/api/v1/user/login", loginUser);
loginRouter.post("/api/v1/user/tickets", searchTicket);

module.exports = loginRouter;
