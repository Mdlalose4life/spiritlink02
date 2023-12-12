const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/UserModel');

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      //console.log('Token:', token);

      // Verify and decode the token
      const decoded = jwt.verify(token, secretKey);
      //console.log('Decoded Token:', decoded);

      // Find the user associated with the decoded ID
      req.user = await User.findById(decoded.userId).select('-password');
      //console.log('User:', req.user);

      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }

      //console.log('Authentication successful');

      next();
    } else {
      return res.status(401).json({ error: 'Token missing or invalid' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};
module.exports = protect;
