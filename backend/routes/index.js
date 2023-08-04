const express=require('express');

const signUpRouter = require('./signup.routes')
const loginRouter = require('./login.routes')
const railwayRouter = require('./railReservation.routes');
const adminRouter = require('./admin.routes');
const passengerRouter = require('./passenger.routes');
// const ticketRouter = require('./ticket.routes');

const router = express.Router();

router.use(signUpRouter)
router.use(loginRouter)
router.use(railwayRouter)
router.use(adminRouter)
router.use(passengerRouter)
// router.use(ticketRouter)

module.exports=router