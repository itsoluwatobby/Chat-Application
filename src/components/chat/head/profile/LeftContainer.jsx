import React from 'react';
import styled from 'styled-components';
import { RiErrorWarningLine } from 'react-icons/ri';
import {TiGroupOutline} from 'react-icons/ti';
import { MdMediaBluetoothOn, MdLink } from 'react-icons/md';
import {GoFileMedia} from 'react-icons/go';
import {BsLock} from 'react-icons/bs';
import { NAVIGATE } from './navigate';

export const LeftContainer = ({ setButtonState, buttonState }) => {

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
            <RiErrorWarningLine className='icon' />
            <span>Overview</span>
          </p>
          <p
            onClick={() => toggleButton(NAVIGATE.SND)} 
            className={buttonState === NAVIGATE.SND ? 'current' : null}
          >
            <TiGroupOutline className='icon' />
            <span>Participants</span>
          </p>
          <p
            onClick={() => toggleButton(NAVIGATE.TRD)} 
            className={buttonState === NAVIGATE.TRD ? 'current' : null}
          >
            <MdMediaBluetoothOn className='icon' />
            <span>Media</span>
          </p>
          <p
            onClick={() => toggleButton(NAVIGATE.FRT)} 
            className={buttonState === NAVIGATE.FRT ? 'current' : null}
          >
            <GoFileMedia className='icon' />
            <span>Files</span>
          </p>
          <p
            onClick={() => toggleButton(NAVIGATE.FTH)} 
            className={buttonState === NAVIGATE.FTH ? 'current' : null}
          >
            <MdLink className='icon' />
            <span>Links</span>
          </p>
          <p
            onClick={() => toggleButton(NAVIGATE.STH)} 
            className={buttonState === NAVIGATE.STH ? 'current' : null}
          >
            <BsLock className='icon' />
            <span>Encryption</span>
          </p>
        </div>
    </Container>
  )
}

const Container = styled.div`

  .container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;

    p{
      display: flex;
      align-items: center;
      font-size: 14px;
      gap: 0.8rem;
      color: lightgray;
      padding: 7px;
      cursor: default;
      font-weight: 400;
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
  }
`
