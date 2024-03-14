import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import customAxios from '../../User/customAxios/axiosUser';
import { useChat } from '../ChatStates/ChatContext';
import { Image } from '@chakra-ui/react'
import icon from '../../../assets/User.png'
import Chatloader from '../ChatLoaders/chatloader'
import NotificationBadge from 'react-notification-badge'

function Sidebar() {
  const [allUsers, setAllUsers] = useState([]);
  const {selectedChat, setSelectedChat, chats } = useChat();
  const [isLoading, setIsLoading] = useState();
  const [messageNotifications, setMessageNotifications] = useState([]);
  

  useEffect(() => {

    setIsLoading(true)

    const fetchUsers = async () => {
      try {
        const response = await customAxios.get('/user/getAllUsers');
        const fetchedUsers = response.data;
        setAllUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchUsers();
  }, [chats]);

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await customAxios.post('/chat/accessChat', { userId }, config);

      const updatedNotifications = messageNotifications.filter((id) => id !== userId );
      setMessageNotifications(updatedNotifications)

      //console.log('Access Chat data:', data);
      //console.log('Chat ID:', data._id);
      setSelectedChat(data);
      //console.log(selectedChat)
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewMessage = (userId) => {
    if (selectedChat && selectedChat.users && selectedChat.users.length > 0) {
      console.log('selectedChat', selectedChat);
      console.log('messageNotifications', messageNotifications);
  
      const isSenderInSelectedChat = selectedChat.users.find((chatUser) => chatUser._id === userId);
      console.log('isSenderInSelectedChat', isSenderInSelectedChat);
  
      if (!isSenderInSelectedChat) {
        console.log('userId not in selectedChat');
        if (messageNotifications.indexOf(userId) === -1) {
          console.log('Adding new message notification:', userId);
          setMessageNotifications((prevNotifications) => [...prevNotifications, userId]);
          return true;
        } else {
          console.log('userId already in messageNotifications');
        }
      } else {
        console.log('userId is in selectedChat');
      }
    }
    return false;
  };
  
  
  return (
    <Box p={1} display="flex" flexDirection="column" height="100%" >
      <>
      {isLoading ? (
        <Chatloader/>
      ):(
        <Box flex="1">
        <List spacing={2}>
          {allUsers.map((user) => (
            <ListItem
              key={user._id}
              cursor="pointer"
              bg={
                selectedChat && selectedChat.users && selectedChat.users.some((chatUser) => chatUser._id === user._id)
                  ? '#427898'
                  : 'blue.200'
              }
              _hover={{
                background: '#427898',
                color: 'black',
              }}
              w="100%"
              d="flex"
              alignItems="center"
              color="black"
              px={3}
              py={2}
              mb={2}
              borderRadius="lg"
              onClick={() => {
                accessChat(user._id);
              }}
            >
              <NotificationBadge
                count={handleNewMessage(user._id) ? 1 : 0}
                effect={["scale"]}
                frameLength={10}
              />
              <Box display="flex" alignItems="center">
                <Box marginRight={4}>
                  <Image
                    borderRadius='full'
                    boxSize='50px'
                    src={icon}
                    alt="User Profile"
                  />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text>{user.username}</Text>
                  <Text fontSize="xs" fontWeight="bold">
                    {user.status}
                  </Text>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
        </Box>
      )}
      </>
    </Box>
    
  );
}

export default Sidebar;