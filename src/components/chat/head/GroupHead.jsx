import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CgProfile } from 'react-icons/cg';
import { useChatContext } from '../../../hooks/useChatContext';
import { ChatProfile } from './profile/ChatProfile';

export const GroupHead = ({ 
  groupConvo, typingEvent, resize, allUsers, socket, result }) => {
  const { chatId, currentUser, setOpenUserProfile, groupConversation, group, setOpenGroupProfile, conversation } = useChatContext();
  const [groupUsers, setGroupUsers] = useState([]);
  const [target, setTarget] = useState({});
  const [users, setUsers] = useState('');
  const [memberIds, setMemberIds] = useState([]);

  useEffect(() => {
    setGroupUsers([])
    const targetGroup = groupConversation.find(group => group?.groupName === chatId?.groupName);
    const groupIds = targetGroup && targetGroup?.members.map(user => user?.userId);
    targetGroup && setUsers(() => targetGroup?.members.map(user => user?.username).join().replaceAll(',', ', '));
    setTarget(targetGroup)
    setMemberIds(() => targetGroup && targetGroup?.members.map(targ => targ?.userId))
    const usersGroup = groupIds && Array.isArray(allUsers) && allUsers.filter(user => groupIds?.includes(user?._id));
    Array.isArray(usersGroup) && setGroupUsers([...usersGroup]);
  }, [chatId?.convoId, conversation])
  
  return (
    <HeadCompo
      onClick={() => {
        setOpenUserProfile(false)
        setOpenGroupProfile(true)
      }}
    >  
      <ChatProfile 
        groupUsers={groupUsers} target={target} 
        allUsers={allUsers} socket={socket}
        memberIds={memberIds}
      />
      {group?.groupAvatar
          ? 
          <img src={group?.groupAvatar} alt={groupConvo?.groupName} 
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
            {resize ? users : users?.slice(0,15)+'...'}
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
    width: 3rem;
    flex-basis: 4;
    height: 3rem;
    border-radius: 100%;
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