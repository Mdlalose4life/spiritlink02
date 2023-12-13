export const getSender = (loggedUser, users) => {
    return users[0] === loggedUser._id ? users[1].name : users[0].name;
  };
  
export const isSameSenderMargin = (message, currentmessage, index, userId) => {

  const isFirstMessage = index === 0;
  const isLastMessage = index === message.length - 1;

  if (currentmessage.sender?._id === userId){
    return 0;
  } else if(!isFirstMessage && message[index -1].sender?._id === userId) {
    return 33;
  }else if(
    (isLastMessage || (message[index + 1]?.sender?._id !== userId)) && 
    currentmessage.sender?._id === userId
  ){
     return 33;
  } else {
    return "auto";
  }
};
export const isSameUser = (message, currentmessage, index) =>{
  return(
    index > 0 &&
    message[index - 1]?.sender._id === currentmessage.sender?._id
  );
};
