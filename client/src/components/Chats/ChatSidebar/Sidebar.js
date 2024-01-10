import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  useToast,
  Text,
} from '@chakra-ui/react';
import customAxios from '../../User/customAxios/axiosUser';
import { useChat } from '../ChatStates/ChatContext';
import { Image } from '@chakra-ui/react'
import icon from '../../../assets/User.png'
import Chatloader from '../ChatLoaders/chatloader'

function Sidebar() {
  const toast = useToast();
  const rooms = ['Groups', 'private chat'];
  const [allUsers, setAllUsers] = useState([]);
  const {selectedChat, setSelectedChat, chats } = useChat();
  const [isLoading, setIsLoading] = useState();

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

    if (rooms.includes('private chat')) {
      fetchUsers();
    }
  }, [chats, toast]);

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await customAxios.post('/chat/accessChat', { userId }, config);
      //console.log('Access Chat data:', data);
      //console.log('Chat ID:', data._id);
      setSelectedChat(data);
      //console.log(selectedChat)
    } catch (error) {
      console.error(error);
    }
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