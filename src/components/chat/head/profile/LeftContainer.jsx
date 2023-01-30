import React from 'react';
import styled from 'styled-components';
import { RiErrorWarningLine, RiChatSmile3Line } from 'react-icons/ri';
import { AiOutlineDesktop } from 'react-icons/ai';
import { CiKeyboard, CiUser } from 'react-icons/ci';
import {TiGroupOutline} from 'react-icons/ti';
import { MdMediaBluetoothOn, MdLink } from 'react-icons/md';
import {GoFileMedia} from 'react-icons/go';
import { MdNotificationsNone } from 'react-icons/md';
import { BsLock, BsKey } from 'react-icons/bs';
import { NAVIGATE } from './navigate';
import { useChatContext } from '../../../../hooks/useChatContext';

export const LeftContainer = ({ loggedIn, setButtonState, buttonState, userProfile }) => {
  const { group } = useChatContext()
  const toggleButton = (value) => {
    setButtonState(value)
  }

  return (
    <Container>
        <div className='container'>
          <p
            onClick={() => toggleButton(NAVIGATE.FST)} 
            className={buttonState === NAVIGATE.FST ? 'current' : null}
          >
            {loggedIn ? <AiOutlineDesktop className='icon' /> : <RiErrorWarningLine className='icon' />}
            <span>{loggedIn ? 'General' : 'Overview'}</span>
          </p>
          {!userProfile &&
            <p
              onClick={() => toggleButton(NAVIGATE.SND)} 
              className={buttonState === NAVIGATE.SND ? 'current' : null}
            >
              {loggedIn ? <BsKey className='icon' /> : <TiGroupOutline className='icon' />}
              <span>{loggedIn ? 'Account' : 'Participants'}</span>
            </p>
          }
          <p
            onClick={() => toggleButton(NAVIGATE.TRD)} 
            className={buttonState === NAVIGATE.TRD ? 'current' : null}
          >
            {loggedIn ? <RiChatSmile3Line className='icon' /> : <MdMediaBluetoothOn className='icon' />}
            <span>{loggedIn ? 'Chats' : 'Media'}</span>
          </p>
          <p
            onClick={() => toggleButton(NAVIGATE.FRT)} 
            className={buttonState === NAVIGATE.FRT ? 'current' : null}
          >
            {loggedIn ? <MdNotificationsNone className='icon' /> : <GoFileMedia className='icon' />}
            <span>{loggedIn ? 'Notifications' : 'Files'}</span>
          </p>
          <p
            onClick={() => toggleButton(NAVIGATE.FTH)} 
            className={buttonState === NAVIGATE.FTH ? 'current' : null}
          >
            {loggedIn ? <CiKeyboard className='icon' /> : <MdLink className='icon' />}
            <span>{loggedIn ? 'Shortcuts' : 'Links'}</span>
          </p>
          <p
            onClick={() => toggleButton(NAVIGATE.STH)} 
            className={buttonState === NAVIGATE.STH ? 'current' : null}
          >
            <BsLock className='icon' />
            <span>{loggedIn ? 'Help' : 'Encryption'}</span>
          </p>
        </div>
       {loggedIn && 
          <p
              style={{translate:'0 680%'}}
              onClick={() => toggleButton(NAVIGATE.GTH)} 
              className={buttonState === NAVIGATE.GTH ? 'current' : null}
            >
            <CiUser className='icon' />
            <span>{loggedIn && 'Profile'}</span>
          </p>
        }
    </Container>
  )
}

const Container = styled.div`
  
  .container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }

    p{
      display: flex;
      align-items: center;
      font-size: 14px;
      gap: 0.8rem;
      color: white;
      padding: 7px;
      cursor: default;
      font-weight: 300;
      border-radius: 5px;
      width: 8.4rem;
      transition: all 0.15s ease-in-out;

      .icon{
        font-size: 19px;
      }

      &:hover{
        background-color: rgba(255,255,255,0.07);
      }
    }

    .current{
      background-color: rgba(255,255,255,0.07);
    }
  
`
