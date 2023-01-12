import { useChatContext } from '../../hooks/useChatContext';
import styled from 'styled-components'
import { ChatHeading } from './head/ChatHeading'
import { EmptyChat } from '../EmptyChat';
import { ChatBody } from './ChatBody';
import { ChatBase } from './ChatBase';
import { useEffect, useState } from 'react';
import {format} from 'date-fns';
import { axiosAuth } from '../../app/axiosAuth';
import EmojiPicker from 'emoji-picker-react';

export const ChatPage = ({ result, socket, inputRef }) => {
  const { 
    chatId, setMessages, messages, setClick, setOpen, 
    setMessage, message, currentUser, setResponse, 
    counterRef, notification, setNotification, setIsChatOpened 
  } = useChatContext()
  const currentUserId = localStorage.getItem('userId') || ''
  const [targetUser, setTargetUser] = useState({});
  const [received, setReceived] = useState({});
  const [error, setError] = useState(null)
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);

  useEffect(() => {
    if(chatId?.userId){
      const foundUser = result.length && result.find(user => user._id === chatId?.userId)
      setTargetUser(foundUser)
    }else return
  }, [chatId.convoId])

  useEffect(() => {
    socket.emit('start-conversation', chatId?.convoId)
  }, [chatId])


  const createMessage = async() => {
    if(!message) return
    const newMessage = { 
      conversationId: chatId?.convoId,
      senderId: currentUserId, username: currentUser?.username, 
      text: message, dateTime: format(new Date(), 'p')
    }
    try{
      const {data} = await axiosAuth.post('/create_message', newMessage)
      setMessage('')
      setEmojiOpen(false)
      //setMessages(prev => [...prev, data])
      setReceived(data)
    }catch(error) {
      let errorMessage;
      error.response.status === 500 ? errorMessage = 'internal error' : 
      errorMessage = 'no server response'
      setError(errorMessage)
    }
  }
//if(chatId?.convoId !== data[data.length - 1]?.conversationId) {
  //receive message
  useEffect(() => {
    socket.emit('create_message', received)
    socket.on('new_message', (data) => { 
      if(data?.conversationId !== chatId?.convoId) {
        setNotification(prev => [...prev, {...data, orderId: counterRef.current++}])
        setReceived({})
      }
      else {
        setMessages([...messages, data])
        setReceived({})
      }
    })
  })

  // const sendMessage = async() => {
  //   const newMessage = { 
  //     conversationId: chatId?.convoId,
  //     senderId: currentUserId, username: currentUser?.username, 
  //     text: message, dateTime: format(new Date(), 'p')
  //   }
  //   await socket.emit('create-message', [...messages, newMessage])
  //   await createMessage(newMessage)
  //   setMessage('')
  // }

  const pickEmoji = emoji => {
    let ref = inputRef?.current 
    let posStart = message.substring(0, ref?.selectionStart)
    let posEnd = message.substring(ref.selectionStart)
    let text = posStart + emoji + posEnd
    setMessage(text)
    setCursorPosition(posStart.length + emoji.length)
  }
  useEffect(() => {
    //inputRef?.current?.value.length = cursorPosition
  }, [cursorPosition])

  let emoji = (
    <div className='emoji_style'>
      <EmojiPicker 
        height={'20rem'} width={'18rem'}
        theme={'dark'} emojiStyle={'facebook'}
        previewConfig={
          {showPreview: false}
        }
        lazyLoadEmojis={true}
        searchDisabled={true}
        searchPlaceHolder={'pick one'}
        suggestedEmojisMode={'recent'}
        onEmojiClick={(emojiData, event) => {
          pickEmoji(emojiData?.emoji)
          
        }}  
      />
    </div>
  )

  return (
    <ChatMessage onClick={() => {
      setClick(false)
      setOpen(false)
      }}>
      {chatId?.convoId ?
        <>
          <ChatHeading 
            user={targetUser} 
            socket={socket} 
            result={result}
            setEmojiOpen={setEmojiOpen} 
            setIsChatOpened={setIsChatOpened}
          />
          <ChatBody 
            emojiOpen={emojiOpen} 
            setEmojiOpen={setEmojiOpen}   
            socket={socket}
          />
          <ChatBase 
            setEmojiOpen={setEmojiOpen} 
            sendMessage={createMessage} 
            socket={socket}
            inputRef={inputRef}
          />
          {emojiOpen && emoji}
        </>
        :
        <EmptyChat />
      }
    </ChatMessage>
  )
}

const ChatMessage = styled.div`
height: 100%;
flex-grow: 6;
display: flex;
flex-direction: column;
background-color: #333333;
justify-content: space-between;
padding: 0;
align-items: center;
overflow: hidden;
position: relative;

  .emoji_style{
    position: absolute;
    bottom: 3.5rem;
    left: 0.2rem;
  }

  @media (max-width: 468px){
    flex-grow: 7;
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

  // @media (max-width: 908px){
  //   flex-grow: none;
  //   min-width: 450px;
  // }

  // @media (max-width: 468px){
  //   flex-grow: none;
  //   max-width: 150px;
  // }
`
