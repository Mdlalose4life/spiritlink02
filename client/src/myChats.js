import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useChat } from '../ChatContext';

const Mychats = () => {
    const [loggedUser, setLoggedUser] = useState;
    const {user, setSelectedChat, chats, setChats} = useChat();
    const toast = useToast();

    const getChat = async () => {
        try {
          const config = {
            headers: {
              "Content-type":"application/json"
            },
          };
          const { payload } = await customAxios.post('/chat/getChat', config);
          setChats(payload)
        } catch (error) {
          console.error(error);
          toast({
            title: 'Error',
            description: 'Failed creat a Chat. Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
    }
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        getChat();
    }, []);


    return <div> We talk</div>
    
}
export default Mychats