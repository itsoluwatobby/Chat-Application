import {BsChatText} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {HiOutlineStatusOnline} from 'react-icons/hi'
import styled from 'styled-components'

export const Left = () => {
  return (
    <LeftSection>
      <div className='top'>
        <BsChatText title='Chats' className='chat'/>
        <HiOutlineStatusOnline title='Status' className='status'/>
      </div>
      <div className='base'>
        <FiSettings title='Settings' className='settings'/>
        <div title='Profile' className='image'>
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="" />
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
