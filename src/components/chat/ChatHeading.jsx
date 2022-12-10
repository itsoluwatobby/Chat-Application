import {CiSearch} from 'react-icons/ci';
import {VscDeviceCameraVideo} from 'react-icons/vsc';
import {HiOutlinePhone} from 'react-icons/hi';
import {AiOutlineLine} from 'react-icons/ai';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

export const ChatHeading = ({conversation}) => {
  const [width, setWidth] = useState(undefined)

  useEffect(() => {
    const widthListener = () => setWidth(window.innerWidth);
    window.addEventListener('resize', widthListener)

    return () => {
      window.removeEventListener('resize', widthListener)
      // setWidth(undefined)
    }

  }, [width])
  
  return (
    <Heading>
      <div>  
        <img src={conversation?.picture} alt={conversation?.name} 
          className='profile-picture'
        />
        <div className='detail'>
          <p className='text-edit'>{(width > 408 || width === 'undefined') ? conversation?.name : conversation?.name?.slice(0, 4)+'...'}</p>
          <p className='base text-edit'>{(width > 408 || width === 'undefined') ? 'last seen at' : 'last...'} {width > 408 ? conversation?.lastSeen : ''}</p>
        </div>
      </div>
      <div className='endtag'>
        <VscDeviceCameraVideo className='icon'/>
        <HiOutlinePhone className='icon'/>
        <AiOutlineLine className='line'/>
        <CiSearch className='icon'/>
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
    }

    @media (max-width: 768px){
      .text-edit{

      }
    }
  }

  .endtag{
    display: flex;
    align-items: center;
    gap: 0.5rem;

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
      transform: rotatez(270deg);
    }
  }
  
  &:hover{
    background-color: #333;
  }
`