import {IoIosAttach} from 'react-icons/io'
import {BiSend} from 'react-icons/bi'
import {BsEmojiSmile} from 'react-icons/bs'
import {FaBlackTie, FaTimes} from 'react-icons/fa'
import {HiOutlineMicrophone} from 'react-icons/hi'
import styled from 'styled-components'
import { useChatContext } from '../../hooks/useChatContext'
import { useEffect, useState } from 'react'
import { CopiedText } from './CopiedText'

export const ChatBase = ({ sendMessage, socket, inputRef }) => {
  const {message, setMessage, chatId, setEmojiOpen, uploadToCloud, currentUser, reference, setOpenGroupProfile } = useChatContext();
  const [reveal, setReveal] = useState(true);
  const [image, setImage] = useState('');

  const onMessageChange = e => setMessage(e.target.value)
  const onImageChange = e => setImage(e.target.files[0])

  useEffect(() => {
    if(!image) return
    if(image?.size > 1448576){
      setImage('')
      return alert('Max allowed size is 1.4mb')
    }
    else{
     uploadToCloud(image)
    }
  }, [image])

  useEffect(() => {
    if(inputRef?.current?.value){
      socket.emit('typing', { username: currentUser?.username, userId: currentUser?._id, message:'typing...', conversationId: chatId?.convoId })
    }
    else{
      socket.emit('no-typing', { username: currentUser?.username, userId: currentUser?._id, message:'', conversationId: chatId?.convoId })
    }
  }, [message])
//setEmojiOpen(false)
  const imageReveal = (
    image &&
      <article className='main'>
        <img src={URL.createObjectURL(image)} alt="image reveal" style={imageStyle}
          className={`image`} />
        <FaTimes onClick={() => {
            setReveal(false)
            setImage('')
          }}
          className='trash'
        />     
      </article>
  )

  const send = () => {
    setReveal(false)
    setImage('')
    sendMessage()
  }
// || reference?.image
  return (
    <ChatBaseComponent>
      {reveal && imageReveal}
      {(reference?.text) &&
          <CopiedText />
        }
      <div>
        <BsEmojiSmile 
          className='icon'
          onClick={() => setEmojiOpen(prev => !prev)}  
        />
        <>
          <input 
            type="file" 
            id='image'
            onChange={onImageChange}
            accept= 'image/*'
            hidden
          />
          <label htmlFor="image">
            <IoIosAttach 
              onClick={() => {
                setEmojiOpen(false)
                //setOpenGroupProfile(false)
              }}
              className='icon no_icon'/>
          </label>
        </>
        <input 
          type="text" 
          ref={inputRef}
          placeholder='say your hello...'
          value={message}
          onKeyDown={e => e.key === 'Enter' ? send() : null}
          onChange={onMessageChange}
        />
        {(message || image) ? <BiSend onClick={send} className='icon'/> : <HiOutlineMicrophone className='icon'/>}
      </div>
    </ChatBaseComponent>
  )
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '20px'
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

  .main{
    position: fixed;
    bottom: 4rem;
    width: 270px;
    height: 220px;
    border-radius: 20px;
    border: 2px solid white;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.25);
    box-sizing: border-box;
    background-color: rgba(20,255,255,0.22);
  
    .trash{
      position: absolute;
      color: rgba(0,0,0,0.6);
      background-color: lightgray;
      box-shadow: 2px 4px 16px rgba(0,0,0,0.5);
      border-radius: 50%;
      top: 8px;
      right: 0.4rem;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.15s ease-in-out;

      &:hover{
        color: rgba(0,0,0,0.7);
        scale: 0.95;
      }

      &:active{
        scale: 1;
      }
    }
  }
`