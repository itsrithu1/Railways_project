
const {Router}=require('express');

const { searchTrainUser } = require('../controllers/railway.controller');
const railwayRouter=Router();

railwayRouter.post('/api/v1/user/searchTrain',searchTrainUser)

module.exports=railwayRouter