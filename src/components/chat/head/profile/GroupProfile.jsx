import React from 'react'
import styled from 'styled-components';
import {CgProfile} from 'react-icons/cg';
import { RiErrorWarningLine } from 'react-icons/ri';
import { sub } from 'date-fns';

export const GroupProfile = ({ target }) => {

  const timeEdit = new Intl.DateTimeFormat('en-us', {
    dateStyle: 'short',
    timeStyle: 'full'
  })
console.log(target?.createdAt.split('T')[0])
  return (
    <GroupProfilePage className='right_container'>
      {false ? 
        <img src="" alt="" className='pics'/>
        : <CgProfile className='profile'/>
      }
        <p className='title'>
          <span className='name'>{target?.groupName}</span>
          <span className='edit'>
            <RiErrorWarningLine className='icon' />
          </span>
        </p>
        <p className='created'>Created</p>
        <p className='date'>{new Date(target?.createdAt.split('T')[0]).toLocaleString()}</p>
        <p className='description'>
          <span className='created'>Description</span>
          <span className='date'>
            The world is a very big place for us all to live in. The world is a very big place for us all to live in
            <span className='edit'>
              <RiErrorWarningLine className='icon' />
            </span>
          </span>
        </p>
    </GroupProfilePage>
  )
}

const GroupProfilePage = styled.div`

  .pics{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .profile{
    font-size: 5.5rem;
    color: gray;
  }

  .title{
    display: flex;
    align-items: center;
    gap: 1rem;

    .name{
      font-size: 2rem;
      font-weight: 300;
      white-space: pre-wrap;
    }

    .edit{
      margin-top: 0.4rem;
      position: fixed;
      right: 1.5rem;
      border-radius: 5px;
      padding: 8px;
      display: grid;
      place-content: center;
      cursor: auto;
      font-size: 14px;
      transition: all 0.15s ease-in-out;

      &:hover{
        background-color: rgba(255,255,255,0.16);
      }
    }
  }

  .created{
    font-size: 14px;
    color: rgba(255,255,255,0.5);
  }

  .date{
    margin-top: -0.2rem;
    font-size: 14px;
    color: rgba(255,255,255,0.95);
  }

  .description{
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.95rem;

    .date{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: pre-wrap;

      .edit{
        margin-top: 0.2rem;
        display: grid;
        place-content: center;
        position: fixed;
        right: 1.5rem;
        border-radius: 5px;
        padding: 8px;
        cursor: auto;
        font-size: 14px;
        transition: all 0.15s ease-in-out;

        &:hover{
          background-color: rgba(255,255,255,0.16);
        }
      }
    }
  }

`