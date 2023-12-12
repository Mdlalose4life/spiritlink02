export const getSender = (loggedUser, users) => {
    return users[0] === loggedUser._id ? users[1].name : users[0].name;
  };
  
  export const isSameSenderMargin = (message, currentmessage, index, userId) => {
    if (
      message &&
      message[index - 1] &&
      message[index - 1].sender &&
      message[index - 1].sender._id === currentmessage.sender?._id &&
      currentmessage.sender &&
      currentmessage.sender._id !== userId
    ) {
      return 33;
    } else if (
      (message &&
        message[index + 1] &&
        message[index + 1].sender &&
        message[index + 1].sender._id !== currentmessage.sender._id &&
        currentmessage.sender &&
        currentmessage.sender._id !== userId) ||
      (index === message.length - 1 &&
        currentmessage.sender &&
        currentmessage.sender._id !== userId)
    ) {
      return 0;
    } else {
      return "auto";
    }
  };
  
  export const isSameUser = (message, currentmessage, index) => {
    return (
      index > 0 &&
      message[index - 1] &&
      message[index - 1].sender &&
      message[index - 1].sender._id === currentmessage.sender._id
    );
  };
  