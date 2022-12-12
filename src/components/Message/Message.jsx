import { Button, Container } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import "./Message.css"

function Message() {
  return (
    <div className='message-component-module'>
      <Container className='message-component-container'>
        <div className='friend-data-container'>

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