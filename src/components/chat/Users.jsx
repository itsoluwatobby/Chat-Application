import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg';
import { useChatContext } from '../../hooks/useChatContext';
import {format} from 'date-fns';

export const Users = ({ user, loading, error, groupConvo, newGroup, setNewGroup }) => {
  const {formatDate, proceed, setProceed, open, setIsNext} = useChatContext();
  const [isChecked, setIsChecked] = useState(true)
  
  const handleChangeChecked = async(e) => {
    setIsChecked(!isChecked)
    isChecked ? setNewGroup([...newGroup, user._id]) : newGroup.pop(user._id)
  }
  
  useEffect(() => {
    (newGroup && newGroup.length) ? setIsNext(true) : setIsNext(false)
  }, [isChecked])

    const userContent = (
      <>
        {user ?
          <>
            {user?.profilePicture ? <img src={user.profilePicture} alt={user.username} 
              className='profile-picture'/> : <CgProfile className='pics'/>}
              <div className='detail'>
                {loading && <p>creating conversation...</p>}
                {!loading && error && <p className='errors'>{error}</p>}
                <div className='top'>
                  <p>{user?.username}</p>
                  <p className='date'>
                    {groupConvo &&
                      <input 
                        type="checkbox" 
                        checked={!isChecked} 
                        onChange={handleChangeChecked}
                    />
                    }
                    {!groupConvo && <span>{user?.lastSeen ? formatDate(user?.lastSeen) : format(new Date, 'p')}</span>}
                  </p>
                </div>
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
      {!proceed && userContent}
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
//border-bottom : 1px solid gray;

  .pics{
    font-size: 2.5rem;
    color: gray;
  }

  .profile-picture{
    width: 2.5rem;
    flex-grow: none;
    height: 2.5rem;
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
        display: flex;
        flex-direction: column;
        transform: translatey(50%);
      }

      p{

        input{
          width: 15px;
          height: 15px;
          box-shadow: 2px 4px 16px rgba(0,0,0,0.1);
          background-color: #333333;
          cursor: pointer;

          &:checked{
            background-color: green;
          }
        }
      }
    }

    .base{
      color: gray;
    }
  }

  &:hover{
    background-color: rgba(200,200,200,0.1);
  }

`
