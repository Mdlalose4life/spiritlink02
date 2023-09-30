const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


router.post('/send', messageController.sendMessage);
router.get('/history/:userId', messageController.getMessageHistory);

module.exports = router;