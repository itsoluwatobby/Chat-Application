import {BsChatText} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {HiOutlineStatusOnline} from 'react-icons/hi'
import styled from 'styled-components'
import { useChatContext } from '../hooks/useChatContext'

export const Left = () => {
  const {currentUser} = useChatContext()
  const isOnline = currentUser?.status === 'online' ? true : undefined 
 
  return (
    <LeftSection>
      <div className='top'>
        <BsChatText title='Chats' className='chat'/>
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
