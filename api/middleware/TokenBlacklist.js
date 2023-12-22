const TokenBlackList = require('../models/TokenBlacklist');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const blackListedToken = await TokenBlackList.findOne({ token })

        if (blackListedToken){
            return res.status(401).json({message: 'Please Login again'})
        }

        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occured' })
    }
};