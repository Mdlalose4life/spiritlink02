import { useState, useContext, createContext, useEffect } from 'react';
import io from 'socket.io-client'

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [ messages, setMessages ] = useState([]);
    const socket = io('http://localhost:3330') 

    useEffect(() => {
      // Listen the incoming messages from the server
      socket.on('message', (message) => {
        setMessages([...messages, message]);
      });

      return () => {
        socket.off('message')
      }
    }, [messages]);

    const sendMessage = (receiverId, content) => {
      socket.emit('chatMessage', { receiverId, content });
    };
    return (
      <ChatContext.Provider value={{ messages, sendMessage }}>
        {children}
      </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};