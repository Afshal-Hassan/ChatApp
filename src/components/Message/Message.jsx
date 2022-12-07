import { Container } from '@mui/material';
import React from 'react';
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
            <div className='type-messages'>
            
</div>
        </Container>
    </div>
  )
}

export default Message