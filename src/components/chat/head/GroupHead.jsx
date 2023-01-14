import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CgProfile } from 'react-icons/cg';
import { useChatContext } from '../../../hooks/useChatContext';
import { ChatProfile } from './profile/ChatProfile';

export const GroupHead = ({ groupConvo, typingEvent, resize, allUsers, result }) => {
  const { chatId, currentUser, openGroupInfo, groupConversation, setOpenGroupInfo } = useChatContext();
  const [groupUsers, setGroupUsers] = useState([]);
  const [target, setTarget] = useState({});
  const [users, setUsers] = useState('');

  useEffect(() => {
    const targetGroup = groupConversation.find(group => group?.groupName === chatId?.groupName);
    const groupIds = targetGroup && targetGroup?.members.map(user => user?.userId);
    const groupNames = targetGroup && targetGroup?.members.map(user => user?.username).join().replaceAll(',', ', ')
    setUsers(groupNames);
    setTarget(targetGroup)
    const usersGroup = groupIds && allUsers.filter(user => groupIds?.includes(user?._id));
    setGroupUsers([...usersGroup]);
  }, [chatId?.groupName])

  return (
    <HeadCompo
      onClick={() => setOpenGroupInfo(true)}
    >  
      {openGroupInfo && <ChatProfile groupProfile groupUsers={groupUsers} target={target} />}
      {groupConvo?.profilePicture
          ? 
          <img src={groupConvo?.profilePicture} alt={groupConvo?.groupName} 
            className='profile-picture'/> 
          : <CgProfile className='pics'/>
      }
      <div className='detail'>
        <p className='text-edit'>{resize ? groupConvo?.groupName : groupConvo?.groupName?.slice(0, 4)+'...'}</p>
        { 
          (typingEvent?.message && (typingEvent?.conversationId === groupConvo?.convoId)) ? 
          <p>
            {`${typingEvent?.username} is ${typingEvent?.message}`}
          </p>
            :
          <p className='base text-edit'>
            {resize ? users : users.slice(0,15)+'...'}
          </p>
        }
      </div>
    </HeadCompo>
  )
}

const HeadCompo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  cursor: pointer;
  white-space: nowrap;
  position: relative;

  .pics{
    font-size: 3.6rem;
    color: gray;
    flex-basis: 4;
  }

  .profile-picture{
    width: 3.2rem;
    flex-basis: 4;
    height: 3.2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
  }

  .detail{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-basis: 6;
    gap: 0.3rem;
    flex-grow: 8;

    .base{
      color: lightgray;
      font-size: 15px;
    }

    .status{
      color: lightgreen;
    }
  }

  @media (max-width: 768px){
    .text-edit{
    }
  }
`