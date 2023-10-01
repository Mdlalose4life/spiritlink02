import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useChat } from '../ChatContext';
import { Box, Stack, Text } from "@chakra-ui/layout";
import customAxios from '../axiosUser';

const Mychats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectedChat, chats, setChats, selectedChat } = useChat();
  const toast = useToast();

  const getChat = async () => {
    try {
      const { payload } = await customAxios.get('/chat/getChat', config);
      setChats(payload);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create a Chat. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    getChat();
  }, []);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        d="flex"
        flex="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
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
    </Box>
  );
};

export default Mychats;
