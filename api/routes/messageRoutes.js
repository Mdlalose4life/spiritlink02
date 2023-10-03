const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const protect= require('../middleware/jwtMiddleware')


router.post('/send', protect, messageController.sendMessage);
router.get('/allMessages/:chatId', protect, messageController.allMessages);

module.exports = router;