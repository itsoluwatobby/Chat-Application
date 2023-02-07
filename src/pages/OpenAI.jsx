import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import {BsFillChatLeftDotsFill} from 'react-icons/bs';
import {IoMdSend} from 'react-icons/io';
import {FiUser} from 'react-icons/fi';
import {FaTrash} from 'react-icons/fa';
import {SiReactos} from 'react-icons/si';
import { openaiAxios } from '../app/axiosAuth';
import { useChatContext } from '../hooks/useChatContext';
import { useNavigate } from 'react-router-dom';
import Rolling from '../assest/Rolling-1s-84px.svg'; 

export const OpenAI = () => {
  const {setToggle} = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [userInput, setUserInput] = useState('');
  const [responseMessage, setResponseMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef()

  const responseAutoScroll = useCallback((node) => {
    node && node.scrollIntoView({ smooth: true })
  }, [])

  const onUserInputChange = e => setUserInput(e.target.value);

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const openaiRequest = async() => {
    if(!userInput) return
    const initialState = { userInput, userId: currentUserId }
    setIsLoading(true)
    try{
      setUserInput('')
      const res = await openaiAxios.post(`/your_response`, initialState)
      setResponseMessage([...responseMessage, res?.data])
    }
    catch(error){
      setIsLoading(false)
      let errorMessage;
      !error?.response ? errorMessage = 'No server response' :
      error?.response?.status === 400 ? errorMessage = 'userId required' :
      error?.response?.status === 403 ? errorMessage = 'no have no response' :
      error?.response?.status === 500 ? errorMessage = 'No server response' 
      : errorMessage = "I'm lost of words";
    }finally{
      setIsLoading(false)
    }
  }

  const clearConversation = async() => {
    setIsLoading(true)
    try{
      await openaiAxios.delete(`/clear_conversation/${currentUserId}`)
      setResponseMessage([])
    }
    catch(error){
      setIsLoading(false)
      let errorMessage;
      !error?.response ? errorMessage = 'No server response' :
      error?.response?.status === 500 ? errorMessage = 'No server response' 
      : errorMessage = "I'm lost of words";
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const openaiResponse = async() => {
      setIsLoading(true)
      try{
        const res = await openaiAxios(`/your_responses/${currentUserId}`, {
          signal: controller.signal
        })
        const mapResult = res?.data.map(filt => filt.openAIRes.text.trimStart())
        setResponseMessage([...res?.data])
      }
      catch(error){
        setIsLoading(false)
        let errorMessage;
        !error?.response ? errorMessage = 'No server response' :
        error?.response?.status === 500 ? errorMessage = 'No server response'
        : errorMessage = "I'm lost of words";
      }finally{
        setIsLoading(false)
      }
    }
    openaiResponse()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [currentUserId])

  const switchToChat = () => {
    setToggle(false)
    navigate('/chat')
  }

  // function typingEffect(data){
  //   const nextIndex = 0
  //   const totalLength = data.length
  //   let res;
  //   setTimeout(() => nextIndex++ , 400)
  //   if(nextIndex < totalLength){
      
  //     res += data.slice(0, nextIndex);
  //   }
  //   return res
  // }

  return (
    <OpenAiChat>
      <aside>
        <div className='top'>
          <p className='new_chat'>New Chat +</p>
        </div>
        <div className='base'>
          <button
            onClick={clearConversation}
            disabled={isLoading}
          >
            <FaTrash className='trash'/>
            Clear Conversation
          </button>
        </div>
      </aside>
      <main>
        <ul className='body'>
          {!responseMessage.length ?
            <div className='openai'>
            <p className='icon'>
              <SiReactos />
            </p>
            <p>
              <span className='welcome'>
                Welcome to the new world where AI is making life easier.
                Ask me a question.
              </span>
              {/* <span className='welcome'>
               {typingEffect(dataRes)}
              </span> */}
            </p>
          </div>
            :
            responseMessage.map((aiResponse, i) => (
              <li 
                ref={responseAutoScroll}
                key={aiResponse?._id || i}>
                <div className='user'>
                  <p className='icon'>
                    <FiUser />
                  </p>
                  <p>{aiResponse?.userRequest}</p>
                </div>
                <div className='openai'>
                  <p className='icon'>
                    <SiReactos />
                  </p>
                  {/* {
                  aiResponse?.openAIRes?.text.trim().includes('1. ') 
                  ? 
                  <p className='list_form'>{
                    aiResponse?.openAIRes?.text.trim().split(/[\\d\.]/g).map((a, i) => (
                    <span key={i}>{a}</span>
                  ))}
                  </p>
                  : */}
                  {/*|| <span className='welcome'>Welcome to the new world where AI is making life easier.</span> */}
                  <p>{aiResponse?.openAIRes?.text.trim()}</p>
                  {/* } */}
                </div>
              </li>
            ))
          }
        </ul>
        {isLoading && <img src={Rolling} alt='submitting request' className='spinner' />}
        <div className='input_box'>
          <p className='icon icons'>
            <FiUser />
          </p>
          <div className='input_container'>
            <input 
              type="text" 
              ref={inputRef}
              value={userInput}
              onChange={onUserInputChange}
              onKeyDown={e => e.key === 'Enter' ? openaiRequest() : null}
              className='input'
            />
            <p className='send'>
              <IoMdSend onClick={openaiRequest} />
            </p>
          </div>
        </div>
        <div 
          onClick={switchToChat}
          className='chat_page'>
          <BsFillChatLeftDotsFill />
        </div>
      </main>
    </OpenAiChat>
  )
}

const OpenAiChat = styled.div`
width: 100vw;
height: 100vh;
display: flex;
overflow-x: hidden;

.icon{
  border: 1px solid white;
  padding: 0.3rem;
  border-radius: 5px;
  display: grip;
  place-content: center;
  font-size: 20px;
}

  aside{
    flex: 2;
    //min-width: 30vw;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;

    .top{
      flex: 7;
      padding: 0.8rem 1rem;
      width: 100%;

      .new_chat{
        padding: 0.3rem;
        border: 1px solid white;
        text-align: center;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.15s ease-in;
  
        &:hover{
          opacity: 0.6;
          color: rgba(255,255,255,0.99);
        }

        &:active{
          opacity: 0.8;
        }
      }
    }

    .base{
      flex: 3;
      display: flex;
      flex-direction: column;
      border-top: 1px solid gray;
      padding: 0.2rem;
      gap: 0.3rem;
      cursor: default;

      button{
        display: flex;
        align-items: center;
        padding: 0.8rem 0.3rem 0.8rem 0.8rem;
        border-radius: 5px;
        cursor: pointer;
        gap: 0.8rem;
        color: white;
        border: none;
        background-color: transparent;
        transition: all 0.15s ease-in-out;

        &:hover{
          background-color: rgba(255,255,255,0.06);
        }

        &:focus{
          outline: none;
        }

        &:active{
          background-color: rgba(255,255,255,0.1);
        }
      }
    }

    @media (max-width: 850px){
      display: none;
    }

  }

  main{
    flex: 8;
    min-width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    position: relative;

    .body{
      background-color: #363636;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      padding-bottom: 7rem;
      list-style: none;
      gap: 0;
      overflow-y: scroll;
      overflow-x: hidden;
      
      .openai{
        background-color: rgba(10,20,80,0.2);
        padding: 0.7rem 2rem;
        white-space: pre-wrap;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

        .list_form{
          display: flex;
          flex-direction: column;
          white-space: nowrap;
          width: 100%;
        }

        p{

          .welcome{
            text-align: center;
          }
        }
      }
  
      .user{
        background-color: #044474;
        padding: 0.7rem 2rem;
        //text-align: center;
        white-space: pre-wrap;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
  
        .icon{
          border: 1px solid white;
          padding: 0.3rem;
          border-radius: 5px;
          display: grip;
          place-content: center;
          font-size: 20px;
        }
      }

      &::-webkit-scrollbar{
        width: 2px;
      }
    
      &::-webkit-scrollbar-track {
        background: transparent;
      }
    
      &::-webkit-scrollbar-thumb {
        background: lightgray;
      }

    }

    .spinner{
      z-index: 600;
      position: absolute;
      bottom: 8rem;
      border-radius: 50%;
      width: 4rem;
      opacity: 0.85;
      filter: brightness(0.75);
    }

    .input_box{
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      border-top: 1px solid white;
      width: 100%;
      height: 7rem;
      padding: 0 0.8rem 0.5rem 0.8rem;
      gap: 0.3rem;
      background-color: #323234;
      z-index: 500;
      
      .icons{
        
      }

      .input_container{
        display: flex;
        align-items: center;
        background-color: transparent;
        height: 3rem;
        width: 100%;
        border: 1px solid gray;
        border-radius: 10px;

        .input{
          flex: 8;
          background-color: transparent;
          height: 100%;
          color: white;
          border-radius: 10px;
          border: none;
          padding: 0 0.4rem;
          font-size: 18px;
          font-family: mono;

          &:focus{
            outline: none;
          }
        }

        .send{
          flex: 1;
          font-size: 24px;
          display: grid;
          place-content: center;
          cursor: pointer;

          &:hover{
            opacity: 0.6;
          }

          &:active{
            opacity: 0.9;
          }
        }
      }
    }

    .chat_page{
      position: absolute;
      bottom: 8rem;
      right: 0.3rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: grid;
      place-content: center;
      background-color: rgba(0,0,0,0.4);
      cursor: pointer;
      font-size: 25px;
      color: gray;
      transition: all 0.15s ease-in-out;

      &:hover{
        opacity: 0.6;
        scale: 1.15;
      }

      &:active{
        opacity: 0.9;
        scale: 1;
      }
    }
  }
`
