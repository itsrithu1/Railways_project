
const {Router}=require('express');

const { searchTrain } = require('../controllers/railway.controller');
const railwayRouter=Router();

railwayRouter.post('/api/v1/user/searchTrain',searchTrain)

module.exports=railwayRouter