const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const jwtMiddleware = require('../middleware/jwtMiddleware')

router.post('/send', jwtMiddleware, messageController.sendMessage);
router.get('/history/:userId', jwtMiddleware, messageController.getMessageHistory);

module.exports = router;