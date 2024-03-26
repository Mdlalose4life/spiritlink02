import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  useToast,
  Input,
  CircularProgress,
} from '@chakra-ui/react';
import './Chat.css';
import { useChat } from './ChatStates/ChatContext';
import Sidebar from './ChatSidebar/Sidebar';
import customAxios from '../User/customAxios/axiosUser';
import Logout from '../User/UserLogout/Logout';
import './text.css';
import ScrollingChats from './ChatScrolling/ScrollingChats';
import io from 'socket.io-client';
import logo from '../../assets/sbu.png'
import { LuSendHorizonal } from "react-icons/lu";

const API_URL =  'https://spiritlink.onrender.com';
var socket;
socket = io(API_URL, { path: '/socket.io' });

function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();
  const { user, selectedChat } = useChat();

  useEffect(() => {
    socket.emit('setup', user);

    socket.on('message recieved', (newMessageReceived) => {
      if
      (selectedChat &&
      selectedChat._id &&
      newMessageReceived.chat &&
      newMessageReceived.chat._id === selectedChat._id
      ){
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]); 
      }
    });

    return () => {
      socket.off('message recieved');
      //socket.disconnect();
    };
  }, [socket, user]);

  const fetchMessages = async () => {
    try {
      if (!selectedChat || !selectedChat._id) {
        return;
      }

      setIsLoading(true)

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await customAxios.get(`/msgs/allMessages/${selectedChat._id}`, config)
      //console.log(data);
      setMessages(data);
      //console.log(selectedChat._id)
      socket.emit('join chat', selectedChat._id);

    } catch (error) {
      toast({
        title: 'Error',
        description: `Error fetching the messages: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    //console.log("Selected Chat: ", selectedChat);      
    if (selectedChat && selectedChat?._id) {
      //console.log("Fetching messages...");
      fetchMessages();
    }
  }, [selectedChat]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    
    if (!newMessage.trim()){
      return
    }

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
          //console.log('The content', data)
    
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
    }

  return (
    <Flex
      direction="column"
      className="full-height"
    >
      <Flex className="full-height">
        {/* Left Border for Chat Names (1/4) */}
        <Box w="25%" className="border-right" borderRight="1px solid gray" rounded="10">
            <Box size="md" mt={4} mb={2} ml={6}>
              <img src={logo} alt="Logo" style={{ width: '170px', height: 'auto' }} />
            </Box>
          <Box className="chat-names">
            <Sidebar/>
          </Box>
          <Box position="absolute" bottom="0">
            <Logout/>
          </Box>
        </Box>

        {/* Right Border for Messages (3/4) */}
        <Box w="75%">
          <Box className="message-box" rounded="10">
            <Text className="messages-label">
            {selectedChat?.users && selectedChat.users.length > 1 &&
            (selectedChat.users[0]._id === user._id
            ? selectedChat.users[1].username
            : selectedChat.users[0].username)
            }
            </Text>
            <Flex
              justify="center"
              align="center"
              height="100%"
            >
            {isLoading ? (
            <>
                <CircularProgress
                  isIndeterminate
                  size="100px"
                  color='blue.200'
                  trackColor='transparent'
                />
            </>
              ) : (
                  <div className="message-text">
                    <ScrollingChats message={messages}/>
                  </div>           
              )}
            </Flex>
            <form className="message-form" onSubmit={handleSendMessage}>
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message-input"
              />
                <Button
                  type='submit'
                  colorScheme='blue'
                  className='send-button'
                  rightIcon={<LuSendHorizonal />}
                >
                  send
                </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Chat;
