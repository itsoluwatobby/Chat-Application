import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { axiosAuth } from '../../app/axiosAuth';
import { useChatContext } from '../../hooks/useChatContext';
import LoadingEffect from '../../assest/Eclipse-1s-118px.svg';
import { Messages } from './Messages';
import {BsLock} from 'react-icons/bs'

export const ChatBody = ({ socket, inputRef, otherUsers, messageLoading, setMessageLoading }) => {
  const { 
    messages, setMessages, chatId, setEmojiOpen, currentUser, welcomeMessage, num, isChatOpened, setReference, openGroupProfile, setOpenGroupProfile, conversation, setNewGroup, openUserProfile, setOpenUserProfile, reload, setReload, reloadAll, setReloadAll, userGroupConvos
   } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatViewed, setChatViewed] = useState(false)
  const [targetConvo, setTargetConvo] = useState({});
  const [isCurrentChat, setIsCurrentChat] = useState(false);
  //const [isCurrentChatMessage, setIsCurrentChatMessage] = useState({});
  const [addedUsersInGroup, setAddedUsersInGroup] = useState([]);
  const [currentGroup, setCurrentGroup] = useState([]);

  useEffect(() => {
    if(!chatId?.groupName) return
    const groupCon = userGroupConvos?.find(singleGroup => singleGroup?._id === chatId?.convoId)
    setCurrentGroup(groupCon)
    groupCon && setAddedUsersInGroup(() => {
      return otherUsers.filter(user => groupCon?.members.includes(user?._id))
    })
  }, [chatId?.groupName])
  
  const messageRef = useCallback(node => {
    node && node.scrollIntoView({ smooth: true })
  }, []);

  useEffect(() => {
    let isMounted = true
    socket.on('isOpened', bool => {
      isMounted && setChatViewed(bool)
    })
    return () => isMounted = false
  }, [])

  useEffect(() => {
    let isMounted = true
    socket.on('isClosed', bool => {
      isMounted && setChatViewed(bool)
    })
    return () => isMounted = false
  }, [])

  useEffect(() => {
    //console.log({chatViewed})
  }, [isChatOpened])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController();
    setLoading(true)
    const fetchMessages = async() => {
      try{
        const { data } = await axiosAuth.get(`/messages/${chatId?.convoId}`, {
          signal: controller.signal
        })
        // if(data[data?.length - 1]?.senderId === currentUser?._id || data[data?.length - 1]?.receiverId === currentUser?._id){
          isMounted && setMessages([...data])
          reloadAll == 2 && socket.emit('reload_message', { conversationId: data[data?.length - 1]?.conversationId, data: data })
          setReloadAll(null)
          setMessageLoading(null)
        //}
      }catch(error) {
        let errorMessage;
        error?.response?.status === 404 ? errorMessage = 'Say hello to start a conversation' :
        error?.response?.status === 500 ? errorMessage = 'internal error' : 
        errorMessage = 'no server response'
        setError(errorMessage)
      }finally{
        setLoading(false)
      }
    }
    fetchMessages()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [chatId?.convoId, num, reload, reloadAll, messageLoading])

  useEffect(() => {
    setTargetConvo({})
    let isMounted = true
    const controller = new AbortController();
    const getConversation = async() => {
      try{
        const {data} = chatId?.groupName 
            ? await axiosAuth(`/group_conversation/${chatId?.convoId}`, { signal: controller.signal })
              : await axiosAuth(`/conversation/${chatId?.convoId}`, { signal: controller.signal })
        isMounted && setTargetConvo({...data})
      }
      catch(error){
        setTargetConvo({})
        console.error(error.message)
      }
    }
    getConversation()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [chatId?.convoId])

  const closeCompos = () => {
    setEmojiOpen(false)
    openGroupProfile && setOpenGroupProfile(false)
    openUserProfile && setOpenUserProfile(false)
    setNewGroup([])
  }

  //console.log(isCurrentChat)
  const referenceMessage = (message) => {
    inputRef?.current.focus()
    setReference(message)
  }

  const groupWelcomeMessage = (
    <section>
      <p className='top'>
        <BsLock className='lock'/>
        <span>
          Messages and calls are end-to-end encrypted. 
          No one outside of this chat, not even Itsoluwatobby, can read or listen to them.Select to learn more.
        </span>
      </p>
      <p>
        {currentGroup?.adminId === currentUser?._id ? 'You' : 'Admin'} created group &#8220;{chatId?.groupName}&#8221;
      </p>
      {
        addedUsersInGroup && 
          addedUsersInGroup.map(newUser => (
            <p key={newUser?._id} className='format'>{
              currentGroup?.adminId === currentUser?._id ? 'You' : 'Admin'} added {newUser?.username}
            </p>
          ))
      }
    </section>
  )

  const messageContent = (
            <>
              {
                messages?.map(message =>  
                  (
                    <article 
                      onDoubleClick={() => referenceMessage(message)}
                      ref={messageRef}
                      className={message?.senderId === currentUser?._id ? 'owner' : 'friend'} 
                      key={message?._id}>
                        <Messages message={message} />
                      {/* {chatViewed && <span>user viewed your chat</span>} */}
                    </article>
                  )  
                )
              }
            </>
          )

  return (
    <ChatBodyComponent onClick={closeCompos}>
      {chatId?.groupName && (!addedUsersInGroup ? <p>loading...</p> : groupWelcomeMessage)}
      {
        (messages?.length || (
          welcomeMessage && chatId?.groupName
          )) ? messageContent 
          :
            <p className='start'>
              {loading ? 
                <img src={LoadingEffect} alt="loading messages..." className='loading_effect'/>
                : 
                <span className='start_convo'>Start a conversation</span>
              }
            </p> 
      }
    </ChatBodyComponent>
  )
}

