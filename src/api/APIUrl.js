export const FriendListAPI = () => {
   return `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/all-friends/of-user`;
};

export const PrivateRoomKey = (firstUserEmail, secondUserEmail) => {
   return `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/private-room/key/${firstUserEmail}/${secondUserEmail}`
};