import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { axiosAuth } from '../../app/axiosAuth'
import { useChatContext } from '../../hooks/useChatContext'

export const ChatBody = ({socket}) => {
  const {messages, setMessages, chatId, currentUser, num} = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const messageRef = useRef();

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [socket])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController();
    setLoading(true)
    const fetchMessages = async() => {
      try{
        const messages = await axiosAuth.get(`/messages/${chatId?.convoId}`, {
          signal: controller.signal
        })
        setMessages([...messages.data])
      }catch(error) {
        let errorMessage;
        error?.response?.status === 404 ? errorMessage = 'Say hello to start a conversation' :
        error?.response?.status === 500 ? errorMessage = 'internal error' : 
        errorMessage = 'no server response'
        setError(errorMessage)
      }finally{
        setLoading(false)
      }
    }
    fetchMessages()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [chatId, num])
  
  const content = (
            <>
              {
                messages.map((message, index) =>
                  <div 
                    className={message?.senderId === currentUserId ? 'owner' : 'friend'} 
                    key={index}>
                    <p>{message?.text}</p>
                    <span>{message?.dateTime}</span>
                  </div>
                )
              }
            </>
          )

  return (
    <ChatBodyComponent ref={messageRef}>
      {/* {loading && <p>in progress...</p>}
      {!loading && error && <p className='start'>{error}</p>} */}
      {
        messages?.length ? content 
          :
            <p className='start'>Start a conversation</p> }
    </ChatBodyComponent>

  )
}

const ChatBodyComponent = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
gap: 1rem;
padding: 0.5rem 0.7rem;
overflow-y: scroll;
overflow-x: hidden;

.start{
  margin: auto;
  font-family: cursive;
  word-spacing: 5px;
  letter-spacing: 5px;
  color: gray;
  text-align: center;
}

  .owner{
    background-color: red;
    align-self: flex-end;
  }

  .friend{
    background-color: gray;
    align-self: flex-start;
  }

  div{
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 40%;
    border-radius: 10px;
    padding: 0.3rem 0.5rem;

    p{
      white-space: wrap;
    }

    span{
      font-size: 13px;
      color: lightgray;
      text-align: right;
    }
  }

  &::-webkit-scrollbar{
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
  }
`
