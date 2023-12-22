const mongoose = require('mongoose');

const tokenBlackListSchema = new mongoose.Schema({
    token : {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24'
    },
});
const TokenBlackList = mongoose.model('TokenBlackList', tokenBlackListSchema);

module.exports = TokenBlackList;