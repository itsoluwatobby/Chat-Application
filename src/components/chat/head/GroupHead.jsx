import React from 'react'
import styled from 'styled-components'
import { CgProfile } from 'react-icons/cg';
import { useChatContext } from '../../../hooks/useChatContext';

export const GroupHead = ({ groupConvo, typingEvent, resize, formatDate, result }) => {
  // const { chatId, currentUser } = useChatContext();
  //const targetUser = result && result.find(user => user?._id === chatId?.userId)
  return (
    <HeadCompo>  
      {groupConvo?.profilePicture 
          ? 
          <img src={groupConvo?.profilePicture} alt={groupConvo?.groupName} 
            className='profile-picture'/> 
          : <CgProfile className='pics'/>
      }
      <div className='detail'>
        <p className='text-edit'>{resize ? groupConvo?.groupName : groupConvo?.groupName?.slice(0, 4)+'...'}</p>
        { 
          typingEvent ?
          <p>{typingEvent}</p>
          :
          <p className='base text-edit'>
            group members
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
  white-space: nowrap;

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