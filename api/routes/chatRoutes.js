const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const protect = require('../middleware/jwtMiddleware')

router.post('/accessChat', protect, chatController.accessChat);
router.get('/getChat', protect, chatController.getChat);


module.exports = router;