const ChatBodyComponent = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
gap: 0.3rem;
padding: 0.5rem 0.4rem;
overflow-y: scroll;
overflow-x: hidden;
position: relative;

.start{
  margin: auto;
  font-family: cursive;
  word-spacing: 5px;
  letter-spacing: 5px;
  color: gray;
  text-align: center;

    .loading{
      color: rgba(0,200,0,0.6);
    }

    .start_convo{

    }
  }

  .group_message{
    color: gray;
    font-size: 15px;
    text-align: center;
    font-family: mono-space;
    letter-spacing: 5px;
  }

  .owner{
    background-color: rgba(0,200,0,0.2);
    align-self: flex-end;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.2);

    span{
      font-size: 13px;
      color: lightgray;
      text-align: right;
    }

    @media (max-width: 768px){
      .message_extract{
        top: -5rem;
        right: 6.5rem;
      }
    }

    @media (min-width: 768px){
      .message_extract{
        top: -5rem;
        right: 11rem;
      }
    }

    @media (min-width: 1080px){
      .message_extract{
        top: -5rem;
        right: 16rem;
      }
    }

    @media (min-width: 1240px){
      .message_extract{
        top: -5rem;
        right: 22rem;
      }
    }
  }

  .friend{
    background-color: rgba(0,0,0,0.3);
    align-self: flex-start;
    text-align: left;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.25);

    span{
      font-size: 13px;
      color: lightgray;
      text-align: left;
    }

    @media (max-width: 768px){
      .message_extract{
        top: -5rem;
        left: 6.5rem;
      }
    }

    @media (min-width: 768px){
      .message_extract{
        top: -5rem;
        left: 11rem;
      }
    }

    @media (min-width: 1080px){
      .message_extract{
        top: -5rem;
        left: 16rem;
      }
    }

    @media (min-width: 1240px){
      .message_extract{
        top: -5rem;
        left: 22rem;
      }
    }
  }

  article{
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 40%;
    gap: 0.15rem;
    font-size: 13px;
    border-radius: 10px;
    padding: 0.2rem 0.28rem 0.1rem 0.3rem;
    cursor: default;
    position: relative;
  }

  section{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
    letter-spacing: 1px;
    word-spacing: 0;
    font-size: 12px;
    font-family: sans;

    .top{
      background-color: rgba(205,180,155,0.2);

      .lock{
        font-size: 13px;
        margin-right: 0.4rem;
      }
    }

    p{
      border-radius: 5px;
      background-color: rgba(205,205,220,0.1);
      color: rgba(255,255,255,0.65);
      word-break: pre-wrap;
      padding: 0.5rem;
      line-height: 1.2rem;
      max-width: 100%;
      text-align: center;
    }

    &:has(p) .format{
      padding: 0.35rem;
      font-style: italic;
      background-color: rgba(205,205,220,0.08);
    }
  }

  &::-webkit-scrollbar{
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
  }
`
