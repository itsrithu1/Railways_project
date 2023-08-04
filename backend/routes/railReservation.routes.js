
const {Router}=require('express');

const { searchTrainUser } = require('../controllers/railway.controller');
const { displayTrains } = require('../controllers/railway.controller');
const railwayRouter=Router();

railwayRouter.post('/api/v1/user/searchTrain',searchTrainUser)
railwayRouter.get('/api/v1/user/displayTrains',displayTrains)

module.exports=railwayRouter