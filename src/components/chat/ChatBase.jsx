import {IoIosAttach} from 'react-icons/io'
import {BiSend} from 'react-icons/bi'
import {BsEmojiSmile} from 'react-icons/bs'
import {HiOutlineMicrophone} from 'react-icons/hi'
import styled from 'styled-components'
import { useChatContext } from '../../hooks/useChatContext'
import { useEffect, useRef, useState } from 'react'

export const ChatBase = ({ sendMessage, socket }) => {
  const {message, setMessage, chatId} = useChatContext();
  const inputRef = useRef();
  
  const onMessageChange = e => setMessage(e.target.value)

  //typing event
  // useEffect(() => {
  //   const eventLis = () => socket.emit('typing', {user: chatId?.userId, message:'typing...'})
  //   inputRef.current.addEventListener('keydown', eventLis)
  //   if(!message){
  //     //inputRef.current.removeEventListener('keyup', eventLis)
  //     socket.emit('no-typing', { user: chatId?.userId })
  //   }
  // }, [message])

  return (
    <ChatBaseComponent>
      <BsEmojiSmile className='icon'/>
      <IoIosAttach className='icon'/>
      <input 
        type="text" 
        ref={inputRef}
        placeholder='say your hello...'
        value={message}
        onChange={onMessageChange}
      />
      {message ? <BiSend onClick={sendMessage} className='icon'/> : <HiOutlineMicrophone className='icon'/>}
    </ChatBaseComponent>
  )
}

const ChatBaseComponent = styled.div`
flex-grow: none;
height: 65px;
width: 100%;
display: flex;
padding: 0.4rem 0.1rem;
align-items: center;
gap: 0.2rem;
color: white;
background-color: rgb(20,10,0);
position: sticky;
bottom: 0;

  input{
    flex-grow: 1;
    border: none;
    height: 100%;
    padding: 0 0.2rem;
    background-color: transparent;
    color: white;
    font-size: 15px;

    &:focus{
      outline: none;
    }

    &::placeholder{
      color: rgba(255,255,255,0.4);
    }
  }

  .icon{
    font-size: 40px;
    cursor: pointer;
    padding: 10px;
    flex-grow: none;
    border-radius: 5px;

    &:hover{
      background-color: rgba(255,255,255,0.1);
    }
  }
`