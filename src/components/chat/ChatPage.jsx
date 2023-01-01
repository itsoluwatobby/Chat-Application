import { useChatContext } from '../../hooks/useChatContext';
import styled from 'styled-components'
import { ChatHeading } from './ChatHeading'
import { EmptyChat } from '../EmptyChat';
import { ChatBody } from './ChatBody';
import { ChatBase } from './ChatBase';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {format} from 'date-fns';
import { axiosAuth } from '../../app/axiosAuth';

let socket;

export const ChatPage = () => {
  const {chatId, setMessages,messages, setClick, setOpen, result, setMessage, message, currentUser, setResponse} = useChatContext()
  const currentUserId = localStorage.getItem('userId') || ''
  const [targetUser, setTargetUser] = useState({});
  const [error, setError] = useState(null)

  useEffect(() => {
    if(currentUserId) socket = io.connect('http://localhost:5000')
  }, [currentUserId])

  useEffect(() => {
    const foundUser = result.find(user => user._id === chatId.userId)
    setTargetUser(foundUser)
  }, [chatId.userId])

  useEffect(() => {
    socket.emit('start-conversation', chatId?.convoId)
  }, [chatId])

  const createMessage = async(initialState) => {
    console.log({initialState})
    try{
      const messages = await axiosAuth.post('/createMessage', initialState)
      return messages.data
    }catch(error) {
      let errorMessage;
      error.response.status === 500 ? errorMessage = 'internal error' : 
      errorMessage = 'no server response'
      setError(errorMessage)
    }
  }

  //receive message
  useEffect(() => {
      socket.on('newMessage', (data) => { 
        setMessages(data)
      })
  }, [])
  
  const sendMessage = async() => {
    const newMessage = { 
      conversationId: chatId?.convoId,
      senderId: currentUserId, username: currentUser?.username, 
      text: message, dateTime: format(new Date(), 'p')
    }
    await socket.emit('create-message', [...messages, newMessage])
    await createMessage(newMessage)
    setMessage('')
  }

  return (
    <ChatMessage onClick={() => {
      setClick(false)
      setOpen(false)
      }}>
      {chatId?.userId ?
        <>
          <ChatHeading user={targetUser} socket={socket}/>
          <ChatBody socket={socket}/>
          <ChatBase sendMessage={sendMessage} socket={socket}/>
        </>
        :
        <EmptyChat />
      }
    </ChatMessage>
  )
}

const ChatMessage = styled.div`
height: 100%;
flex-grow: 6;
display: flex;
flex-direction: column;
background-color: #333333;
justify-content: space-between;
padding: 0;
align-items: center;
overflow: hidden;

  @media (max-width: 468px){
    flex-grow: 7;
  }

  &::-webkit-scrollbar{
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
  }

  // @media (max-width: 908px){
  //   flex-grow: none;
  //   min-width: 450px;
  // }

  // @media (max-width: 468px){
  //   flex-grow: none;
  //   max-width: 150px;
  // }
`
