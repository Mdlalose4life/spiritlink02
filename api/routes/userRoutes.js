// user routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const protect = require('../middleware/jwtMiddleware')
const TokenBlackListCheck = require('../middleware/TokenBlacklist')

// register route
router.post('/register', userController.registerUser);
 
// Login route
router.post('/login', protect, userController.LoginUser);

// Logout rout
router.post('/logout', protect, TokenBlackListCheck, userController.logoutUser);

// Find all the Logedin users on the database
router.get('/getAllUsers', protect, TokenBlackListCheck, userController.getAllUsers);

module.exports = router