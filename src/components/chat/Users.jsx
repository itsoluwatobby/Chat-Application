import React from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg'

export const Users = ({user}) => {
  return (
    <UserComponent>
      {user ?
        <>
          {user?.profilePicture ? <img src={user?.profilePicture} alt={user.username} 
            className='profile-picture'/> : <CgProfile className='pics'/>}
          <div className='detail'>
            <p className='top'>
              <span>{user?.username}</span>
              <span className='date'>{user?.lastSeen ? user?.lastSeen : format(new Date, 'p')}</span>
            </p>
            <p className='base'>{user?.about.slice(0, 15)}...</p>
          </div>
        </> 
        : <p>user not found</p>
      }
    </UserComponent>
  )
}

const UserComponent = styled.div`
display: flex;
align-items: center;
gap: 0.6rem;
padding: 0.5rem;
margin: 0 0.5rem;
border-radius: 5px;
z-index: 1;
cursor: pointer;

  .pics{
    font-size: 3rem;
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
