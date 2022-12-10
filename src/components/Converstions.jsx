import React from 'react'
import styled from 'styled-components'

export const Converstions = ({conversation}) => {
  return (
    <Conversation>
      <img src={conversation?.picture} alt={conversation.name} 
        className='profile-picture'
      />
      <div className='detail'>
        <p className='top'>
          <span>{conversation?.name}</span>
          <span className='date'>{conversation?.lastSeen}</span>
        </p>
        <p className='base'>{conversation?.lastMessage.slice(0, 15)}...</p>
      </div>
    </Conversation>
  )
}

const Conversation = styled.div`
display: flex;
align-items: center;
gap: 1rem;
padding: 0.6rem;
border-radius: 5px;
z-index: 1;

  .profile-picture{
    width: 3.4rem;
    flex-grow: none;
    height: 3.4rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
  }

  .detail{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex-grow: 8;

    .top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .date{
        color: gray;
        font-size: 15px;
      }
    }

    .base{
      color: lightgray;
    }
  }

  &:hover{
    background-color: #333;
  }
`