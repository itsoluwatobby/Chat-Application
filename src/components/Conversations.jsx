import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg';
import {MdMoreHoriz} from 'react-icons/md';
import {format} from 'date-fns';
import { useChatContext } from '../hooks/useChatContext';
import { axiosAuth } from '../app/axiosAuth';
import { BiRefresh } from 'react-icons/bi';

export const Conversations = ({ user, socket }) => {
  const {
    setClick, setOpen, setChatId, typingEvent, conversation, refresh, currentUser, setConversation, formatDate, chatId
  } = useChatContext()
  const [reveal, setReveal] = useState(false);
  const currentUserId = localStorage.getItem('userId')
  const [error, setError] = useState(null)

  const deleteConversation = async(convoId, id) => {
    try{
      const otherConversations = conversation.filter(user => user?._id !== id)
      await axiosAuth.delete(`/conversation/delete/${convoId}/${currentUserId}`)
      setConversation(otherConversations)
      setChatId({})
      refresh()
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

  // useEffect(() => {
  //   socket.on('newDel_conversation', data => {
  //     setConversation([...data])
  //     refresh() 
  //   })
  // }, [socket])

  // const deleteConvo = async (convoId, id) => {
  //   const val = await deleteConversation(convoId, id)
  //   val && await socket.emit('delete_Conversation', val)
  // }
  
  return (
    <Conversation
      onClick={() => {
        setError('')
        setClick(false)
        setOpen(false)
      }}
    >
      {
        user?.profilePicture ? <img src={user?.profilePicture} alt={user?.username} 
        className='profile-picture'/> : <CgProfile className='pics'/>
      }
        <div className='detail'>
          {error && <span>{error}</span>}
          <p className='top'>
            <span>{user?.username || user?.nameOfGroup}</span>
            {user?.status !== 'online' ?
              <span className='date'>{user?.lastSeen ? formatDate(user?.lastSeen) : format(new Date, 'p')}</span>
                :
              <span className='status'>online</span>
            }
          </p>
          {/* {(typingEvent && chatId?.userId === user?._id) && <p className='base'>{typingEvent}</p>} */}
          {/* <p className='base'>{user?.lastMessage.slice(0, 15)}...</p> */}
        </div>
        {
          reveal && 
          <button
            onMouseEnter={() => setReveal(true)}
            onMouseLeave={() => setReveal(false)}
            onClick={() => deleteConversation(user?.convoId, user?._id)}
          >Remove</button>
        }
        <MdMoreHoriz 
          onMouseEnter={() => setReveal(true)}
          onMouseLeave={() => setReveal(false)}
          className='more'
        />
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
  }

  &:hover{
    background-color: rgba(0,0,0,0.2);
  }
`