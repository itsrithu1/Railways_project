
const {Router}=require('express');

const { searchTrainUser,displayAllTrainsWithSourceAndDestination } = require('../controllers/railway.controller');
const railwayRouter=Router();

railwayRouter.post('/api/v1/user/searchTrain',searchTrainUser)
railwayRouter.post('/api/v1/user/displayAllTrainsWithSourceAndDestination',displayAllTrainsWithSourceAndDestination)


module.exports=railwayRouter