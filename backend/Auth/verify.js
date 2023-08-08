const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to verify token
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']

    const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({  status:401,message: 'Token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ status:402,message: 'Token is invalid' });
    }
    console.log("going to net");
    req.name = decoded.name;
    next();
  });
};


module.exports = verifyToken;