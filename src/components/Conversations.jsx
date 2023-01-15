import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg';
import {MdMoreHoriz} from 'react-icons/md';
import {format, sub} from 'date-fns';
import { useChatContext } from '../hooks/useChatContext';
import { axiosAuth } from '../app/axiosAuth';
import { BiRefresh } from 'react-icons/bi';

export const Conversations = ({ user, socket }) => {
  const {
    setClick, setOpen, setChatId, typingEvent, conversation, refresh, currentUser, setConversation, formatDate, chatId, customAdminMessage
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
      setDeletedConvo([...otherConversations])
      //setConversation([...otherConversations])
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
    if(!deletedConvo?.length) return
    let isMounted = true
    isMounted && socket.emit('conversation', {_id: chatId?.userId})
    isMounted && socket.emit('delete_conversation', {new: deletedConvo, myId: currentUser?._id, otherId: chatId?.userId})
    isMounted && socket.on('newDel_conversation', data => {
      setConversation([...data])
      setDeletedConvo([])
    })
    return () => isMounted = false
  })
  
  return (
    <Conversation
      onClick={() => {
        setError('')
        setClick(false)
        setOpen(false)
      }}
    >
      {!user?.groupName ? 
        user?.profilePicture ? <img src={user?.profilePicture} alt={user?.username} 
        className='profile-picture'/> : <CgProfile className='pics'/>
        : 
        // {/* user?.profilePicture ? <img src={user?.profilePicture} alt={user?.username} 
        //     className='profile-picture'/> : <CgProfile className='pics'/> */}
        <CgProfile className='pics'/>
      }
        <div className='detail'>
          {error && <span>{error}</span>}
          <p className='top'>
            <span>{user?.username || user?.groupName}</span>
            {
              !user?.groupName &&(
                user?.status !== 'online' ?
                <span className='date'>
                  {user?.lastSeen ? 
                    formatDate(user?.lastSeen) 
                      : 
                    formatDate(sub(new Date, {minutes: 0}).toISOString())}
                </span>
                  :
                <span className='status'>online</span>
              )
            }
          </p>
          {user?.groupName &&
            !(customAdminMessage?.groupName === user?.groupName) ?
              <div className="members">
                {user?.members.length} members
              </div>
              :
              <div className="members">{customAdminMessage?.message}</div>
          }
          {/* {(typingEvent && chatId?.userId === user?._id) && <p className='base'>{typingEvent}</p>} */}
          {/* <p className='base'>{user?.lastMessage.slice(0, 15)}...</p> */}
        </div>
        {
          reveal && 
          <button
            onMouseEnter={() => setReveal(true)}
            onMouseLeave={() => setReveal(false)}
            onClick={() => deleteConversation(user)}
          >Remove</button>
        }
        <MdMoreHoriz 
          onMouseEnter={() => setReveal(true)}
          onMouseLeave={() => setReveal(false)}
          className='more'
        />
        {user?.groupName && <p className='date'>{formatDate(user?.createdAt)}</p>}
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
        color: gray;
        font-size: 13px;
      }

      .status{
        color: lightgreen;
      }
    }

    .base{
      color: lightgray;
    }

    .members{
      font-size: 13px;
      color: rgba(255,255,230,0.5);
    }
  }

  .date{
    color: gray;
    font-size: 13px;
  }

  &:hover{
    background-color: rgba(0,0,0,0.2);
  }
`