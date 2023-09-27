// Auth routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware')

// register route
router.post('/register', authController.registerUser);

// Login route
router.post('/login', authController.LoginUser);

// Find all the online users on the database
router.post('/allUsers', authController.findUsers);

// protecter route
router.get('/protected', jwtMiddleware, (req, res)=>{
    
  res.json({ message: 'You have access to this protected route!', user: req.user });
})

module.exports = router 