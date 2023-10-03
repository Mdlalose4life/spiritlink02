const User = require('../models/UserModel');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config()

const envAccesslink = process.env.ENV_ACCESS_LINK;
const secretKey = process.env.JWT_SECRET_KEY;

// Registration
exports.registerUser = async (req, res) => {
  try{
    // Logic for registering the new user
    const { username, email, password, confirmpassword, accesslink } = req.body;
  
    // Compare the accessLink provded
    if (!accesslink || accesslink != envAccesslink){
      return res.status(400).json({ message: 'Invalid access link. Please contact the admin' })
    }
    // Check if email email exists
    const userExist = await User.findOne({ email });
      if (userExist){
        return res.status(400).json({ message: 'User alredy exist' });
      } 

    // Create the user if doesn't exists
    const user = new User({ username, email, password, confirmpassword });
    await user.save();

  // generate and sign the JWT token
  const token = jwt.sign({ userId: user._id }, secretKey);

  // Send the token to the client
  res.status(201).json({user, token})

  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred during registration.');
  }
};

exports.LoginUser = async (req, res) => {
  try{
    // Logic for login
    // extract email and password from the request body
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });

    // Say it if the user is not found
    if (!user) {
      return res.status(400).send('User not found');
    }
  
    // Compare the password the user sent with the one in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch){
      // Genarate a JWT token
      const token = jwt.sign({ userId: user._id }, secretKey);
      
      // send the token to the client
      res.status(200).json({ message: 'Authentication succeful', token })
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'An error occured during the login' });
  }
};

exports.getAllUsers = async (req, res) => {
  // Reach out to the database, run query to find all the users
  try{
    // Exclude the user that is making that request
    const users = await User.find( { _id: {$ne: req.user._id} } );
    res.status(200).json(users);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching users.' });
  }  
};