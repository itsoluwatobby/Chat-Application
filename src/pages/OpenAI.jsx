import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/io'
import {FiUser} from 'react-icons/fi'
import {SiReactos} from 'react-icons/si'
import { openaiAxios } from '../app/axiosAuth'
import { useChatContext } from '../hooks/useChatContext'

export const OpenAI = () => {
  const currentUserId = localStorage.getItem('userId')
  const [userInput, setUserInput] = useState('');
  const [responseMessage, setResponseMessage] = useState([]);
  
  const responseAutoScroll = useCallback((node) => {
    node && node.scrollIntoView({ smooth: true })
  }, [])

  const onUserInputChange = e => setUserInput(e.target.value);

  const openaiRequest = async() => {
    if(!userInput) return
    const initialState = { userInput, userId: currentUserId }
    try{
      const res = await openaiAxios.post(`/your_response`, initialState)
      setUserInput('')
      setResponseMessage([...responseMessage, res?.data])
    }
    catch(error){
      let errorMessage;
      !error?.response ? errorMessage = 'No server response' :
      error?.response?.status === 400 ? errorMessage = 'userId required' :
      error?.response?.status === 403 ? errorMessage = 'no have no response' :
      error?.response?.status === 500 ? errorMessage = 'No server response' 
      : errorMessage = "I'm lost of words";
    }
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const openaiResponse = async() => {
      try{
        const res = await openaiAxios(`/your_responses/${currentUserId}`, {
          signal: controller.signal
        })
        console.log(res?.data)
        setResponseMessage([...res?.data])
      }
      catch(error){
        let errorMessage;
        !error?.response ? errorMessage = 'No server response' :
        error?.response?.status === 500 ? errorMessage = 'No server response'
        : errorMessage = "I'm lost of words";
      }
    }
    openaiResponse()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [currentUserId])

  return (
    <OpenAiChat>
      <aside>
        <div className='top'>
          <p className='new_chat'>New Chat +</p>
        </div>
        <div className='base'>
          will be back
        </div>
      </aside>
      <main>
        <ul className='body'>
          {responseMessage.map(aiResponse => (
              <li 
                ref={responseAutoScroll}
                key={aiResponse?._id}>
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
                  <p>{aiResponse?.openAIRes?.text.trimStart() || <span className='welcome'>Welcome to the new world where AI is making life easier.</span>}</p>
                </div>
              </li>
            ))
          }
        </ul>
        <div className='input_box'>
          <p className='icon icons'>
            <FiUser />
          </p>
          <div className='input_container'>
            <input 
              type="text" 
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
    flex: 2.5;
    min-width: 30vw;
    background-color: #323234;
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
      border-top: 1px solid gray;
    }

  }

  main{
    flex: 7.5;
    min-width: 70vw;
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
  }
`
