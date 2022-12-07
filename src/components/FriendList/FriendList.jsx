import React from 'react';
import "./FriendList.css";
import Chat from "./Chat.png";
import {Container, Typography} from "@mui/material";


function FriendList() {
  return (
    <div className='friend-list-module'>
      <Container className='friend-list-container'>
        <div className='friend-list-header'>
        <img src={Chat} className="chat-logo" alt='ChatLogo'/>
        <Typography className='friend-list-heading'>Messenger</Typography>
        </div>
        <div className='friend-list'>
          <div className='friend-list-data'>
            <img className='friend-image' alt='FriendImage' src={Chat}/>
            <Typography className='friend-name'>Michael</Typography>
          </div>
        </div>
      </Container>

    </div>
  )
}

export default FriendList