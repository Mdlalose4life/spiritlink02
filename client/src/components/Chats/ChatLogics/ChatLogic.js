export const isSameSenderMargin = (message, currentmessage, index, userId) => {
    if (
      index < message.length - 1 &&
      message[index + 1].sender._id === currentmessage.sender._id &&
      message[index].sender._id !== userId
    )
    return 0;
    else if (
      (index < message.length - 1 &&
        message[index + 1].sender._id !== currentmessage.sender._id &&
        message[index].sender._id !== userId) ||
      (index === message.length - 1 && message[index].sender._id !== userId)
    )
    return 0;
    else return "auto";
  };

  export const isSameUser = (message, currentmessage, index) => {
    return index > 0 && message[index - 1].sender._id === currentmessage.sender._id;
  }