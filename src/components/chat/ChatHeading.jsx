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

export const ChatHeading = ({user}) => {
  const [width, setWidth] = useState(undefined)
  const {setChatId, formatDate} = useChatContext()


  useEffect(() => {
    const widthListener = () => setWidth(prev => prev = window.innerWidth);
    window.addEventListener('resize', widthListener)

    return () => {
      window.removeEventListener('resize', widthListener)
      // setWidth(undefined)
    }

  }, [width])
  
  return (
    <Heading>
      <div>  
      {user?.profilePicture 
          ? 
            <img src={user?.profilePicture} alt={user.username} 
              className='profile-picture'/> 
            : <CgProfile className='pics'/>
      }
        <div className='detail'>
          <p className='text-edit'>{(width > 408 || width === 'undefined') ? user?.username : user?.username?.slice(0, 4)+'...'}</p>
          { user?.status !== 'online' ?
            <p className='base text-edit'>{(width > 408 || width === 'undefined') ? 'last seen ' : 'last...'} {width > 408 ? user?.lastSeen ? formatDate(user?.lastSeen) : '' : format(new Date(), 'p')}</p>
            :
            <p className='status text-edit'>online</p>
          }
        </div>
      </div>
      <div className='endtag'>
        <VscDeviceCameraVideo className='icon'/>
        <HiOutlinePhone className='icon'/>
        <AiOutlineLine className='line'/>
        <CiSearch className='icon'/>
        <FaTimesCircle 
          onClick={() => setChatId({})}
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
justify-content: space-between;
whitespace: nowrap;
position: sticky;
top: 0;
background-color: #333;

  div{
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    white-space: nowrap;

    .pics{
      font-size: 3.6rem;
      color: gray;
    }

    .profile-picture{
      width: 3rem;
      flex-grow: none;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
    }
  
    .detail{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
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
  }
  
  &:hover{
    background-color: #333;
  }
`