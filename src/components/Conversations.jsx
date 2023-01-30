import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg';
import {MdMoreHoriz} from 'react-icons/md';
import {format, sub, parseISO, subYears} from 'date-fns';
import { useChatContext } from '../hooks/useChatContext';
import { axiosAuth } from '../app/axiosAuth';
import { BiRefresh } from 'react-icons/bi';

export const Conversations = ({ user, socket }) => {
  const {
    setClick, setOpen, setChatId, messages, typingEvent, conversation, refresh, currentUser, setConversation, formatDate, chatId, customAdminMessage
  } = useChatContext()
  const [reveal, setReveal] = useState(false);
  const currentUserId = localStorage.getItem('userId');
  const [error, setError] = useState(null);
  const [deletedConvo, setDeletedConvo] = useState([]);

  const deleteConversation = async(initial) => {
    try{
      const otherConversations = conversation.filter(user => user?._id !== initial?._id)
      !initial?.groupName ? 
          await axiosAuth.delete(`/conversation/delete/${initial?.convoId}/${currentUserId}`)
          : await axiosAuth.delete(`/group_conversation/delete/${currentUserId}/${initial?.convoId}`)
      socket.emit('delete_conversation', { convo: [...otherConversations], room: 'itsoluwatobby' })
      setConversation([...otherConversations])
      setChatId({})
    }
    catch(error){
      let errorMessage;
      !error?.response ? errorMessage = 'no server response' : 
      error?.response?.status === 400 ? errorMessage = 'id required' :
      error?.response?.status === 404 ? errorMessage = 'No conversations, start a new conversation' :
      error?.response?.status === 500 ? errorMessage = 'internal error' : ''
      setError(errorMessage)
    }
  }

  useEffect(() => {
    socket.on('newDel_conversation', data => setDeletedConvo([...data]))
  }, [conversation])

  useEffect(() => {
    if(!deletedConvo?.length) return
    if(deletedConvo?.userId === currentUser?._id){
      setConversation([...deletedConvo])
    }
  }, [deletedConvo])
//   const options = { day: 'short', month: 'numeric' }
//  const date = new Intl.DateTimeFormat('en-US')

  return (
    <Conversation
    className='convo_style'
      title='Double Tap to Delete Conversation'
      onDoubleClick={() => setReveal(true)}
      onClick={() => {
        setError('')
        setClick(false)
        setOpen(false)
      }}
    >
      {user?.groupName ? 
        user?.groupAvatar ? <img src={user?.groupAvatar} alt={user?.groupName} 
        className='profile-picture'/> : <CgProfile className='pics'/>
        : 
        user?.profilePicture ? <img src={user?.profilePicture} alt={user?.username} 
            className='profile-picture'/> : <CgProfile className='pics'/>
        //<CgProfile className='pics'/>
      }
        <div className='detail'>
          {error && <span>{error}</span>}
          <p className='top'>
            <span>{
              !user?.groupName 
                ? user?.username 
                : user?.groupName.length >= 14 
                    ? user?.groupName.slice(0, 13)+'...' : user?.groupName}</span>
            {
              !user?.groupName &&(
                user?.status !== 'online' ?
                <span className='date'>
                  {user?.lastSeen ? 
                    format(parseISO(user?.lastSeen), 'd/yy')  
                      : 
                    format(new Date(), 'd/yy')}
                </span>
                  :
                <span className='status'>online</span>
              )
            }
          </p>
          {user?.groupName &&
            (
              !(customAdminMessage?.groupName === user?.groupName) ?
              <div className="members">
                {user?.members.length} members
              </div>
              :
              <div className="members">{customAdminMessage?.message}</div>
            )
              // :
              // conversation.map(con => (
              //   con?._id === userLastMessage?.senderId && <p key={con?._id}>{userLastMessage?.text}</p>
              // ))
          }
          {/* {(typingEvent && chatId?.userId === user?._id) && <p className='base'>{typingEvent}</p>} */}
          {user?.lastMessage && <p className='base'>{user?.lastMessage?.text?.slice(0, 15)}...</p>}
        </div>
        {
          reveal && 
          <button
            onMouseLeave={() => setReveal(false)}
            onClick={() => deleteConversation(user)}
          >Remove</button>
        }
        {/* <MdMoreHoriz 
          onMouseEnter={() => setReveal(true)}
          onMouseLeave={() => setReveal(false)}
          className='more'
        /> */}
        {user?.groupName && <p className='date'>{format(parseISO(user?.createdAt), 'd/yy')}</p>}
    </Conversation>
  )
}

const Conversation = styled.div`
display: flex;
align-items: center;
gap: 0.6rem;
padding: 0.4rem 0.3rem;
border-radius: 5px;
z-index: 1;
cursor: default;
position: relative;

.more{
  position: absolute;
  right: 0.5rem;
  top: 0;
  font-size: 24px;
  cursor: pointer;
}

button{
  position: absolute;
  right: 0.5rem;
  top: 0.9rem;
  border-radius: 5px;
  border: none;
  background-color: gray;
  padding: 4px;
  cursor: pointer;
  z-index: 60;

  &:hover{
    background-color: lightgray;
  }
}

  .pics{
    font-size: 3.2rem;
    color: gray;
  }

  .profile-picture{
    width: 2.9rem;
    flex-grow: none;
    height: 2.9rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
  }

  .detail{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex-grow: 8;

    .top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .date{
        color: lightgray;
        font-size: 13px;
      }

      .status{
        color: lightgreen;
      }
    }

    .base{
      color: gray;
    }

    .members{
      font-size: 13px;
      color: rgba(255,255,230,0.5);
    }
  }

  .date{
    color: lightgray;
    font-size: 13px;
    align-self: flex-start;
  }

  &:hover{
    background-color: rgba(0,0,0,0.2);
  }
`