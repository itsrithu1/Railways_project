const { Router } = require("express");

const { searchTrain, createTrain , updateTrain,deleteTrain,displayTrains} = require("../controllers/admin.controller");
const adminRouter = Router();

adminRouter.get("/api/v1/admin/searchTrain", searchTrain);
adminRouter.post("/api/v1/admin/createTrain", createTrain);
adminRouter.post("/api/v1/admin/updateTrain", updateTrain);
adminRouter.get("/api/v1/admin/deleteTrain", deleteTrain);
adminRouter.get("/api/v1/admin/displayAllTrains", displayTrains);




module.exports = adminRouter;
