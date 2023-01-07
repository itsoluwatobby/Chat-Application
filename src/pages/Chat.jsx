import styled from 'styled-components'
import { AddNewConversation } from '../components/chat/AddNewConversation'
import { GroupConvo } from '../components/chat/GroupConvo'
import { ChatPage } from '../components/chat/ChatPage';
import { Left } from '../components/Left';
import { Main } from '../components/Main';
import { useChatContext } from '../hooks/useChatContext';
import { useGetOthers } from '../hooks/useGetOthers';

export const Chat = () => {
  const {click, open} = useChatContext();
  const currentUserId = localStorage.getItem('userId');
  const [result] = useGetOthers(currentUserId)
     
  return (
    <ChatApp>
      <Left />
      <Main />
      <ChatPage result={result}/>
      {click && <AddNewConversation result={result}/> || open && <GroupConvo result={result}/> }
    </ChatApp>
  )
}
//add group convo

const ChatApp = styled.div`
height: 100vh;
width: 100vw;
display: flex;
padding: 0.5rem;
align-items: center;
position: relative;
  
`
