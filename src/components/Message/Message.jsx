import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import "./Message.css";
import Chat from "./Chat.png"

const socket=io("http://localhost:5000")

function Message() {

  const[message,setMessage]=useState("");
  const onChangeMessage=(event)=>{
    setMessage(event.target.value)
  }

  const joinRoom = () => {
    console.log("clicked");
    socket.emit("join-room",23);
  }

  const sendMessage=()=>{
    console.log("clicked message");
    socket.emit("send-message",{message:message , room:23});
  }

  useEffect(()=>{
    socket.on("receive-message",(data)=>{
      setMessage(data.message);
    },[socket])
  })

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


          <input className='type-messages' placeholder='Type Something' onChange={onChangeMessage}>

          </input>
          <Button variant="contained" className='send-btn' endIcon={<SendIcon />} onClick={sendMessage}>
            Send
          </Button>
        </div>
        <Button variant="contained" className='send-btn' endIcon={<SendIcon />} onClick={joinRoom}>
            Send
          </Button>
          <div>Hello {message}</div>
      </Container>
    </div>
  )
}

export default Message