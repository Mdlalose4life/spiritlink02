import { useEffect } from 'react';
import { useToast } from "@chakra-ui/react";
import { useChat } from '../ChatContext';
import customAxios from '../axiosUser';

const Mychats = () => {
  const { setChats } = useChat();
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

}

export default Mychats;
