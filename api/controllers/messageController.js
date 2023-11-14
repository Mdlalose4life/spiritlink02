const Message = require("../models/MessageModel");
const User = require("../models/UserModel")
const Chat = require("../models/ChatModel")

exports.sendMessage = async (req, res) => {
  const {content, chatId} = req.body;
  if (!content || !chatId){
    res.status(500).json({ error: 'Invalid data passed into request' });
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId
  }

  try {
    var message = await Message.create(newMessage)

    message = await message .populate("sender", "username")
    message = await message .populate("chat")
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'username email'
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message)
  } catch (error) {
    console.error('Error occured while sending a message', error);
    res.status(400).json({ error: 'Error occured while sending a message' })
  }
}

exports.allMessages = async (req, res) => {
  try {
    const message = await Message.find({chat: req.params.chatId}).populate(
      "sender",
      "username email"
    ).populate("chat")
    res.json(message)
  } catch (error) {
    console.error('Error occured while fetching messages', error);
    res.status(400).json({ error: 'Error occured while fetching a message' })
  }
}