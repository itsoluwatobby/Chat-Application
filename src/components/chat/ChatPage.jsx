import { useChatContext } from '../../hooks/useChatContext';
import styled from 'styled-components'
import { ChatHeading } from './head/ChatHeading'
import { EmptyChat } from '../EmptyChat';
import { ChatBody } from './ChatBody';
import { ChatBase } from './ChatBase';
import { useEffect, useState } from 'react';
import {sub} from 'date-fns';
import { axiosAuth } from '../../app/axiosAuth';
import EmojiPicker from 'emoji-picker-react';

export const ChatPage = (
  { result, socket, inputRef, allUsers }) => {
  const { 
    chatId, setMessages, messages, setClick, reloadAll, setOpen, setMessage, message, emojiOpen, setEmojiOpen, currentUser, setResponse, reference, setReference, counterRef, setNotification, setIsChatOpened, notification, acceptedImage, setAcceptedImage
  } = useChatContext()
  const currentUserId = localStorage.getItem('userId') || ''
  const [targetUser, setTargetUser] = useState({});
  const [received, setReceived] = useState({});
  const [error, setError] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [incoming, setIncoming] = useState({});

  useEffect(() => {
    if(chatId?.userId){
      const foundUser = chatId?.userId && result.length && result.find(user => user._id === chatId?.userId)
      setTargetUser(foundUser)
    }else return
  }, [chatId.convoId])

  useEffect(() => {
    socket.emit('start-conversation', chatId?.convoId)
    socket.emit('chat_opened', {userId: currentUser?._id, isChatOpened: true })
  }, [chatId])

  const createMessage = async() => {
    if(!message) return
    const newMessage = { 
      conversationId: chatId?.convoId, receiverId: chatId?.userId,
      senderId: currentUserId, username: currentUser?.username, 
      text: message, dateTime: sub(new Date(), {minutes: 0}).toISOString(), 
      referencedId: reference?._id
    }
    const newMessageImage = { 
      conversationId: chatId?.convoId, receiverId: chatId?.userId,
      senderId: currentUserId, username: currentUser?.username, text: message, 
      image: acceptedImage, dateTime: sub(new Date(), {minutes: 0}).toISOString(), 
      referencedId: reference?._id
    }
    try{
      const {data} = !acceptedImage ? 
          await axiosAuth.post('/create_message', newMessage)
          :
          await axiosAuth.post('/create_message', newMessageImage)
      setMessage('')
      setEmojiOpen(false)
      setReference({})
      socket.emit('create_message', data)
      setMessages([...messages, data])
      setAcceptedImage(null)
    }catch(error) {
      let errorMessage;
      error.response.status === 500 ? errorMessage = 'internal error' : 
      errorMessage = 'no server response'
      setError(errorMessage)
    }
  }

  //receive message
  useEffect(() => {
    socket.on('new_message', (data) => setIncoming({...data}))
  }, [messages, chatId?.userId])
 
  useEffect(() => {
    if(incoming?.conversationId !== chatId?.convoId && incoming?.receiverId === currentUserId){
      console.log('notification')
      setNotification([...notification, {...incoming, orderId: counterRef.current++}])
    }
    else if(!chatId?.convoId && incoming?.receiverId === currentUserId){
      console.log('notification notification')
      setNotification([...notification, {...incoming, orderId: counterRef.current++}])
    }
    else if(incoming?.conversationId === chatId?.convoId){
      incoming && setMessages([...messages, incoming])
    }
  }, [incoming])

  useEffect(() => {
    //if(reloadAll == 2){
      socket.on('message_reload', messageReload =>{
        if(messageReload?.conversationId === chatId?.convoId){
          setMessages([...messageReload?.data])
        }
      })
    //}else return
  }, [messages])

  const pickEmoji = emoji => {
    let ref = inputRef?.current 
    let posStart = message.substring(0, ref?.selectionStart)
    let posEnd = message.substring(ref.selectionStart)
    let text = posStart + emoji + posEnd
    setMessage(text)
    setCursorPosition(posStart.length + emoji.length)
  }
// = message?.length
  // useEffect(() => {
  //   inputRef?.current?.length++
  // }, [cursorPosition])

  let emoji = (
    <div className='emoji_style'>
      <EmojiPicker 
        height={'20rem'} width={'18rem'}
        theme={'dark'} emojiStyle={'google'}
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
            allUsers={allUsers} 
            setIsChatOpened={setIsChatOpened}
          />
          <ChatBody 
            emojiOpen={emojiOpen}    
            socket={socket}
            inputRef={inputRef}
            otherUsers={result}
          />
          <ChatBase  
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
