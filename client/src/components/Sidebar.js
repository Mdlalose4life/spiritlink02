import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, ListIcon, useToast } from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';
import customAxios from '../axiosUser'

function Sidebar() {
  const toast = useToast()
  const rooms = ["Groups", "private chat"];
  const [users, setUsers] = useState([]); // State to store the fetched users

  useEffect(() => {
    // Define a function to fetch all users
    const fetchUsers = async () => {
      try {
        // Make an Axios GET request to your backend API to fetch users
        const response = await customAxios.get('/user/getAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error',
          description: 'Failed to fetch users. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    if (rooms.includes('private chat')) {
      fetchUsers();
    }
  }, []);

  return (
    <Box p={4} >
      <Heading size="md" mb={2}>
        Rooms
      </Heading>
      <List spacing={2} >
        {rooms.map((room, i) => (
          <ListItem key={i} boxShadow='xs' bg='blue:200'>
            <ListIcon as={MdArrowForward} />
            {room}
          </ListItem>
        ))}
        {/* Render the list of users */}
        {users.length > 0 && (
          <ListItem>
              <List px="4">            
                  {users.map((user, i) => (
                       <UserListItem key={i}>{user.username}</UserListItem>
                  ))}              
              </List>              
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default Sidebar;
