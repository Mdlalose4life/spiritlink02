import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  useToast,
  Input
} from '@chakra-ui/react';
import './Chat.css';
import { useChat } from '../ChatContext';
import Sidebar from '../components/Sidebar';
import customAxios from '../axiosUser';
import './text.css';
import ScrollingChats from '../components/ScrollingChats';
import io from 'socket.io-client';

const API_URL = "http://localhost:3330";

function Chat({ rooms }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const toast = useToast();
  const { user, selectedChat } = useChat();

  const socket = io(API_URL);

  useEffect(() => {
    socket.emit('setup', user.user);

    socket.on('message recieved', (newMessageReceived) => {
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    });

    return () => {
      socket.off('message recieved');
      socket.disconnect();
    };
  }, [socket, user.user]);

  const fetchMessages = async () => {
    try {
      if (!selectedChat || !selectedChat._id) {
        return;
      }

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await customAxios.get(`/msgs/allMessages/${selectedChat._id}`, config)
      //console.log(data);
      setMessages(data);
      socket.emit('join chat', selectedChat._id);

    } catch (error) {
      toast({
        title: 'Error',
        description: `Error fetching the messages: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    //console.log("Selected Chat:", selectedChat._id);
    if (selectedChat?._id) {
      //console.log("Fetching messages...");
      fetchMessages();
    }
  }, [selectedChat]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await customAxios.post('/msgs/send', {
        content: newMessage,
        chatId: selectedChat._id,
      }, config);
      //console.log(data)
  
      setMessages((prevMessages) => [...prevMessages, data]);
  
      socket.emit('send message', data);
      setNewMessage('');
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      toast({
        title: 'Error',
        description: `Cannot create the message: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction="column"
      className="full-height"
    >
      <Flex className="full-height">
        {/* Left Border for Chat Names (1/4) */}
        <Box w="25%" className="border-right" borderRight="1px solid gray" rounded="10">
          <Box className="chat-names">
            {/* Render the sidebar components */}
            <Sidebar rooms={rooms} />
          </Box>
        </Box>

        {/* Right Border for Messages (3/4) */}
        <Box w="75%">
          <Box className="message-box" rounded="10">
            <Text className="messages-label">Messages</Text>
            <div className="message-text">
              <ScrollingChats message={messages}/>
            </div>
            <form className="message-form" onSubmit={handleSendMessage}>
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message-input"
              />
              <Button type="submit" colorScheme="blue" className="send-button">
                Send
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Chat;
