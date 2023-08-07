const { Router } = require("express");

const { searchTrain, createTrain , updateTrain,deleteTrain,displayTrains,createTrainNew} = require("../controllers/admin.controller");
const adminRouter = Router();

adminRouter.get("/api/v1/admin/searchTrain", searchTrain);
adminRouter.post("/api/v1/admin/createTrain", createTrain);
adminRouter.post("/api/v1/admin/updateTrain", updateTrain);
adminRouter.get("/api/v1/admin/deleteTrain", deleteTrain);
adminRouter.get("/api/v1/admin/displayAllTrains", displayTrains);

adminRouter.post("/api/v1/admin/createTrainNew", createTrainNew);




module.exports = adminRouter;
