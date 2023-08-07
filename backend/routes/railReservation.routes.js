
const {Router}=require('express');

const { searchTrainUser ,displayTrains, getFare, searchTrainUserNew} = require('../controllers/railway.controller');
const railwayRouter=Router();


railwayRouter.get('/api/v1/user/searchTrain',searchTrainUser)
railwayRouter.get('/api/v1/user/displayTrains',displayTrains)
railwayRouter.get('/api/v1/user/getfare',getFare)
railwayRouter.get('/api/v1/user/searchTrainNew',searchTrainUserNew)


module.exports=railwayRouter