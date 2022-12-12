import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AddNewConversation } from '../components/chat/AddNewConversation'
import { ChatPage } from '../components/chat/ChatPage';
import { Left } from '../components/Left';
import { Main } from '../components/Main';
import { useChatContext } from '../hooks/useChatContext';


export const Chat = () => {
  const {click, setClick} = useChatContext()
   
  return (
    <ChatApp>
      <Left />
      <Main />
      <ChatPage />
      {click && <AddNewConversation />}
    </ChatApp>
  )
}

const ChatApp = styled.div`
height: 100vh;
width: 100vw;
display: flex;
padding: 0.5rem;
align-items: center;
position: relative;
  
`
