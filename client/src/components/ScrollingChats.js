import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useChat } from '../ChatContext';
import { isSameSenderMargin, isSameUser } from '../ChatLogic';

function ScrollingChats({ message }) {
  const { user } = useChat();
  return (
    <ScrollableFeed>
      {message &&
        message.map((currentmessage, index) => (
        <div style={{ display: 'flex' }} key={`${currentmessage._id}_${index}`}>
            {currentmessage && currentmessage.sender && currentmessage.sender._id ? 
            (
              <span
                style={{
                  backgroundColor: `${
                    currentmessage.sender._id === user.user?._id ? "#7E57C2" : "#427898"
                  }`,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  maxWidth: '75%',
                  marginLeft: isSameSenderMargin(message, currentmessage, index, user.user._id),                  
                  marginTop: isSameUser(message, currentmessage, index, user.user._id) ? 3 : 10,
                }}
              >
                {currentmessage.content}
              </span>
            ) : (
              <span>Message sender information not available.</span>
            )}
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollingChats;
