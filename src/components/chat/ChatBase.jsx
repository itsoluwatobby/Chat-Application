import {IoIosAttach} from 'react-icons/io'
import {BiSend} from 'react-icons/bi'
import {BsEmojiSmile} from 'react-icons/bs'
import {HiOutlineMicrophone} from 'react-icons/hi'
import styled from 'styled-components'
import { useChatContext } from '../../hooks/useChatContext'
import { useEffect, useRef, useState } from 'react'
import { CopiedText } from './CopiedText'

export const ChatBase = ({ sendMessage, socket, setEmojiOpen, inputRef }) => {
  const {message, setMessage, chatId, currentUser, reference, setReference,setIsReferenced } = useChatContext();
  
  const onMessageChange = e => setMessage(e.target.value)

  useEffect(() => {
    if(inputRef?.current?.value){
      socket.emit('typing', { username: currentUser?.username, userId: chatId?.userId, message:'typing...', conversationId: chatId?.convoId })
    }
    else{
      socket.emit('no-typing', { username: currentUser?.username, userId: chatId?.userId, message:'', conversationId: chatId?.convoId })
    }
  }, [message])


  return (
    <ChatBaseComponent>
      {reference?.text &&
          <CopiedText 
            reference={reference} 
            setReference={setReference} 
            setIsReferenced={setIsReferenced} 
          />
        }
      <div>
        <BsEmojiSmile 
          className='icon'
          onClick={() => setEmojiOpen(prev => !prev)}  
        />
        <IoIosAttach className='icon no_icon'/>
        <input 
          type="text" 
          ref={inputRef}
          placeholder='say your hello...'
          value={message}
          onKeyDown={e => e.key === 'Enter' ? sendMessage() : null}
          onChange={onMessageChange}
        />
        {message ? <BiSend onClick={sendMessage} className='icon'/> : <HiOutlineMicrophone className='icon'/>}
      </div>
    </ChatBaseComponent>
  )
}

const ChatBaseComponent = styled.div`
width: 100%;
display: flex;
flex-direction: column;
background-color: rgba(0,0,0,0.6);
position: sticky;
bottom: 0;
flex-grow: none;
padding: 0.4rem;

div{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    color: white;

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

      @media (max-width: 700px){

        .no_icon{
          display: none;
        }
      }
  }
`