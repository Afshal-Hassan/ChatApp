export const FriendListAPI = (user) => {
   return `${process.env.REACT_APP_BASE_URL}/all-friends/of-user/${user}`;
};

export const PrivateRoomKey = (firstUserEmail, secondUserEmail) => {
   return `${process.env.REACT_APP_BASE_URL}/private-room/key/${firstUserEmail}/${secondUserEmail}`
};

export const GetMessagesURL = (sender,receiver) => {
   return `${process.env.REACT_APP_BASE_URL}/messages/${sender}/${receiver}`;
}