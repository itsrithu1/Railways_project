
const {Router}=require('express');

const { searchTrainUser } = require('../controllers/railway.controller');
<<<<<<< HEAD
const railwayRouter=Router();

railwayRouter.post('/api/v1/user/searchTrain',searchTrainUser)
=======
const { displayTrains } = require('../controllers/railway.controller');

const railwayRouter=Router();

railwayRouter.post('/api/v1/user/searchTrain',searchTrainUser)
railwayRouter.get('/api/v1/user/displayTrains',displayTrains)
>>>>>>> 5a951adaca839017424bb778e528426cbebac37a

module.exports=railwayRouter