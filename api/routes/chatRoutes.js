const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authenticateToken = require('../middleware/jwtMiddleware')

router.post('/accessChat', authenticateToken, chatController.accessChat);
router.get('/getChat', authenticateToken, chatController.getChat);


module.exports = router;