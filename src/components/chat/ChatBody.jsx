import React, { useEffect } from 'react'
import styled from 'styled-components'
import { messages } from '../../data'
import { useChatContext } from '../../hooks/useChatContext'

export const ChatBody = () => {
  //const {message, messages} = useChatContext()
  const userId = 2

  useEffect(() => {

  }, [])

  return (
    <ChatBodyComponent>
      {messages.map(message =>
        <div key={message.id} msg={message.id === userId}>
          <p>{message?.text}</p>
          <span>{message?.timeStamp}</span>
        </div>
      )}
    </ChatBodyComponent>

  )
}

const ChatBodyComponent = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 1rem;
padding: 0.5rem 0.7rem;
align-items: ${props => props.msg ? 'flex-start' : 'flex-end'};

  div{
    display: flex;
    flex-direction: column;
    max-width: 70%;
    border-radius: 10px;
    padding: 0.3rem 0.5rem;
    background-color: ${props => props.msg === 1 ? 'green' : 'rgba(255,255,255,0.09)'};

    p{
      white-space: wrap;
    }

    span{
      font-size: 13px;
      color: lightgray;
      text-align: right;
    }
  }
`
