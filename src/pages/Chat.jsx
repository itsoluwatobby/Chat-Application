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

let socket

export const Chat = () => {
  const { 
    click, open, loggedIn, searchUsers, currentUser, setCurrentUser, conversation, 
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

  const isMessageRead = async(msgId) => {
    const msgRes = await axiosAuth.put(`/message_read/${msgId}`)
    return msgRes?.data
  }

  const isMessageDelivered = async(msgId) => {
    const msgDel = await axiosAuth.put(`/message_delivered/${msgId}`)
    return msgDel?.data
  }

  const reload = () => setRefetch(prev => prev+1)

  const isMessageDeleted = async(msgId) => {
    await axiosAuth.delete(`/messages_delete`, {

    })
  }
  
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
            inputRef={inputRef} allUsers={users}
            isMessageDeleted={isMessageDeleted}
            isMessageDelivered={isMessageDelivered}
            isMessageRead={isMessageRead}
          />
      }
      {!confirmGroupName &&
        <MessagePrompt 
          setConfirmGroupName={setConfirmGroupName} 
        />
      }
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
