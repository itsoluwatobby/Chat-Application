import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { axiosAuth } from '../../app/axiosAuth';
import { useChatContext } from '../../hooks/useChatContext';
import { BsCheck, BsCheckAll } from 'react-icons/bs';

export const ChatBody = ({ socket, setEmojiOpen }) => {
  const { 
    messages, setMessages, chatId, currentUser, welcomeMessage, num, isChatOpened, setReference, setOpenGroupInfo } = useChatContext();
  const currentUserId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
        isMounted && setMessages([...messages.data])
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

  // const onMessageRef = (message) => {
  //   setReference(message)
  //   setIsReferenced(true)
  // }

  const messageContent = (
            <>
              {
                messages?.map(message =>  
                  (
                    <div 
                      onDoubleClick={() => setReference(message)}
                      ref={messageRef}
                      className={message?.senderId === currentUserId ? 'owner' : 'friend'} 
                      key={message?._id}>
                        <>
                          {message?.referencedMessage?._id &&
                            <div className='copied'>
                              <p className='referenced_message'>
                                <span className='sender'>
                                  {
                                    currentUser?._id === message?.referencedMessage?.senderId 
                                      ? 
                                        'You' : message?.referencedMessage?.username
                                  }
                                </span>
                                <span className='text'>
                                  {
                                    message?.referencedMessage?.text.split(' ').length > 22 
                                      ?
                                      message?.referencedMessage?.text.slice(0, 105) + '...' : message?.referencedMessage?.text 
                                  }
                                </span>
                              </p>
                            </div>
                          }
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
                        </>
                      {/* {chatViewed && <span>user viewed your chat</span>} */}
                    </div>
                  ) 
                )
              }
            </>
          )

  return (
    <ChatBodyComponent onClick={() => {
        setEmojiOpen(false)
        setOpenGroupInfo(false)
      }}>
      {/*{!loading && error && <p className='start'>{error}</p>} */}
      {
        (messages?.length || (
          welcomeMessage && chatId?.groupName
          )) ? messageContent 
          :
            <p className='start'>
              {loading ? 
                <span className='loading'>loading messages...</span> 
                : 
                <span className='start_convo'>Start a conversation</span>}
            </p> 
      }
          {/* {chatId?.groupName && <p className='group_message'>{welcomeMessage}</p>} */}
    </ChatBodyComponent>
  )
}

const ChatBodyComponent = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
gap: 0.3rem;
padding: 0.5rem 0.4rem;
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

  .group_message{
    color: gray;
    font-size: 15px;
    text-align: center;
    font-family: mono-space;
    letter-spacing: 5px;
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
    gap: 0.15rem;
    border-radius: 10px;
    padding: 0.2rem 0.55rem;

    .copied{
      background-color: #363636;
      width: 100%;
      border-radius: 5px 5px;
      padding: 0.35rem;
      border-left: 3px solid rgba(0,255,205,0.85); 

      .referenced_message{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 0.15rem;

        .sender{
          color: rgb(0,255,200,0.7);
          text-transform: capitalize;
          font-size: 12px;
        }

        .text{
          white-space: wrap;
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          font-family: mono;
        }
      }
    }

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
