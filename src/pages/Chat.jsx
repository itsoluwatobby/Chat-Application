import styled from 'styled-components'
import { AddNewConversation } from '../components/chat/AddNewConversation'
import { GroupConvo } from '../components/chat/GroupConvo'
import { ChatPage } from '../components/chat/ChatPage';
import { Left } from '../components/Left';
import { Main } from '../components/Main';
import { useChatContext } from '../hooks/useChatContext';
import { useGetOthers } from '../hooks/useGetOthers';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { axiosAuth } from '../app/axiosAuth';

let socket

export const Chat = () => {
  const { 
    click, open, loggedIn, searchUsers, setCurrentUser, conversation, num } = useChatContext();
  const currentUserId = localStorage.getItem('userId');
  const [result] = useGetOthers(currentUserId)
  const [conversationIds, setConversationIds] = useState([]);
  const [filteredUserSearch, setFilteredUserSearch] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const controller = new AbortController()
    const getUser = async() => {
      try{
        const res = await axiosAuth.get(`/${currentUserId}`, {
          signal: controller.signal
        })
        setCurrentUser(res?.data)
      }catch(error){
        let errorMessage;
        error?.response?.status === 400 ? errorMessage = 'userId required' :
        error?.response?.status === 404 ? errorMessage = 'user not found' :
        error?.response?.status === 500 ? errorMessage = 'internal error' : 
        errorMessage = 'no server response'
      }
    }
    currentUserId && getUser()

    return () => controller.abort()
  }, [conversation])

  useEffect(() => {
    if(currentUserId) {
      socket = io.connect('http://localhost:5000')
    }
  }, [currentUserId])

  useEffect(() => {
    socket.emit('create', 'chat_application')
  }, [])
  
  useEffect(() => {
    let isMounted = true
    let controller = new AbortController();

    const getConversationIds = async() => {
    try{
        const res = await axiosAuth.get(`/user_conversation/${currentUserId}`, {
          signal: controller.signal
        })
        const filteredUsers = await res?.data && Array.isArray(result) && result?.filter(user => !res?.data?.includes(user?._id))
        filteredUsers && setConversationIds(filteredUsers)
      }catch(error) {
        console.log(error)
      }
    }
    getConversationIds()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [num, loggedIn, conversation.length])

  useEffect(() => {
    const filteredSearch = conversationIds && conversationIds.filter(user => (user.username).toLowerCase().includes(searchUsers.toLowerCase()))
    setFilteredUserSearch(filteredSearch)
  }, [conversationIds, conversation.length ,searchUsers])

  return (
    <ChatApp>
      <Left />
      {
        socket && 
          <Main 
            socket={socket} inputRef={inputRef}
          />
      }
      {
        socket && 
          <ChatPage 
            result={result} socket={socket} 
            inputRef={inputRef}
          />
      }
      {
        click && 
          <AddNewConversation 
          filteredUserSearch={filteredUserSearch} socket={socket} 
            conversationIds={conversationIds}
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
