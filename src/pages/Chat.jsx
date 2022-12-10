import {RiWhatsappFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ChatPage } from '../components/chat/ChatPage'
import { Left } from '../components/Left'
import { Main } from '../components/Main'


export const Chat = () => {
  return (
    <ChatApp>
      <Left />
      <Main />
      <ChatPage />
    </ChatApp>
  )
}

const ChatApp = styled.div`
height: 100vh;
width: 100vw;
display: flex;
padding: 0.5rem;
align-items: center;
  
`
