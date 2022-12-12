import { Button, Container } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import "./Message.css";
import Chat from "./Chat.png"

function Message() {
  return (
    <div className='message-component-module'>
      <Container className='message-component-container'>
        <div className='friend-data-container'>
            <img src={Chat} className="friend-pic"/>
            <div className='friend-message-name'>Arham</div>
        </div>
        <div className='messages-data'>
          <div className='messsages'></div>
          <div className='messsages-border'></div>
        </div>
        <div className='message-send'>


          <div className='type-messages'>

          </div>
          <Button variant="contained" className='send-btn' endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default Message