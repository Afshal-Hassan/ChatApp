import React, { useCallback, useEffect, useState } from "react";
import "./FriendList.css";
import Chat from "./Chat.png";
import { Container, Typography } from "@mui/material";
import useFetchFriends from "../../hooks/useFetchFriends";



function FriendList() {
  const [friends, fetchFriendsOfUser] = useFetchFriends();

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
              <div className="friend-list-data" key={friend[0].user_id}>
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
}

export default FriendList;
