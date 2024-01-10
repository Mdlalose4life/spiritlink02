const TokenBlackList = require('../models/TokenBlacklist');

module.exports = async (req, res, next) => {
    try {
        // Testing
        //console.log('Middlware is touched')
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Authorization header is missin' });
        }

        const token = req.headers.authorization.split(' ')[1];
        //console.log('Token for the user is', token)

        const blackListedToken = await TokenBlackList.findOne({ token });

        if (blackListedToken) {
            return res.status(401).json({ message: 'Please Login again' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
