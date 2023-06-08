import { useEffect, useState } from 'react';
import {BsChatText} from 'react-icons/bs';
import {FiSettings} from 'react-icons/fi';
import {HiOutlineStatusOnline} from 'react-icons/hi';
import styled from 'styled-components';
import { useChatContext } from '../hooks/useChatContext';
import Notification_Bell from '../assest/notification.wav';

export const Left = ({ socket }) => {
  const { currentUser, soundNotification, mode, notification, setOpenUserProfile, setOpenGroupProfile, setNotification, chatId, setChatId, active, setActive } = useChatContext()
  const isOnline = currentUser?.status === 'online' ? true : undefined 
  const [reveal, setReveal] = useState(false);
  const { setClick } = useChatContext();
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    const filteredSort = notification.length && notification.filter(eachNotification => eachNotification?._id === eachNotification?._id)
    const sortedNotification = filteredSort && filteredSort.sort((a, b) => b?.orderId - a?.orderId)
    setSorted(sortedNotification)
  }, [notification])

  //TODO
  //make it open group messages also
  const openChatFromNotification = (user) => {
    setChatId({ userId: user?._id, convoId: user?.conversationId })
    const filteredNotification = sorted?.filter(notify => notify?._id !== user?._id)
    setNotification([...filteredNotification])
  }

  useEffect(() => {
    !notification.length && setReveal(false)
  }, [notification])

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

  return (
    <LeftSection className={mode ? 'leftLight__mode' : 'leftContainer__mode'}
    >
      <div className='top'> 
        <div 
          title={active ? 'Hide Contacts' : 'Show Contacts'}
          onClick={() => {
            setClick(false)
            setActive(prev => !prev)}
          }
          className={`burger_menu ${active ? 'active' : ''}`}>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
        </div>
        <span 
          onClick={() => notification.length && setReveal(prev => !prev)}
          className={notification.length && 'status'}>
          <BsChatText title='Chats' className='chat'/>
        </span>
        {reveal && <div>{customNotifications}</div>}
        {soundNotification && <audio src={Notification_Bell} autoPlay/>}
        <span className={isOnline && 'status'}>
          <HiOutlineStatusOnline title={currentUser?.status === 'online' ? 'online' : 'offline'} className='status'/>
        </span>
      </div>
      <div 
        className='base'
      >  
        <FiSettings title='Settings' className='settings'/>
        <div 
           onClick={() => {
            setOpenUserProfile(prev => !prev)
            setOpenGroupProfile(false)
          }}
          title='Profile' className='image'>
          <img src={currentUser?.profilePicture} alt="" />
        </div>
      </div>
    </LeftSection>
  )
}

const LeftSection = styled.div`
height: 100%;
// flex-grow: 0.2;
flex: none;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 2rem 0;
align-items: center;
position: relative;
background-color: #333639;
box-shadow: 2px 4px 16px rgba(0,0,0,0.7);

  .top{
    margin-top: -8px;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    position: relative;

    .burger_menu{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 12px 5px;
      border-radius: 5px;
      box-shadow: 10px;
      background-color: #363636;
      cursor: pointer;
      transition: all 0.24s ease-in-out;

      .bar1, .bar2, .bar3{
        width: 22px;
        height: 2px;
        background-color: lightgray;
      }

      &:hover{
        opacity: 0.8;
        background-color: rgba(255,255,255,0.1);
      }
    }

    .burger_menu.active{
      background-color: rgba(255,255,255,0.1);
      // .bar1{
      //   transform: translate(0, 11px), rotate(-45deg);
      // }
      
      // .bar3{
      //   transform: translate(0, -11px), rotate(45deg);
      // }

      // .bar2{
      //   opacity: 0;
      // }
    }

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
