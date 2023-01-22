import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { axiosAuth } from '../../app/axiosAuth';
import { useChatContext } from '../../hooks/useChatContext';
import { BsCheck, BsCheckAll } from 'react-icons/bs';
import LoadingEffect from '../../assest/Eclipse-1s-118px.svg';

export const ChatBody = ({ socket }) => {
  const { 
    messages, setMessages, chatId, setEmojiOpen, currentUser, welcomeMessage, num, isChatOpened, setReference, setOpenGroupProfile, conversation
   } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatViewed, setChatViewed] = useState(false);
  // const [isEquals, setIsEquals] = useState(false);
  // const [extract, setExtract] = useState(false);
  const [targetConvo, setTargetConvo] = useState({});
  const [isCurrentChat, setIsCurrentChat] = useState(false);
  //const [isCurrentChatMessage, setIsCurrentChatMessage] = useState({});
  
  const messageRef = useCallback(node => {
    node && node.scrollIntoView({ smooth: true })
  }, []);
  
  useEffect(() => {
    let isMounted = true
    socket.on('isOpened', bool => {
      isMounted && setChatViewed(bool)
    })
    return () => isMounted = false
  })

  useEffect(() => {
    let isMounted = true
    socket.on('isClosed', bool => {
      isMounted && setChatViewed(bool)
    })
    return () => isMounted = false
  })

  useEffect(() => {
    //console.log({chatViewed})
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
        if(messages?.data[messages?.data?.length - 1]?.conversationId === chatId?.convoId){
          isMounted && setMessages([...messages?.data])
        } 
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
//targetConvo?.members?.includes
  useEffect(() => {
    const last = messages[messages.length - 1]
    //console.log(last)
    const result = currentUser?._id === last?.senderId
    setIsCurrentChat(result)
  }, [targetConvo?._id, messages])

  useEffect(() => {
    setTargetConvo({})
    let isMounted = true
    const controller = new AbortController();
    const getConversation = async() => {
      try{
        const {data} = chatId?.groupName 
            ? await axiosAuth(`/group_conversation/${chatId?.convoId}`, { signal: controller.signal })
              : await axiosAuth(`/conversation/${chatId?.convoId}`, { signal: controller.signal })
        isMounted && setTargetConvo({...data})
      }
      catch(error){
        setTargetConvo({})
        console.error(error.message)
      }
    }
    getConversation()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [chatId?.convoId])

  //console.log(isCurrentChat)


  const copyText = (text) => {
    navigator.clipboard.writeText(text)
  }

  const messageExtract = (
    <section 
    //onMouseEnter={() => setExtract(true)}
      className='message_extract'>
      helloghgj jygvvgvytviiyiu iuiii
    </section>
  )

  const messageContent = (
            <>
              {
                messages?.map(message =>  
                  (
                    <article 
                      onDoubleClick={() => setReference(message)}
                      // onMouseEnter={() => setExtract(true)}
                      // onMouseLeave={() => setExtract(false)}
                      ref={messageRef}
                      className={message?.senderId === currentUser?._id ? 'owner' : 'friend'} 
                      key={message?._id}>
                        {/* {extract && <button>hello</button>} */}
                        <div>
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
                              message?.senderId === currentUser?._id ?
                                <span className='you'>You</span>
                                :
                                <span className='you'>{message?.username}</span>
                              )
                            }
                            <span className={`dateTime ${chatId?.groupName ? 'time' : 'other'}`}>
                              {message?.dateTime}
                              <BsCheckAll className={`checks ${message?.isMessageRead ? 'color' : null}`}/>
                            </span>
                          </p>
                        </div>
                      {/* {chatViewed && <span>user viewed your chat</span>} */}
                    </article>
                  )  
                )
              }
            </>
          )

  return (
    <ChatBodyComponent onClick={() => {
        setEmojiOpen(false)
        setOpenGroupProfile(false)
      }}>
      {/*{!loading && error && <p className='start'>{error}</p>} */}
      {
        (messages?.length || (
          welcomeMessage && chatId?.groupName
          )) ? messageContent 
          :
            <p className='start'>
              {loading ? 
                // <span className='loading'>loading messages...</span> 
                <img src={LoadingEffect} alt="loading messages..." className='loading_effect'/>
                : 
                <span className='start_convo'>Start a conversation</span>}
            </p> 
      }

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

.message_extract{
  position: absolute;
  background-color: #393936;
  border-radius: 5px;
  height: 6rem;
  width: 8rem;
  box-shadow: 2px 4px 16px rgba(0,0,0,0.3);
  top: 10rem;
  padding: 5px;
}

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

  article{
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 40%;
    gap: 0.15rem;
    font-size: 13px;
    border-radius: 10px;
    padding: 0.2rem 0.28rem 0.1rem 0.3rem;
    cursor: default;
    position: relative;

    .copied{
      background-color: #363636;
      max-width: 100%;
      border-radius: 5px 5px;
      padding: 0.25rem 0.35rem;
      border-left: 3px solid rgba(0,255,205,0.85); 

      .referenced_message{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 0.15rem;

        .sender{
          color: rgb(0,255,200,0.85);
          text-transform: capitalize;
          font-size: 12px;
        }

        .text{
          white-space: pre-wrap;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          font-family: mono;
          text-align: left;
          word-wrap: break-word;
        }
      }
    }

    p{
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .message_base{
      display: flex;
      align-items: center;
      justify-content: space-between;

      .time{
        color: rgba(255,255,255,0.5);
        font-size: 10px;
      }

      .you{
        color: rgba(255,255,255,0.75);
        font-family: cursive;
        font-size: 10px;
      }

      .dateTime{
        display: flex;
        align-items: center;
        justify-content: right;

        .checks{
          margin-left: 0.2rem;
          font-size: 20px;
        }
      }

      .color{
        color: rgba(0,205,0,0.95);
      }
    }

    
    .other{
      width: 100%;
      text-align: right;
      font-size: 10px;
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
