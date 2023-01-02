import { Button, Container, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import "./Message.css";
import Chat from "./Chat.png"
import { useSelector } from 'react-redux';

const socket=io(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}`)

function Message() {
  const  privateRoomKey = useSelector((state) => state.changeThePrivateRoomKey);
  const[message,setMessage]=useState("");

  const onChangeMessage=(event)=>{
    setMessage(event.target.value)
  }
  
  const joinRoom = () => {
    if(privateRoomKey.roomId != 0){
      socket.emit("join-room",privateRoomKey.roomId);
    }
  }

  const appendMessage = (messages,messageType) => {
    let messageArea = document.getElementById('message-area');
    let outgoingMessageDiv = document.createElement("div");
    let className = messageType
    outgoingMessageDiv.classList.add(messageType);
    outgoingMessageDiv.innerHTML = messages;
    messageArea.appendChild(outgoingMessageDiv);
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  const sendMessage=()=>{
    appendMessage(message,"outgoing-messsages");
    socket.emit("send-message",{message:message , room:privateRoomKey.roomId});
  }

  const receiveMessage = () => {
    socket.off("receive-message").on("receive-message",(data)=>{
   
      appendMessage(data.message,"incoming-messsages");
    },[socket]);
  }

  useEffect(()=>{
    joinRoom();
    receiveMessage();
  },[privateRoomKey]);

  return (
    <div className='message-component-module'>
      <Container className='message-component-container'>
        <div className='friend-data-container'>
            <img src={Chat} className="friend-pic" alt='friend-pic'/>
            <Typography className='friend-message-name'>Arham</Typography>
        </div>
        <Container className='messages-data' id='message-area'>
        </Container>
        <Container className='message-send'>


          <Input className='type-messages' placeholder='Type Something' onChange={onChangeMessage} disableUnderline={true} autoFocus= {true}>

          </Input>
          <Button variant="contained" className='send-btn' endIcon={<SendIcon />} onClick={sendMessage}>
            Send
          </Button>
        </Container>
      </Container>
    </div>
  )
}

export default Message