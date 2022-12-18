import React from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg';
import { useChatContext } from '../../hooks/useChatContext';
import {format} from 'date-fns';

export const Users = ({user, loading, error}) => {
  const {formatDate} = useChatContext();

    const content = (
      <>
        {user ?
          <>
            {user?.profilePicture ? <img src={user?.profilePicture} alt={user.username} 
              className='profile-picture'/> : <CgProfile className='pics'/>}
              <div className='detail'>
                {loading && <p>creating conversation...</p>}
                {!loading && error && <p className='errors'>{error}</p>}
                <p className='top'>
                  <span>{user?.username}</span>
                  <span className='date'>{user?.lastSeen ? formatDate(user?.lastSeen) : format(new Date, 'p')}</span>
                </p>
                <p className='base'>{user?.about.slice(0, 15)}...</p>
              </div>
          </> 
          : 
          <p>user not found</p>
        }
      </>
    )
  
  return (
    <UserComponent>
      {content}
    </UserComponent>
  )
}

const UserComponent = styled.div`
display: flex;
align-items: center;
gap: 0.6rem;
padding: 0.4rem;
margin: 0 0.5rem;
border-radius: 5px;
z-index: 1;
cursor: pointer;
border-bottom : 1px solid gray;

  .pics{
    font-size: 2.5rem;
    color: gray;
  }

  .profile-picture{
    width: 3rem;
    flex-grow: none;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
  }

  .detail{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex-grow: 8;

    .errors{
      color: red;
    }

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
      color: gray;
    }
  }

  &:hover{
    background-color: #333;
  }
`
