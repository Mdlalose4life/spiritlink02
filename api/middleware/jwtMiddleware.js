const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next){
  const token = req.header('Authorization');
  if (!token)
  return res.status(401).json({ error: 'unauthorized' });

  jwt.verify(token, secretKey, (err, user)=> {
    if (err) 
    return res.status(403).json({error: 'Forbidden'});
    req.user = user;
    next();
  });
}
module.exports = authenticateToken;