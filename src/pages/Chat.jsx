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
import { MessagePrompt } from '../components/chat/MessagePrompt';
import { LoggedInUserProfile } from '../components/chat/head/profile/LoggedInUser/LoggedInUserProfile';

let socket

export const Chat = () => {
  const { 
    click, chatId, open, loggedIn, setGroup, searchUsers, currentUser, setCurrentUser, conversation, 
    num } = useChatContext();
  const currentUserId = localStorage.getItem('userId');
  const [result, users] = useGetOthers(currentUserId)
  const [conversationIds, setConversationIds] = useState([]);
  const [filteredUserSearch, setFilteredUserSearch] = useState([]);
  const inputRef = useRef();
  const [refetch, setRefetch] = useState(1);
  const [confirmGroupName, setConfirmGroupName] = useState(true);

  useEffect(() => {
    const controller = new AbortController()
    const getUser = async() => {
      try{
        const res = await axiosAuth.get(`/${currentUserId}`, {
          signal: controller.signal
        })
        setCurrentUser(res?.data)
        // socket.emit('conversation', res?.data)
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
    socket.emit('conversation', 'itsoluwatobby')
  }, [currentUser])

  
  const reload = () => setRefetch(prev => prev+1)
  
  useEffect(() => {
    let controller = new AbortController();

    const getConversationIds = async() => {
    try{
        const res = await axiosAuth.get(`/user_conversation/${currentUserId}`, {
          signal: controller.signal
        })
        const filteredUsers = await res?.data && Array.isArray(result) && result?.filter(user => !res?.data?.includes(user?._id))
        filteredUsers && setConversationIds(filteredUsers)
      }catch(error) {
        console.log(error.message)
      }
    }
    getConversationIds()

    return () => controller.abort()
  }, [num, currentUser, conversation.length])

  useEffect(() => {
    const filteredSearch = conversationIds && conversationIds.filter(user => (user.username).toLowerCase().includes(searchUsers.toLowerCase()))
    setFilteredUserSearch(filteredSearch)
  }, [conversationIds, click, conversation ,searchUsers])

  useEffect(() => {
    const controller = new AbortController()
    if(!chatId?.groupName) return
    const getGroup = async() => {
      const {data} = await axiosAuth(`/group_conversation/${chatId?.convoId}`, { signal: controller.signal })
      setGroup(data)
    }
    getGroup()
    return () => controller.abort()
  }, [chatId?.groupName])

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
            inputRef={inputRef} allUsers={users}
          />
      }
      {!confirmGroupName &&
        <MessagePrompt 
          setConfirmGroupName={setConfirmGroupName} 
        />
      }
        <LoggedInUserProfile loggedIn
            loggedInUser={currentUser} 
            socket={socket} 
        />
      {
        click && 
          <AddNewConversation 
          filteredUserSearch={filteredUserSearch} socket={socket} 
            conversationIds={conversationIds} result={result}
          /> 
            || 
        open && 
          <GroupConvo 
            socket={socket} result={result}
            setConfirmGroupName={setConfirmGroupName}
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
