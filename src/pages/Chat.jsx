import {RiWhatsappFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Left } from '../components/Left'
import { Main } from '../components/Main'
import { Right } from '../components/Right'

export const Chat = () => {
  return (
    <ChatPage>
      <Left />
      <Main />
      <Right />
    </ChatPage>
  )
}

const ChatPage = styled.div`
height: 100vh;
width: 100vw;
display: flex;
padding: 0.5rem;
align-items: center;

  
`
