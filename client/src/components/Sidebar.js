import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  useToast,
} from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';
import customAxios from '../axiosUser';
import { useChat } from '../ChatContext';

function Sidebar() {
  const toast = useToast();
  const rooms = ['Groups', 'private chat'];
  const [allUsers, setAllUsers] = useState([]);
  const { user, setSelectedChat, chats, setChats } = useChat();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get('/user/getAllUsers');
        const fetchedUsers = response.data;
        setAllUsers(fetchedUsers);

        toast({
          title: 'Talk to friends',
          description: 'Here are your friends',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
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
      const { payload } = await customAxios.post('/chat/accessChat', { userId }, config);
      setSelectedChat(payload);
    } catch (error) {
      console.error(error);
    }
  };

  console.log('Chats:', chats);
  return (
    <Box p={4}>
      <Heading size="md" mb={2}>
        Rooms
      </Heading>
      <List spacing={2}>
        {rooms.map((room, i) => (
          <ListItem key={i} boxShadow="xs" bg="blue.200">
            <ListIcon as={MdArrowForward} />
            {room}
          </ListItem>
        ))}
      </List>

      <Heading size="md" mt={4} mb={2}>
        Users
      </Heading>
      <List spacing={2}>
        {allUsers.map((user) => (
          <ListItem
            key={user._id}
            cursor="pointer"
            bg={
              chats?.some((chat) => chat?.members?.includes(user._id))
                ? '#38B2AC'
                : 'blue.200'
            }
            _hover={{
              background: '#38B2AC',
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
            {user.username}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
