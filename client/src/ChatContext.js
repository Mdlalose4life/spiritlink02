import { useContext, createContext, useState,  } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();

    return (
      <ChatContext.Provider value={{ user, setUser }}>
        {children}
      </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};