import {CiSearch} from 'react-icons/ci';
import {CgProfile} from 'react-icons/cg';
import {VscDeviceCameraVideo} from 'react-icons/vsc';
import {HiOutlinePhone} from 'react-icons/hi';
import {AiOutlineLine} from 'react-icons/ai';
import {FaTimesCircle} from 'react-icons/fa';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {format} from 'date-fns';
import { useChatContext } from '../../hooks/useChatContext';

export const ChatHeading = ({ user, socket }) => {
  const [width, setWidth] = useState(undefined)
  const {setChatId, formatDate, setMessages} = useChatContext();
  const [resize, setResize] = useState(false);
  const [typingEvent, setTypingEvent] = useState('');

  // useEffect(() => {
  //   socket.on('typing-event', data => {
  //     setTypingEvent(data.message)
  //   })
  // }, [])

  // useEffect(() => {
  //   socket.on('typing-stop', data => {
  //     setTypingEvent('')
  //   })
  // }, [])

  useEffect(() => {
    const widthListener = () => setWidth(window.innerWidth);
    window.addEventListener('resize', widthListener)

    return () => {
      window.removeEventListener('resize', widthListener)
      setWidth(undefined)
    }
  }, [window])

  useEffect(() => {
    width >= 798 ? setResize(true) : setResize(false)
  }, [width])
  
const closeChat = () => {
    setChatId({})
    setMessages([])
  }
  
  return (
    <Heading>
      <div>  
      {user?.profilePicture 
          ? 
            <img src={user.profilePicture} alt={user.username} 
              className='profile-picture'/> 
            : <CgProfile className='pics'/>
      }
        <div className='detail'>
          <p className='text-edit'>{resize ? user?.username : user?.username?.slice(0, 4)+'...'}</p>
          { 
            typingEvent ?
            <p>{typingEvent}</p>
            :
            user?.status !== 'online' 
            ?
            <p className='base text-edit'>
              {
                !user?.lastSeen ? 
                  <span>welcome</span>
                 : 
                  <span>
                    last seen {resize && user?.lastSeen ? formatDate(user?.lastSeen) : '...'}
                  </span>
                }
            </p>
            :
            <p className='status text-edit'>online</p>
          }
        </div>
      </div>
      <div className='endtag'>
        <VscDeviceCameraVideo className='icon phone'/>
        <HiOutlinePhone className='icon phone'/>
        <AiOutlineLine className='line phone'/>
        <CiSearch className='icon'/>
        <FaTimesCircle 
          onClick={closeChat}
          title='Exit Chat' className='icon'/>
      </div>
    </Heading>
  )
}

const Heading= styled.div`
display: flex;
align-items: center;
padding: 0.8rem;
width: 100%;
z-index: 50;
whitespace: nowrap;
position: sticky;
top: 0;
background-color: #333;

  div{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    white-space: nowrap;

    .pics{
      font-size: 3.6rem;
      color: gray;
      flex-basis: 4;
    }

    .profile-picture{
      width: 3.2rem;
      flex-basis: 4;
      height: 3.2rem;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
    }
  
    .detail{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex-basis: 6;
      gap: 0.3rem;
      flex-grow: 8;
  
      .base{
        color: lightgray;
        font-size: 15px;
      }

      .status{
        color: lightgreen;
      }
    }

    @media (max-width: 768px){
      .text-edit{

      }
    }
  }

  .endtag{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.3rem;

    .icon{
      font-size: 40px;
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;

      &:hover{
        background-color: rgba(255,255,255,0.1);
      }
    }

    .line{
      font-size: 30px;
      color: gray;
      transform: rotatez(270deg);
    }

    @media (max-width: 768px){
      .phone{
        display: none;
      }
    }
  }
  
  &:hover{
    background-color: #333;
  }
`