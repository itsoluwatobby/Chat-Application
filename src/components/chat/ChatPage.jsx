import { useChatContext } from '../../hooks/useChatContext';
import styled from 'styled-components'
import { ChatHeading } from './head/ChatHeading'
import { EmptyChat } from '../EmptyChat';
import { ChatBody } from './ChatBody';
import { ChatBase } from './ChatBase';
import { useEffect, useState } from 'react';
import {format} from 'date-fns';
import { axiosAuth } from '../../app/axiosAuth';


export const ChatPage = ({ result, socket }) => {
  const { 
    chatId, setMessages,messages, setClick, setOpen, 
    setMessage, message, currentUser, setResponse, 
    counterRef, notification, setNotification, setIsChatOpened 
  } = useChatContext()
  const currentUserId = localStorage.getItem('userId') || ''
  const [targetUser, setTargetUser] = useState({});
  const [error, setError] = useState(null)

  useEffect(() => {
    if(chatId?.userId){
      const foundUser = result.length && result.find(user => user._id === chatId?.userId)
      setTargetUser(foundUser)
    }else return
  }, [chatId.convoId])

  useEffect(() => {
    socket.emit('start-conversation', chatId?.convoId)
  }, [chatId])

  const createMessage = async(initialState) => {
    try{
      await axiosAuth.post('/create_message', initialState)
    }catch(error) {
      let errorMessage;
      error.response.status === 500 ? errorMessage = 'internal error' : 
      errorMessage = 'no server response'
      setError(errorMessage)
    }
  }
//data[data.length - 1]?.senderId !== currentUser?._id ||
  //receive message
  useEffect(() => {
    let isMounted = true
      socket.on('newMessage', (data) => { 
        if(chatId?.convoId !== data[data.length - 1]?.conversationId) {
          isMounted && setNotification(prev => [...prev, {...data[data.length - 1], orderId: counterRef.current++}])
          setMessages(data)
        }
        else setMessages(data)
      })
      return () => isMounted = false
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
      {chatId?.convoId ?
        <>
          <ChatHeading 
            user={targetUser} 
            socket={socket} 
            result={result}
            setIsChatOpened={setIsChatOpened}
          />
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
