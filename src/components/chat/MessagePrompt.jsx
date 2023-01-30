import React from 'react'
import styled from 'styled-components'

export const MessagePrompt = ({ setConfirmGroupName }) => {
  return (
    <BoxPrompt>
      <div className='top'>
        <p>To continue, provide a group subject.</p>
      </div>
      <div className='base'>
        <button onClick={() => setConfirmGroupName(true)}>Ok</button>
      </div>
    </BoxPrompt>
  )
}

const BoxPrompt = styled.div`
position: fixed;
display: flex;
flex-direction: column;
min-width: 55vw;
height: 25vh;
gap: 0;
border-radius: 20px;
font-size: 15px;
border: 1px solid gray;
box-shadow: 2px 4px 16px rgba(0,0,0,0.2);
z-index: 999;
top: 13rem;
right: 12rem;
color: white;
box-sizing: border-box;

@media (min-width: 800px){
  min-width: 45vw;
  right: 22rem;
}

@media (min-width: 1050px){
  min-width: 40vw;
  right: 28rem;
}

@media (max-width: 600px){
  min-width: 75vw;
  right: 3rem;
}

  .top{
    background-color: #363938;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1.7rem;
    height: 50%;
    flex: 1;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .base{
    flex: 1;
    margin-top: 0;
    background-color: #333333;
    width: 100%;
    height: 50%;
    position: relative;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    button{
      padding: 0.5rem 3.5rem;
      background-color: rgba(255,255,255,0.06);
      transition: all 0.15s ease-in-out;
      position: absolute;
      right: 2rem;
      top: 2rem;
      color: white;
      border-radius: 5px;
      border: none;

      &:focus{
        outline: none;
      }

      &:hover{
        background-color: rgba(255,255,255,0.08);
      }
    }
  }
`
