import { useContext, createContext, useState,  } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [selectedChat,setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

    return (
      <ChatContext.Provider
      value={{ user, setUser, selectedChat,setSelectedChat, chats, setChats}}>
        {children}
      </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};