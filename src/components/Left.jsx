import { useEffect, useState } from 'react'
import {BsChatText} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {HiOutlineStatusOnline} from 'react-icons/hi'
import styled from 'styled-components'
import { useChatContext } from '../hooks/useChatContext'
import { ChatProfile } from './chat/head/profile/ChatProfile'

export const Left = ({ socket }) => {
  const { currentUser, notification, openGroupProfile, setOpenGroupProfile, setNotification, chatId, setChatId } = useChatContext()
  const isOnline = currentUser?.status === 'online' ? true : undefined 
  const [reveal, setReveal] = useState(false);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    const filteredSort = notification.length && notification.filter(eachNotification => eachNotification?._id === eachNotification?._id)
    const sortedNotification = filteredSort && filteredSort.sort((a, b) => b?.orderId - a?.orderId)
    setSorted(sortedNotification)
  }, [notification])

  const openChatFromNotification = (user) => {
    setChatId({ userId: user?._id, convoId: user?.conversationId })
    const filteredNotification = sorted?.filter(notify => notify?._id !== user?._id)
    setNotification([...filteredNotification])
  }

  const customNotifications = (
    <div className='notification_container'>
      {sorted.length && 
        sorted.map(notify => (
          <ul key={notify.orderId} className='notification'>
            <li
              onClick={() => openChatFromNotification(notify)} 
            >
              message from {notify?.username}
            </li>
          </ul>
        ))
      }
    </div>
  )

  useEffect(() => {
    !notification.length && setReveal(false)
  }, [notification])

  return (
    <LeftSection 
      onClick={() => setOpenGroupProfile(false)}
    >
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
      <div 
        className='base'
        //onClick={() => setOpenGroupProfile(true)}
        >  
          {/* {
            openGroupProfile && 
              <ChatProfile loggedIn
                loggedInUser={currentUser} 
                socket={socket}
              />
          } */}
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
      box-shadow: -1px 2px 4px rgba(55,100,100,0.55);
      max-width: 10rem;
      background-color: rgba(25,25,20,0.9);
      display: flex;
      border: 2px solid rgba(150,230,100,0.35);
      flex-direction: column;
      padding: 0.2rem;
      max-height: 8rem;
      overflow-y: scroll;
      overflow-x: none;

      .notification{
        white-space: nowrap;
        padding: 0;
        border-bottom: 1px solid gray;

        &:nth-last-child(){
          border-bottom: none;
        }

        li{
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 5px;
          transition: all 0.24s ease-in-out;

          &:hover{
            padding-bottom: 1px;
            background-color: rgba(255,255,255,0.15);
          }
        }
      }

      &::-webkit-scrollbar{
        width: 2px;
      }
    
      &::-webkit-scrollbar-track {
        background: transparent;
      }
    
      &::-webkit-scrollbar-thumb {
        background: lightgray;
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
    position: relative;

    .settings{
      font-size: 40px;
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;
      transition: all 0.15s ease-in-out;

      &:hover{
        background-color: rgba(255,255,255,0.1);
      }

      &:active{
        scale: 0.92;
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
