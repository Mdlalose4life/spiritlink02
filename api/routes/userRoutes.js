// user routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const protect = require('../middleware/jwtMiddleware')

// register route
router.post('/register', userController.registerUser);
 
// Login route
router.post('/login', userController.LoginUser);

// Find all the Logedin users on the database
router.get('/getAllUsers', protect, userController.getAllUsers);

module.exports = router