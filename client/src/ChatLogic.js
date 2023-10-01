export const getSender = (loggedUser, users) => {
    return users[0] === loggedUser._id ? users[1] : users[0].name;
};