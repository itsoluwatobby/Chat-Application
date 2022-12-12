import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg'
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux'
import { selectConversation } from '../features/messageSlice';

export const Conversations = ({user}) => {
  const {setClick} = useChatContext()
  // const dispatch = useDispatch()
  // const convo = useSelector(selectConversation)
  // const allUsers = useSelector(selectAllUsers)
  // const [users, setUsers] = useState([])

  // // useEffect(() => {
  // //   dispatch(getConversation(conversation))
  // // }, [conversation])

  // useEffect(() => {
  //   const userInConvo = allUsers.map(user => user?.conversationId.includes(conversation))
  //   setUsers(userInConvo)
  // }, [convo])

  return (
    <Conversation onClick={() => setClick(false)}>
      {user?.profilePicture ? <img src={user?.profilePicture} alt={user.username} 
        className='profile-picture'/> : <CgProfile className='pics'/>}
      <div className='detail'>
        <p className='top'>
          <span>{user?.username}</span>
          <span className='date'>{user?.lastSeen ? user?.lastSeen : format(new Date, 'p')}</span>
        </p>
        {/* <p className='base'>{user?.lastMessage.slice(0, 15)}...</p> */}
      </div>
    </Conversation>
  )
}

const Conversation = styled.div`
display: flex;
align-items: center;
gap: 0.6rem;
padding: 0.6rem;
border-radius: 5px;
z-index: 1;

  .pics{
    font-size: 3.4rem;
    color: gray;
  }

  .profile-picture{
    width: 3.4rem;
    flex-grow: none;
    height: 3.4rem;
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
        font-size: 15px;
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