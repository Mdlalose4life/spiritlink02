import React, {useRef, useEffect} from 'react';
import { useChat } from '../ChatStates/ChatContext';
import { isSameSenderMargin, isSameUser } from '../ChatLogics/ChatLogic';


function ScrollingChats({ message }) {
  const { user } = useChat();
  const ChatRef = useRef(null);

  useEffect(()=> {
    if (ChatRef.current){
      ChatRef.current.scrollTop = ChatRef.current.scrollHeight;
    }
  }, [message])

  return (
    <div style={{ maxHeight: 'calc(89vh - 40px)', overflowY:'auto' }} ref={ChatRef}>
      {message &&
        message.map((currentmessage, index) => (
        <div style={{ display: 'flex' }} key={`${currentmessage._id}_${index}`}>
            {currentmessage && currentmessage.sender && currentmessage.sender._id ? 
            (
              <span
                style={{
                  backgroundColor: `${
                    currentmessage.sender._id === user?._id ? "#7E57C2" : "#427898"
                  }`,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  maxWidth: '75%',
                  marginLeft: isSameSenderMargin(message, currentmessage, index, user._id),                  
                  marginTop: isSameUser(message, currentmessage, index, user._id) ? 3 : 10,
                }}
              >
                {currentmessage.content}
              </span>
            ) : (
              <span>Message sender information not available.</span>
            )}
          </div>
        ))}
    </div>
  );
}

export default ScrollingChats;
