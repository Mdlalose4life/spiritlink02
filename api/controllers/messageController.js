const Message = require("../models/MessageModel");

exports.sendMessage = async (req, res) => {
  try{
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !content){
        return res.status(400).json({ error: 'Invalid receiver or message content' });
    }

    // create a new message
    const message = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content,
    });

    // save the message to the database
    await message.save()

    res.status(200).json({ message: 'Message sent' })
  } catch (error){
    console.error('Error occured while sending a message', error);
    res.status(500).json({ error: 'Error occured while sending a message' })
  }
};

exports.getMessageHistory = async(req, res) => {
    try{
      const userId = req.user.userId;

      // Find messages
      const messaages = await Message.find({
        $or: [{ sender: userId }, { receiver: userId }],
      }).exec();

      res.status(200).json({ messaages })
    } catch (error){
        console.error('An error while fetching message history', error);
        res.status(500).json({ error: "An error while fetching message history" })
    }
}