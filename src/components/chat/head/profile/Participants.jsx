import React, { useState } from 'react'
import { useChatContext } from '../../../../hooks/useChatContext';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';

export const Participants = ({ user }) => {
  const { newGroup, setNewGroup } = useChatContext();
  const [isChecked, setIsChecked] = useState(false)

  const handleChangeChecked = async(e) => {
    setIsChecked(e.target.checked)
    if(!isChecked){
      setNewGroup([...newGroup, {id: user?._id, username: user?.username}])
    }
    else{
      const others = newGroup.filter(grp => grp?.id !== user?._id)
      setNewGroup([...others])
    }
  }
 
  return (
    <Component>
      {user?.profilePicture ? 
        <img src={user.profilePicture} alt={user.username} className='profile-picture'/> : <CgProfile className='pics'/>
      }
      <div className='detail'>
        <div className='top'>
          <p>{user?.username}</p>
          <p className='date'>
            <input 
              type="checkbox" 
              checked={isChecked} 
              onChange={handleChangeChecked}
            />
          </p>
        </div>
      </div>
    </Component>
  )
}

const Component = styled.div`

  .pics{
    font-size: 3rem;
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
`