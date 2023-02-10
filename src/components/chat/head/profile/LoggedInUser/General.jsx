import React from 'react'
import styled from 'styled-components';
import { BiMoon } from 'react-icons/bi'
import { MdLightMode } from 'react-icons/md'
import { useChatContext } from '../../../../../hooks/useChatContext';

export const General = () => {
  const { setMode, mode } = useChatContext()
  return (
    <GeneralComponent>
      <h2>General</h2>
      <div className='theme'>
        <h2>Theme</h2>
        <p>App color theme</p>
        <button
          //onClick={() => setMode(prev => !prev)}
        >
          {
            mode ? <BiMoon className='icon' /> : <MdLightMode className='icon' />
          }
          {mode ? 'Dark' : 'Light'}
        </button>
      </div>
    </GeneralComponent>
  )
}

const GeneralComponent = styled.section`
padding: 0.7rem;
display: flex;
flex-direction: column;
gap: 1rem;

h2{
  font-size: 17px;
}

  .theme{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    
    p{
      color: gray;
    }

    button{
      border-radius: 5px;
      background-color: rgba(255,255,255,0.1);
      border: none;
      box-shadow: 2px 3px 12px rgba(0,0,0,0.2);
      padding: 0.5rem;
      width: 10rem;
      color: white;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      transition: all 0.15s ease-in-out;

      &:focus{
        outline: none;
      }

      .icon{
        color: white;
        rotate: -90deg;
        font-size: 18px;
      }

      &:hover{
        background-color: rgba(255,255,255,0.12);
      }
    }
  }
`
