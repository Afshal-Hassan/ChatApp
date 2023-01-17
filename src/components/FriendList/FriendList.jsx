import React, { useEffect, useState } from "react";
import "./FriendList.css";
import Chat from "./Chat.png";
import { Container, Input, Typography } from "@mui/material";
import FetchFriends from "../../services/FetchFriends";
import FetchPrivateRoomKey from "../../services/PrivateRoomKeyService";

function FriendList() {
  const [friends, fetchFriendsOfUser] = FetchFriends();
  const [fetchPrivateRoomKey] = FetchPrivateRoomKey();
  const [searchValue, setSearchValue] = useState("");
  const firstUserEmail =localStorage.getItem("email");
  
  const onSearch = (event) => {
      setSearchValue(event.target.value);
  }
 
  useEffect(() => {
    fetchFriendsOfUser(firstUserEmail);    
  }, []);

  return (
    <div className="friend-list-module">
      <Container className="friend-list-container">
        <div className="friend-list-header">
          <img src={Chat} className="chat-logo" alt="ChatLogo" />
          <Typography className="friend-list-heading">Messenger</Typography>
        </div>
        <div className="friend-list">
        <Input disableUnderline={true} className="search-friends" placeholder="Search" onChange={onSearch}/>
          <div className="friend-content">
          {searchValue == "" ? friends.map((friend) => {
            return (
              <div className="friend-list-data" key={friend[0].user_id} onClick = {async() => {
                fetchPrivateRoomKey(firstUserEmail,friend[0].email,friend[0].name);       
              }}>

                <img className="friend-image" alt="FriendImage" src={Chat} />
                <Typography className="friend-name">{friend[0].name}</Typography>
                <div className="message-div-curve"></div>
                <div className="message-div-curve-right"></div>
              </div>
            );
          }) : friends.filter((friend)=>{
            if(friend[0].name.toLocaleUpperCase().indexOf(searchValue.toLocaleUpperCase()) > -1){
              return friend[0].name;
            }
        }).map((friend) => {
          return (
            <div className="friend-list-data" key={friend[0].user_id} onClick = {async() => {
              fetchPrivateRoomKey(firstUserEmail,friend[0].email,friend[0].name);      
            }}>

              <img className="friend-image" alt="FriendImage" src={Chat} />
              <Typography className="friend-name">{friend[0].name}</Typography>
              <div className="message-div-curve"></div>
              <div className="message-div-curve-right"></div>
            </div>
          );
        })}
        </div>
       
        </div>
    
      </Container>
    </div>
  );
};

export default FriendList;
