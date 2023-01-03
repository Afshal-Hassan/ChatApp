import { Container, Input, Modal, Typography } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import "./Message.css";
import Chat from "./Chat.png"
import { useDispatch, useSelector } from 'react-redux';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import EmojiPicker from 'emoji-picker-react';
import { Box } from '@mui/system';
import ImageIcon from '@mui/icons-material/Image';
import MessageService from '../../services/MessagesService';
import { changeTheLastAppendMessage } from "../../redux/actions/LastAppendMessageAction"



const socket=io(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}`)

function Message() {
  const [getMessages] = MessageService();
    const dispatch =useDispatch();
    const currentMessage = useSelector((state) => state.changeTheLastAppendMessage);
   
  const messageComponentHeading = useSelector((state) => state.changeTheMessageComponentHeaderReducer);
  const  privateRoomKey = useSelector((state) => state.changeThePrivateRoomKey);
  const senderAndReciverData = useSelector((state) => state.senderAndReceiverReducer);
  const[message,setMessage]=useState("");
  const[emojiPicker,setEmojiPicker] = useState(false);
  const [messagesData ,setMessagesData] = useState([]);
  const[emojiModelOpen,setEmojiModalOpen] = useState(false);

  const onChangeMessage = (event) => {
    setMessage(event.target.value)
  }

  const modalEmojiOpener = () => {
    setEmojiModalOpen(true);
  }
  const modalEmojiCloser = () => {
    setEmojiPicker(false);
   setEmojiModalOpen(false);
  }
  
  const onEmojiClick = (emojiObject,event) => {

    setMessage(prevInput => prevInput + emojiObject.emoji);
    
    setEmojiPicker(false);
    setEmojiModalOpen(false);
  }
  const joinRoom = async() => {
    if(privateRoomKey.roomId != 0){
      socket.emit("join-room",privateRoomKey.roomId);
      const messagesResponse = await getMessages(senderAndReciverData.sender,senderAndReciverData.receiver);
      console.log(messagesResponse);
      setMessagesData(messagesResponse);
    }
  }

  const appendMessage = (messages,messageType) => {
    console.log(currentMessage);
    if(messages.includes('http')){
      console.log("image here")
      let messageArea = document.getElementById('message-area');
      let img = document.createElement("img");
      img.src=messages
      img.classList.add(messageType);
      messages != "" ? messageArea.appendChild(img) : console.log(0);
      messageArea.scrollTop = messageArea.scrollHeight;  
    }
    else{
    let messageArea = document.getElementById('message-area');
    let outgoingMessageDiv = document.createElement("div");
    let className = messageType
    outgoingMessageDiv.classList.add(messageType);
    outgoingMessageDiv.innerHTML = messages;
    messages != "" ? messageArea.appendChild(outgoingMessageDiv) : console.log(0);
    messageArea.scrollTop = messageArea.scrollHeight;
    }
  }

  const sendMessageByEnter = (event) => {
    if(event.key === "Enter"){
      sendMessage();
    }
  }

 const chooseFile = (event) => {
  const file = event.target.files[0];
  const image = URL.createObjectURL(file);
  setMessage(image);
 }

  const sendMessage= ()=>{
    if(message.includes('http')){
      dispatch(changeTheLastAppendMessage(message));
      appendMessage(currentMessage.lastAppendMessage,"outgoing-images");
      setMessage("");
      socket.emit("send-message",{message:message , room:privateRoomKey.roomId});
    }else{
      dispatch(changeTheLastAppendMessage(message));
      appendMessage(currentMessage.lastAppendMessage,"outgoing-messsages");
      setMessage("");
      socket.emit("send-message",{message:message , room:privateRoomKey.roomId ,messageSender:senderAndReciverData.sender, messageReceiver:senderAndReciverData.receiver});
    }

  }

  const receiveMessage = () => {
    socket.off("receive-message").on("receive-message",(data)=>{
      if(data.message.includes("http")){
        appendMessage(data.message,"incoming-images");
      }else{
        appendMessage(data.message,"incoming-messsages");
      }
     
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
            <Typography className='friend-message-name'>{messageComponentHeading.messageHeading}</Typography>
        </div>
        <Container className='messages-data' id='message-area'>
          {messagesData && messagesData.map((m) =>  m.email == senderAndReciverData.sender ? (<div className='outgoing-messsages' key={m.message_id}>{m.messages}</div>) : (<div className='incoming-messsages' key={m.message_id}>{m.messages}</div>)
          )}
        </Container>
        <Container className='message-send'>
        
          <Input className='type-messages' value={message} placeholder='Type Something' onChange={onChangeMessage} disableUnderline={true} autoFocus= {true} onKeyUp={sendMessageByEnter}/>
          <label htmlFor='image-upload'><ImageIcon id='image-upload-icon'/></label>
          <input type='file' id='image-upload' onChange={chooseFile} accept="image/png, image/jpeg, .txt,.doc"/>
          <AddReactionIcon className='insert-emoji' onClick = {() => {
            setEmojiPicker(val => !val);
            modalEmojiOpener();   
          }}/>
          <Modal open={emojiModelOpen}>
            <div className='modal-box' onClick={modalEmojiCloser}>
            <Box>  
          {emojiPicker && <EmojiPicker
          emojiStyle='google'
          onEmojiClick={onEmojiClick}
          />}
            </Box>
            </div>
          </Modal>
          <SendIcon className='send-btn'  onClick={sendMessage}/> 
        </Container>
      </Container>
    </div>
  )
}

export default Message