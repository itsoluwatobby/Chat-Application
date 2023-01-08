import styled from 'styled-components'
import { AddNewConversation } from '../components/chat/AddNewConversation'
import { GroupConvo } from '../components/chat/GroupConvo'
import { ChatPage } from '../components/chat/ChatPage';
import { Left } from '../components/Left';
import { Main } from '../components/Main';
import { useChatContext } from '../hooks/useChatContext';
import { useGetOthers } from '../hooks/useGetOthers';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket

export const Chat = () => {
  const {click, open} = useChatContext();
  const currentUserId = localStorage.getItem('userId');
  const [result] = useGetOthers(currentUserId)

  useEffect(() => {
    if(currentUserId) {
      socket = io.connect('http://localhost:5000')
    }
  }, [currentUserId])
     
  return (
    <ChatApp>
      <Left />
      {
        socket && 
          <Main 
            socket={socket} 
          />
      }
      {
        socket && 
          <ChatPage 
            result={result} socket={socket} 
          />
      }
      {
        click && 
          <AddNewConversation 
            result={result} socket={socket} 
          /> 
            || 
        open && 
          <GroupConvo 
            socket={socket} result={result}
          /> 
      }
    </ChatApp>
  )
}
//add group convo

const ChatApp = styled.div`
height: 100vh;
width: 100vw;
display: flex;
padding: 0.5rem;
align-items: center;
position: relative;
  
`
