import React, { memo, useEffect } from 'react';
import Chat from "./Chat.png";
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import "./Message.css";

function MessageHeader(props) {
    const messageComponentHeading = useSelector((state) => state.changeTheMessageComponentHeaderReducer);
    
  return (
    <div className='friend-data-container'>
    <img src={Chat} className="friend-pic" alt='friend-pic'/>
    <Typography className='friend-message-name'>{messageComponentHeading.messageHeading.charAt(0).toUpperCase() + messageComponentHeading.messageHeading.slice(1)}</Typography>
</div>
  )
}

export default memo(MessageHeader)