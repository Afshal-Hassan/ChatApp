import { Container, Input, Modal, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import "./Message.css";
import {  useSelector } from 'react-redux';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import EmojiPicker from 'emoji-picker-react';
import { Box } from '@mui/system';
import ImageIcon from '@mui/icons-material/Image';
import MessageService from '../../services/MessagesService';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import  { Link, useHistory,Redirect }  from "react-router-dom"
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';

import MessageHeader from './MessageHeader';

const socket=io(`${process.env.REACT_APP_BASE_URL}`)



function Message() {
  let isReloaded= JSON.parse(localStorage.getItem("isReloaded"));
  const commands = [
    {
      command:["Go to *","Open for *","I want a *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ]

  const[redirectUrl, setRedirectUrl] = useState("");
  const navigate = useHistory();
  const { transcript } = useSpeechRecognition({commands});


  const [getMessages] = MessageService();
   const scrollRef = useRef();
  const messageComponentHeading = useSelector((state) => state.changeTheMessageComponentHeaderReducer);
  const  privateRoomKey = useSelector((state) => state.changeThePrivateRoomKey);
  const senderAndReciverData = useSelector((state) => state.senderAndReceiverReducer);
  const[message,setMessage]=useState("");
  const[emojiPicker,setEmojiPicker] = useState(false);
  const [messagesData ,setMessagesData] = useState([]);
  const[arrivalMessage,setArrivalMessage] = useState(null);
  const[emojiModelOpen,setEmojiModalOpen] = useState(false);




const pages = ["home","videocall","facebook"];

const urls = {
  home: "/" ,
  videocall:"/video"
}


  if(redirectUrl){

      let redirect= redirectUrl.slice(0,-1);
      redirect =  redirect.replace(/\s/g, '');
      if(pages.includes(redirect)){
        navigate.push(`${urls[redirect]}`)
      }else{
       console.log("Page Not Found");
      }
      
    
  }
  

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  }

  const modalEmojiOpener = () => {
    setEmojiModalOpen(true);
  }
  const modalEmojiCloser = () => {
    setEmojiPicker(false);
   setEmojiModalOpen(false);
  }
  
  const onEmojiClick = (emojiObject,event) => {
    console.log(emojiObject);
    setMessage(prevInput => prevInput + emojiObject.emoji);
    
    setEmojiPicker(false);
    setEmojiModalOpen(false);
  }
  const joinRoom = async() => {
    if(privateRoomKey.roomId != 0){
      socket.emit("join-room",privateRoomKey.roomId);
      const messagesResponse = await getMessages(senderAndReciverData.sender,senderAndReciverData.receiver);
      setMessagesData(messagesResponse);
      
    }
  }

  const sendMessageByEnter = (event) => {
    if(event.key === "Enter"){
      sendMessage();
    }
  }

 const chooseFile = (event) => {
  const file = event.target.files[0];

  var fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  
  fileReader.onload = () => {
   console.log(fileReader.result);
  }
  
 }

  const sendMessage= ()=>{
    if(message.includes('http')){
      setMessagesData([...messagesData,{email:senderAndReciverData.sender, messages:message}]);
      socket.emit("send-message",{message:message , room:privateRoomKey.roomId});
    
    }else{
      setMessagesData([...messagesData,{email:senderAndReciverData.sender, messages:message}]);
      socket.emit("send-message",{message:message , room:privateRoomKey.roomId ,messageSender:senderAndReciverData.sender, messageReceiver:senderAndReciverData.receiver});
    }

  }


  const receiveMessage = () => {
    socket.off("receive-message").on("receive-message",(data)=>{
      if(data.message.includes("http")){
        setArrivalMessage({email:senderAndReciverData.receiver, messages:data.message});
      }else{
        setArrivalMessage({email:senderAndReciverData.receiver, messages:data.message});
      }
     
    },[socket]);
  }

  useEffect(()=>{
    joinRoom();
    receiveMessage();
  },[privateRoomKey]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});
     document.getElementById('message-area').scrollTop = document.getElementById('message-area').scrollHeight;
  },[messagesData])

  useEffect(()=>{
    arrivalMessage && setMessagesData([...messagesData,arrivalMessage])
  },[arrivalMessage]);

  useEffect(()=>{
      if(isReloaded === false){
        window.location.reload();
        console.log("YES");
        localStorage.setItem("isReloaded",JSON.stringify(true));
      }
  })

  return (
    <div className='message-component-module'>
      <Container className='message-component-container'>
       <MessageHeader/>
        <Container className='messages-data' id='message-area'>
          {messagesData && messagesData.map((m,i) =>  m.email === senderAndReciverData.sender  ?  !m.messages.includes("jpeg") ? (<div className='outgoing-messsages' key={i}>{m.messages}</div>) :(<img src={m.messages} key={i} className="outgoing-images"/>) : !m.messages.includes('jpeg') ? (<div className='incoming-messsages' key={i}>{m.messages}</div>) :  (<img src={m.messages} key={i} className="incoming-images"/>)
          )}
        </Container>
        <Container className='message-send'>
        
          <Input className='type-messages' value={message} placeholder='Type Something' onChange={onChangeMessage} disableUnderline={true} autoFocus= {true} onKeyUp={sendMessageByEnter} />
          <label htmlFor='image-upload'><ImageIcon id='image-upload-icon'/></label>
          <input type='file' id='image-upload' onChange={chooseFile} accept="image/png, image/jpeg,.txt,.doc"/>
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
          <Link to="/video"><PersonalVideoIcon className="video-icon"/></Link>
          <MicIcon onClick={SpeechRecognition.startListening} className="voice-recog-icon"/>
          <SendIcon className='send-btn'  onClick={sendMessage}/> 
        </Container>
      </Container>
    </div>
  )
}

export default Message