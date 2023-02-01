import React, { useState } from 'react'
import styled from 'styled-components'
import { LeftContainer } from '../LeftContainer';
import { NAVIGATE } from '../navigate';
import { useChatContext } from '../../../../../hooks/useChatContext';
import { FaTimes } from 'react-icons/fa';
import { Account } from './Account';
import { Chats } from './Chats';
import { General } from './General';
import { Profile } from './Profile';

export const LoggedInUserProfile = ({ loggedIn, user, groupUsers, socket }) => {
  const { chatId, openUserProfile, group, setOpenUserProfile } = useChatContext();
  const [buttonState, setButtonState] = useState(NAVIGATE.GTH);

  const closeGroupProfile = () => {
    setOpenUserProfile(false)
  }

  return (
    <CurrentUserPage className={`chat_profile_container ${!openUserProfile && 'logged_In'} ${loggedIn && 'current__user'}`}>
      <div className='left_container'>
        <LeftContainer loggedIn
          buttonState={buttonState}
          setButtonState={setButtonState} 
        />
      </div>
      { buttonState === NAVIGATE.FST &&
        <div className='right_container'>
          <FaTimes 
            onClick={closeGroupProfile} className='times'/>
          <General />
        </div>
        ||
        buttonState === NAVIGATE.SND &&
        <div className='right_container'>
          <FaTimes 
            onClick={closeGroupProfile} className='times'/>
          <Account />
        </div>
        ||
        buttonState === NAVIGATE.TRD && 
          <div className='group_container'>
            <FaTimes 
              onClick={closeGroupProfile} className='times'/>
            <Chats 
              socket={socket}
            />
          </div>
        ||
        buttonState === NAVIGATE.GTH && 
          <div className='group_container'>
            <FaTimes 
              onClick={closeGroupProfile} className='times'/>
            <Profile 
              socket={socket}
            />
          </div>
        ||
        buttonState === NAVIGATE.STH &&
        <EndToEnd closeGroupProfile={closeGroupProfile} />
      }
    </CurrentUserPage>
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

const CurrentUserPage = styled.div`
position: fixed;
background-color: #393736;
box-shadow: 2px 4px 16px rgba(0,0,0,0.3);
display: flex;
align-items: center;
transform: translatex(50%);
right: 15rem;
top: 9.5rem;
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

@media (max-width: 500px){
  max-width: 70vw;
  min-width: 70vw;
  left: -7.8rem;
}

@media (max-width: 650px){
  max-width: 70vw;
  min-width: 70vw;
  left: -8.5rem;
}

@media (min-width: 750px){
  max-width: 55vw;
  left: -10rem;
}

@media (min-width: 850px){
  max-width: 50vw;
  left: -11rem;
}

@media (min-width: 950px){
  max-width: 47vw;
  left: -11rem;
}

@media (min-width: 1050px){
  max-width: 45vw;
  left: -12rem;
}

@media (min-width: 1150px){
  max-width: 40vw;
  left: -13rem;
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
