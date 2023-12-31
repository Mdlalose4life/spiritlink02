import { useContext, createContext, useState, useEffect } from 'react';
import {useNavigate } from 'react-router';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [selectedChat, setSelectedChat] = useState({});
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
    //console.log("userInfo", userInfo)
    if (!userInfo){
    //navigate.push('/')
    }
  }, [navigate])

  useEffect(() =>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
  }, [selectedChat])
    return (
      <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
        {children}
      </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};