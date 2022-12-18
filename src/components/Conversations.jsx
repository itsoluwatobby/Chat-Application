import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg';
import {MdMoreHoriz} from 'react-icons/md';
import {format} from 'date-fns';
import { useChatContext } from '../hooks/useChatContext';
import { axiosAuth } from '../app/axiosAuth';
import { BiRefresh } from 'react-icons/bi';

export const Conversations = ({user}) => {
  const {setClick, setChatId, conversation, refresh, setConversation, formatDate} = useChatContext()
  const [reveal, setReveal] = useState(false);
  const currentUserId = localStorage.getItem('userId')
  const [error, setError] = useState(null)

  const deleteConversation = async(convoId, id) => {
    try{
      const otherConversations = conversation.filter(user => user._id !== id)
      await axiosAuth.delete(`/conversation/delete/${convoId}/${currentUserId}/${id}`)
      setConversation(otherConversations)
      setChatId({})
      refresh()
      }catch(error) {
        let errorMessage;
        !error?.response ? errorMessage = 'no server response' : 
        error?.response?.status === 400 ? errorMessage = 'id required' :
        error?.response?.status === 404 ? errorMessage = 'No conversations, start a new conversation' :
        error?.response?.status === 500 ? errorMessage = 'internal error' : ''
        setError(errorMessage)
      }
  }
  
  return (
    <Conversation onClick={() => setError('')}>
      {
        user?.profilePicture ? <img src={user?.profilePicture} alt={user.username} 
        className='profile-picture'/> : <CgProfile className='pics'/>
      }
        <div className='detail'>
          {error && <span>{error}</span>}
          <p className='top'>
            <span>{user?.username}</span>
            {user?.status !== 'online' ?
              <span className='date'>{user?.lastSeen ? formatDate(user?.lastSeen) : format(new Date, 'p')}</span>
                :
              <span className='status'>online</span>
            }
          </p>
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
  padding: 5px;
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
    width: 3.2rem;
    flex-grow: none;
    height: 3.2rem;
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
    background-color: #333;
  }
`