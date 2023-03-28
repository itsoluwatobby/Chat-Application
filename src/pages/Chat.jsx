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
import { axiosAuth, GLOBAL_URL, LOCAL_URL } from '../app/axiosAuth';
import { MessagePrompt } from '../components/chat/MessagePrompt';
import { LoggedInUserProfile } from '../components/chat/head/profile/LoggedInUser/LoggedInUserProfile';

let socket;

export const Chat = () => {
  const { 
    click, chatId, open, searchUsers, currentUser, setUserGroupConvos, setCurrentUser, conversation, 
    num, updated } = useChatContext();
  const currentUserId = localStorage.getItem('userId');
  const [result, users] = useGetOthers(currentUserId)
  const [conversationIds, setConversationIds] = useState([]);
  const [filteredUserSearch, setFilteredUserSearch] = useState([]);
  const inputRef = useRef();
  const [refetch, setRefetch] = useState(1);
  const [confirmGroupName, setConfirmGroupName] = useState(true);
  const [addedConversation, setAddedConversation] = useState(undefined);
  const [messageLoading, setMessageLoading] = useState(null);

  const loadMessages = () => setMessageLoading(prev => prev + 2)

  useEffect(() => {
    const controller = new AbortController()
    const getGroup = async() => {
      try{
        const {data} = await axiosAuth.get(`/user_group_conversations/${currentUserId}`, { signal: controller.signal })
        setUserGroupConvos([...data])
      }
      catch(error){
        console.log(error.message)
      }
    }
    getGroup()
    return () => controller.abort()
  }, [currentUser?._id, conversation])

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
  }, [conversation, updated])

  useEffect(() => {
    if(currentUserId) {
      socket = io.connect(GLOBAL_URL)
      //LOCAL_URL
    }
  }, [currentUserId])
//room:'itsoluwatobby' 
  useEffect(() => {
    socket.emit('conversation', { room: 'itsoluwatobby' })
  }, [currentUser?._id])

  
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
  }, [num, currentUser, conversation])

  useEffect(() => {
    const filteredSearch = conversationIds && conversationIds.filter(user => (user.username).toLowerCase().includes(searchUsers.toLowerCase()))
    setFilteredUserSearch(filteredSearch)
  }, [conversationIds, click, conversation, searchUsers])

  return (
    <ChatApp>
      <Left />
      {
        socket && 
          <Main 
            socket={socket} inputRef={inputRef}
            addedConversation={addedConversation}
            loadMessages={loadMessages}
          />
      }
      {
        socket && 
          <ChatPage 
            result={result} socket={socket} 
            inputRef={inputRef} allUsers={users}
            messageLoading={messageLoading} 
            setMessageLoading={setMessageLoading}
          />
      }
      {!confirmGroupName &&
        <MessagePrompt 
          setConfirmGroupName={setConfirmGroupName} 
        />
      }
        <LoggedInUserProfile
            socket={socket} 
        />
      {
        click && 
          <AddNewConversation 
          filteredUserSearch={filteredUserSearch} socket={socket} 
            conversationIds={conversationIds} result={result}
            setAddedConversation={setAddedConversation}
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
