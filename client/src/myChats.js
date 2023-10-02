import { useToast, Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useChat } from '../ChatContext';
import customAxios from '../axiosUser';
import { getSender } from './ChatLogic';

const Mychats = () => {
  const { setSelectedChat, chats, setChats, selectedChat } = useChat();
  const toast = useToast();

  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await customAxios.get('/chat/getChat');
        const { payload } = response.data;
        setChats(payload);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to fetch chats. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    
    getChat();
  }, [setChats, toast]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      overflowY="auto"
      maxH="100vh" // Limit the height to the viewport
    >
      {chats ? (
        <Stack>
          {chats.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#38B2AC" : "transparent"}
              color={selectedChat === chat ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
            >
              <Text>
                {getSender(loggedUser, chat.users)}: {chat.lastMessage}
              </Text>
            </Box>
          ))}
        </Stack>
      ) : (
        <Text>No chats available.</Text>
      )}
    </Box>
  );
};

export default Mychats;
