import React, { useState } from 'react';
import {
  Container,
  Box,
  Flex,
  Input,
  Button,
  Text,
  Heading,
} from '@chakra-ui/react';
import './Chat.css';
import { useChat } from '../ChatContext';
import Sidebar from '../components/Sidebar';

function Chat({ rooms }) {
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState();

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    setNewMessage('');
  };

  return (
    <Flex
      direction="column"
      className="full-height"
    >
      <Flex className="full-height">
        {/* Left Border for Chat Names (1/4) */}
        <Box w="25%" className="border-right" borderRight="1px solid gray">
          <Box className="chat-names">
            <Box className="chat-name-header">
              <Heading as="h4">Find Friends</Heading>
              <i className="bi bi-arrow-right-circle"></i>
            </Box>
            {/* Render the sidebar components */}
            <Sidebar rooms={rooms} />
            {/* { useChat && <Mychats/>} */}
          </Box>
        </Box>

        {/* Right Border for Messages (3/4) */}
        <Box w="75%">
          <Box className="message-box">
            <Text className="messages-label">Messages</Text>
            {/* Messages go here */}

            {/* Form for Typing Messages and Send Button */}
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
