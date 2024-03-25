const Chat = require('../models/ChatModel');
const User = require('../models/UserModel');

exports.accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log('userId is not sent with the request');
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    // Check if a chat already exists between the two users
    const isChat = await Chat.findOne({
      users: {
        $all: [req.user._id, userId],
      },
    }).populate('users', '-password').populate('latestMessage');

    if (isChat) {
      res.status(200).json(isChat);
      
    } else {
      // Chech if the users is trying to create chats with themselves.
      if (req.user._id === userId) {
        res.status(400).json({error: 'You cannot create a chat with yourself'});
      }else{
        // Create a new chat if it doesn't exist
        const chatData = {
          ChatName: 'Sender',
          users: [req.user._id, userId],
      };
      
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password');

      res.status(200).json(fullChat);
            
      }
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while accessing the chat' });
  }
};

exports.getChat = async (req, res) => {
  try {
    const chats = await Chat.find({ users: { $ne: [req.user._id] } })
      .populate('users', '-password', '-confirmpassword')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });

    const populatedChats = await User.populate(chats, {
      path: 'latestMessage.sender',
      select: 'username email status',
    });

    res.status(200).json(populatedChats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting chats' });
  }
};
