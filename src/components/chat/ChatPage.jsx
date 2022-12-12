import { useChatContext } from '../../hooks/useChatContext';
import styled from 'styled-components'
import { ChatHeading } from './ChatHeading'
import {useSelector, useDispatch} from 'react-redux'
import { getAllUsers, getCurrentUser} from '../../features/authSlice';
import { EmptyChat } from '../EmptyChat';
import { ChatBody } from './ChatBody';
import { ChatBase } from './ChatBase';
import { useEffect, useRef } from 'react';
import {io} from 'socket.io-client'
import { createConversation, getConversation, selectConversation } from '../../features/messageSlice';

let socket;

export const ChatPage = () => {
  const {chatId, setMessages, setClick, messageBody, setMessageBody, setMessage, message, setResponse} = useChatContext()
  //const targetUser = useSelector(state => getSingleUser(state, chatId));
  const messageRef = useRef();
  const currentUser = useSelector(getCurrentUser)
  const currentConvo = useSelector(selectConversation)
  const dispatch = useDispatch()

  useEffect(() => {
    if(currentUser) socket = io('http://localhost:5000')
  }, [currentUser])

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [])

  //CREATE A CONVERSATION
  // useEffect(() => {
  //   let isMounted = true

  //   const getConversation = async() => {
  //     const newConversation = {userId: currentUser?._id, friendId: chatId}
  //     try{
  //       await dispatch(createConversation(newConversation))
  //     }catch(error){
  //       console.log(error)
  //     }
  //   }
  //   chatId && getConversation()

  //   return () => isMounted = false

  // }, [chatId])

  // useEffect(() => {
  //   let isMounted = true
  //   const fetchConversation = async() => {
  //     try{
  //       await dispatch(getConversation())
  //     }catch(error){
  //       console.log(error)
  //     }
  //   }
  //   fetchConversation()

  //   return () => isMounted = false

  // }, [chatId])
  
  // useEffect(() => {
  //   if(chatId && currentConvo){
  //     socket.on('connect', () => {
  //       socket.emit('start-conversation', currentConvo?._id, (res) => {
  //         setResponse(res)
  //       })
        
  //       socket.on('disconnect', () => {
  //         console.log('user left')
  //       })
  //     })
  //   }else return
  // }, [currentConvo])

    useEffect(() => {
      let isMounted = true
      const fetchUsers = async() => {
        try{
          isMounted && await dispatch(getAllUsers()).unwrap()
        }catch(error){
          console.log(error)
        }
      }
      fetchUsers()
  
      return () => isMounted = false
  
    }, [currentUser])

  //receive message
  useEffect(() => {
    let isMounted = true
    if(isMounted){
      socket.on('newMessage', data => {
        setMessages(prev => [...prev, data])
      })
    }else return
    return () => isMounted = false
  }, [messageBody])

  const sendMessage = () => {
    const newMessage = { senderId: currentUser._id, username: currentUser.username, text: message }
    socket.emit('create-message', newMessage)
    setMessageBody(newMessage)
    setMessage('')
    console.log(messageBody)
  }

  // //, (res) => {
  //   setResponse(res)
  // }

  return (
    <ChatMessage onClick={() => setClick(false)}>
      {chatId ?
        <>
          <ChatHeading user={targetUser || 'no'}/>
          <ChatBody />
          <ChatBase messageRef={messageRef} sendMessage={sendMessage}/>
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
overflow-y: scroll;
overflow-x: hidden;

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
`
