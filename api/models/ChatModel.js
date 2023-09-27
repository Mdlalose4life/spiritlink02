const mongoose = require('mongoose')

const ChatModel = mongoose.Schema(
 {
    ChatName: {type: String, trim: trim},
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
 },{
    timestamps: true,
 }
)
const Chat = mongoose.models("Chat", ChatModel)

module.exports = Chat