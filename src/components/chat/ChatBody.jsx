import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { axiosAuth } from '../../app/axiosAuth'
import { useChatContext } from '../../hooks/useChatContext'
import { CopiedText } from './CopiedText'
import { BsCheck, BsCheckAll } from 'react-icons/bs';

export const ChatBody = ({socket}) => {
  const {messages, setMessages, chatId, currentUser, num, isChatOpened } = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [reference, setReference] = useState({});
  const [isReferenced, setIsReferenced] = useState(false);
  const [chatViewed, setChatViewed] = useState(false);
  const messageRef = useCallback(node => {
    node && node.scrollIntoView({ smooth: true })
  }, []);

  useEffect(() => {
    isChatOpened && socket.emit('chat_opened', {userId: currentUserId, isChatOpened})
  }, [])
  
  useEffect(() => {
    socket.on('isOpened', bool => {
      setChatViewed(bool)
      console.log(bool)
    })
  }, [isChatOpened])

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
  
  //console lastMessage => messages.

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
  }

  const onMessageRef = (message) => {
    setReference(message)
    setIsReferenced(true)
  }

  const messageContent = (
            <>
              {
                messages?.map((message, index) =>
                  <div 
                    onDoubleClick={() => onMessageRef(message)}
                    ref={messageRef}
                    className={message?.senderId === currentUserId ? 'owner' : 'friend'} 
                    key={index}>
                    <p>{message?.text}</p>
                    <p className='message_base'>
                      {chatId?.groupName && (
                        message?.senderId === currentUserId ?
                          <span className='you'>You</span>
                          :
                          <span className='you'>{message?.username}</span>
                        )
                      }
                      <span className={chatId?.groupName ? 'time' : 'other'}>{message?.dateTime}</span>
                    </p>
                    {/* {chatViewed && <span>user viewed your chat</span>} */}
                  </div>
                )
              }
            </>
          )

  return (
    <ChatBodyComponent>
      {/*{!loading && error && <p className='start'>{error}</p>} */}
      {
        messages?.length ? messageContent 
          :
            <p className='start'>
              {loading ? 
                <span className='loading'>loading messages...</span> 
                : 
                <span className='start_convo'>Start a conversation</span>}
            </p> }
        <CopiedText 
          reference={reference} 
          setReference={setReference} 
          setIsReferenced={setIsReferenced} 
        />
    </ChatBodyComponent>
  )
}

const ChatBodyComponent = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
gap: 0.65rem;
padding: 0.5rem 0.7rem;
overflow-y: scroll;
overflow-x: hidden;
position: relative;

.start{
  margin: auto;
  font-family: cursive;
  word-spacing: 5px;
  letter-spacing: 5px;
  color: gray;
  text-align: center;

  .loading{
    color: rgba(0,200,0,0.6);
  }

  .start_convo{

  }
}

  .owner{
    background-color: rgba(0,200,0,0.2);
    align-self: flex-end;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.2);

    span{
      font-size: 13px;
      color: lightgray;
      text-align: right;
    }
  }

  .friend{
    background-color: rgba(0,0,0,0.3);
    align-self: flex-start;
    text-align: left;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.25);

    span{
      font-size: 13px;
      color: lightgray;
      text-align: left;
    }
  }

  div{
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 40%;
    gap: 0.25rem;
    border-radius: 10px;
    padding: 0.2rem 0.55rem;

    p{
      white-space: wrap;
    }

    .message_base{
      display: flex;
      align-items: center;
      justify-content: space-between;

      .time{
        color: rgba(255,255,255,0.5);
        font-size: 11px;
      }

      .you{
        color: rgba(255,255,255,0.75);
        font-family: cursive;
        font-size: 13px;
      }

    }
    
    .other{
      width: 100%;
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
