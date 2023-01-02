import React, { useEffect } from "react";
import "./FriendList.css";
import Chat from "./Chat.png";
import { Container, Typography } from "@mui/material";
import FetchFriends from "../../services/FetchFriends";
import FetchPrivateRoomKey from "../../services/PrivateRoomKeyService";

function FriendList() {
  const [friends, fetchFriendsOfUser] = FetchFriends();
  const [fetchPrivateRoomKey] = FetchPrivateRoomKey();
  const firstUserEmail = 'afshal@gmail.com';
  
 
  useEffect(() => {
    fetchFriendsOfUser();    
  }, []);

  return (
    <div className="friend-list-module">
      <Container className="friend-list-container">
        <div className="friend-list-header">
          <img src={Chat} className="chat-logo" alt="ChatLogo" />
          <Typography className="friend-list-heading">Messenger</Typography>
        </div>
        <div className="friend-list">
          {friends.map((friend) => {
            return (
              <div className="friend-list-data" key={friend[0].user_id} onClick = {async() => {
                fetchPrivateRoomKey(firstUserEmail,friend[0].email);       
              }}>

                <img className="friend-image" alt="FriendImage" src={Chat} />
                <Typography className="friend-name">{friend[0].name}</Typography>
                <div className="message-div-curve"></div>
                <div className="message-div-curve-right"></div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default FriendList;
