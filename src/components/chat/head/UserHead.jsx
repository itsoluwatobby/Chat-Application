import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';

export const UserHead = ({ user, typingEvent, resize, formatDate }) => {
  return (
    <UserConvo>  
      {user?.profilePicture 
          ? 
            <img src={user?.profilePicture} alt={user?.username} 
              className='profile-picture'/> 
            : <CgProfile className='pics'/>
      }
      <div className='detail'>
        <p className='text-edit'>{resize ? user?.username : user?.username?.slice(0, 4)+'...'}</p>
        { 
          typingEvent?.message ?
          <p>{typingEvent?.message}</p>
          :
          user?.status !== 'online' 
          ?
          <p className='base text-edit'>
            {
              !user?.lastSeen ? 
                <span>welcome</span>
                : 
                <span>
                  last seen {resize && user?.lastSeen ? formatDate(user?.lastSeen) : '...'}
                </span>
              }
          </p>
          :
          <p className='status text-edit'>online</p>
        }
      </div>
    </UserConvo>
  )
}

const UserConvo = styled.div`

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
