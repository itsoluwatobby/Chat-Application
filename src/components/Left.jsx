import { useState } from 'react'
import {BsChatText} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {HiOutlineStatusOnline} from 'react-icons/hi'
import styled from 'styled-components'
import { useChatContext } from '../hooks/useChatContext'

export const Left = () => {
  const { currentUser, notification, setNotification, chatId } = useChatContext()
  const isOnline = currentUser?.status === 'online' ? true : undefined 
  const [reveal, setReveal] = useState(false);

  const customNotifications = (
    <div className='notification_container'>
      {
        notification.map(notify => (
          <div key={notify.orderId} className='notification'>
            <span>message from {notify?.username}</span>
          </div>
        ))
      }
    </div>
  )

  return (
    <LeftSection>
      <div className='top'> 
        <span 
          onClick={() => notification.length && setReveal(prev => !prev)}
          className={notification.length && 'status'}>
          <BsChatText title='Chats' className='chat'/>
        </span>
        {reveal && <div>{customNotifications}</div>}
        <span className={isOnline && 'status'}>
          <HiOutlineStatusOnline title='Status' className='status'/>
        </span>
      </div>
      <div className='base'>
        <FiSettings title='Settings' className='settings'/>
        <div title='Profile' className='image'>
          <img src={currentUser?.profilePicture} alt="" />
        </div>
      </div>
    </LeftSection>
  )
}

const LeftSection = styled.div`
height: 100%;
flex-grow: 0.2;
display: flex;
flex-direction: column;
background-color: #333333;
justify-content: space-between;
padding: 2rem 0;
align-items: center;

  .top{
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    position: relative;

    .notification_container{
      position: absolute;
      top: 1.3rem;
      left: 1.5rem;
      z-index: 100;
      border-radius: 5px;
      box-shadow: -1px 2px 4px rgba(255,150,100,0.55);
      max-width: 10rem;
      background-color: rgba(25,25,20,0.9);
      display: flex;
      flex-direction: column;
      padding: 0.3rem;

      .notification{
        white-space: nowrap;
        cursor: pointer;
      }
    }

    .chat{
      font-size: 40px;
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;

      &:hover{
        background-color: rgba(255,255,255,0.1);
      }
    }

    span{
      position: relative;

      .status{
        font-size: 40px;
        cursor: pointer;
        padding: 8px;
        border-radius: 5px;
  
        &:hover{
          background-color: rgba(255,255,255,0.1);
        }
      }
    }

    .status{

      &:after{
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: #4CBB17;
        position: absolute;
        right: 0.5rem;
        top: 0.6rem;
      }
    }
  }

  .base{
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    .settings{
      font-size: 40px;
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;

      &:hover{
        background-color: rgba(255,255,255,0.1);
      }
    }

    .image{
      font-size: 32px;
      cursor: pointer;
      padding: 7px;
      width: 40px;
      border-radius: 5px;

      &:hover{
        background-color: rgba(255,255,255,0.1);
      }

      img{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }

  
`
