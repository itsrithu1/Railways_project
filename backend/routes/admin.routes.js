const { Router } = require("express");
const verifyToken= require("../Auth/verify")
const { searchTrain, createTrain , updateTrain,deleteTrain,displayTrains,createTrainNew,displayAllTrainDetails} = require("../controllers/admin.controller");
const adminRouter = Router();



adminRouter.get("/api/v1/admin/searchTrain", searchTrain);
adminRouter.post("/api/v1/admin/createTrain", createTrain);
adminRouter.post("/api/v1/admin/updateTrain", updateTrain);
adminRouter.get("/api/v1/admin/deleteTrain", deleteTrain);
adminRouter.get("/api/v1/admin/displayAllTrains",verifyToken, displayTrains);

adminRouter.post("/api/v1/admin/createTrainNew", createTrainNew);
adminRouter.post("/api/v1/admin/displayAllTrainDetails", displayAllTrainDetails);




module.exports = adminRouter;
