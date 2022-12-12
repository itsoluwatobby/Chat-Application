import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useChatContext } from '../../hooks/useChatContext'
import {useSelector, useDispatch} from 'react-redux'
import { getCurrentUser } from '../../features/authSlice'
import { getAllMessages, getMessages, messageError, messageLoading, selectConversation } from '../../features/messageSlice'

export const ChatBody = () => {
  const [count,  setCount] = useState(0);
  const {messages, setMessages, chatId} = useChatContext()
  const currentUser = useSelector(getCurrentUser)
  const currentConversation = useSelector(selectConversation)
  const allMessages = useSelector(getAllMessages)
  const loading = useSelector(messageLoading)
  const errorMessage = useSelector(messageError)
  const dispatch = useDispatch()

  // const userMessages = messages.filter(msg => {
  //   const ans = msg?.senderId !== currentUser._id ? true : false
  //   return ans
  // })

  console.log('messages',allMessages)
  console.log({chatId})
  console.log(currentConversation)

  const reload = () => setCount(prev => prev + 1)

  useEffect(() => {
    let isMounted = true

    const fetchMessages = async() => {
      try{
        isMounted && await dispatch(getMessages(currentConversation?._id)).unwrap()
        reload()
      }catch(error){
        console.log(errorMessage)
      }
    }
    currentConversation && fetchMessages()

    return () => isMounted = false

  }, [currentConversation?._id])

  useEffect(() => {
    let isMounted = true
    isMounted && setMessages(prev => [...prev, allMessages])
    return () => isMounted = false
  }, [count])

  return (
    <ChatBodyComponent user={false}>
      {loading && <p>loading messages...</p>}
      {!loading && errorMessage && <p>{errorMessage}</p>}
      {messages?.length >= 1 ? (
          messages.map(message =>
            <div key={message?._id}>
              <p>{message?.text}</p>
              <span>{message?.createdAt}</span>
            </div>
          )
        ) : <p>Start a conversation</p>
      }
    </ChatBodyComponent>

  )
}

const ChatBodyComponent = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 1rem;
padding: 0.5rem 0.7rem;
align-items: ${props => props.user ? 'flex-start' : 'flex-end'};

  div{
    display: flex;
    flex-direction: column;
    max-width: 70%;
    border-radius: 10px;
    padding: 0.3rem 0.5rem;
    background-color: ${props => props.user === 1 ? 'green' : 'rgba(255,255,255,0.09)'};

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
