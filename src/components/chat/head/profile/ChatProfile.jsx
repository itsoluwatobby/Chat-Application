import React, { useState } from 'react'
import styled from 'styled-components'
import { GroupProfile } from './GroupProfile';
import { LeftContainer } from './LeftContainer';
import { UsersInGroup } from './UserInGroup';
import { NAVIGATE } from './navigate';
import { useChatContext } from '../../../../hooks/useChatContext';
import { FaTimes } from 'react-icons/fa';

export const ChatProfile = ({user, loggedIn, loggedInUser, groupUsers, target, allUsers, socket }) => {
  const { chatId, openGroupProfile, setOpenGroupProfile } = useChatContext();
  const [buttonState, setButtonState] = useState(NAVIGATE.FST);

  const closeGroupProfile = () => {
    setOpenGroupProfile(false)
    // console.log(openGroupProfile)
  }

  return (
    <ChatProfilePage className={`chat_profile_container ${loggedIn && 'current__user'}`}>
      <div className='left_container'>
        <LeftContainer 
          buttonState={buttonState}
          setButtonState={setButtonState} 
        />
      </div>
      { buttonState === NAVIGATE.FST &&
        <div className='right_container'>
          <FaTimes 
            onClick={closeGroupProfile} className='times'/>
          <GroupProfile target={target} user={user} loggedInUser={loggedInUser} />
        </div>
        ||
        buttonState === NAVIGATE.SND &&
        <div className='group_container'>
          <FaTimes 
            onClick={closeGroupProfile} className='times'/>
          <UsersInGroup groupUsers={groupUsers} allUsers={allUsers} socket={socket}/>

        </div>
        ||
        buttonState === NAVIGATE.STH &&
        <EndToEnd closeGroupProfile={closeGroupProfile} />
      }
    </ChatProfilePage>
  )
}

const EndToEnd = ({ closeGroupProfile }) => {

  return (
    <div className='encrypt'>
        <FaTimes onClick={closeGroupProfile} className='times'/>
        <h2>Encryption</h2>
        <p>Oluwatobby Chat ensures your conversation with end-to-end encryption</p>
        <p>Your messages and calls stay between you and the people and businesses you choose. Not even Oluwatobby can read or listen to them</p>
        <span>Learn More</span>
    </div>
  )
}

const ChatProfilePage = styled.div`
position: fixed;
background-color: #393736;
box-shadow: 2px 4px 16px rgba(0,0,0,0.3);
display: flex;
align-items: center;
transform: translatex(50%);
right: 15rem;
top: 1.5rem;
max-width: 70vw;
height: 70vh;
cursor: default;
z-index: 200;
border-radius: 10px;

.current__user{
  position: absolute;
  bottom: 2rem;
  left: 0rem;
}

@media (max-width: 750px){
  max-width: 70vw;
  min-width: 70vw;
  left: -6rem;
}

@media (min-width: 750px){
  max-width: 55vw;
  left: 4.6rem;
}

@media (min-width: 850px){
  max-width: 50vw;
  left: 5.3rem;
}

@media (min-width: 950px){
  max-width: 47vw;
  left: 6.7rem;
}

@media (min-width: 1050px){
  max-width: 45vw;
  left: 7.7rem;
}

@media (min-width: 1150px){
  max-width: 40vw;
  left: 11rem;
}

.remove_group{
  display: none;
}

.group_profile{
  animation: group 2s forwards;
}

@keyframes group {
  from{
    transform: translateY(-100%);
  }
  to{
    transform: translateY(0);
  }
}

  .left_container{
    flex: none;
    display: flex;
    align-items: flex-start;
    padding: 5px;
    height: 100%;
    background-color: #363636;
    width: 9rem;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .right_container{
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #373839;
    width: 100%;
    height: 100%;
    margin-left: -1rem;
    align-items: flex-start;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    font-weight: 300;
    position: relative;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    .times{
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;

      &:hover{
        opacity: 0.6;
      }

      &:active{
        opacity: 0.85;
      }
    }
  }
  
  .group_container{
    display: flex;
    flex-direction:column;
    padding: 0.7rem 0.8rem;
    margin-left: -1rem;
    font-size: 14px;
    align-items: flex-start;
    background-color: #373839;
    width: 100%;
    height: 100%;
    font-weight: 300;
    position: relative;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    .times{
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;

      &:hover{
        opacity: 0.6;
      }

      &:active{
        opacity: 0.85;
      }
    }
  }

  .encrypt{
    display: flex;
    flex-direction:column;
    white-space: pre-wrap;
    padding: 1rem 0.8rem;
    margin-left: -1rem;
    font-size: 14px;
    align-items: flex-start;
    background-color: #373839;
    width: 100%;
    height: 100%;
    font-weight: 300;
    gap: 0.8rem;
    position: relative;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    .times{
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;

      &:hover{
        opacity: 0.6;
      }

      &:active{
        opacity: 0.85;
      }
    }

    p{
      color: rgba(255,255,235,0.7);
    }

    span{
      color: rgba(0,205,0,0.8);
      text-decoration: underline;
      cursor: pointer;
    }
  }
  
`
