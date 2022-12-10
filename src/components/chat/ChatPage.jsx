import { conversations } from '../../data';
import { useChatContext } from '../../hooks/useChatContext';
import styled from 'styled-components'
import { ChatHeading } from './ChatHeading'
import { EmptyChat } from '../EmptyChat';
import { ChatBody } from './ChatBody';
import { ChatBase } from './ChatBase';

export const ChatPage = () => {
  const {chatId} = useChatContext()
  const conversation = conversations.find(convo => convo.id == chatId)

  return (
    <ChatMessage>
      {chatId ?
        <>
          <ChatHeading conversation={conversation}/>
          <ChatBody />
          <ChatBase />
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
overflow-y: scroll;
overflow-x: hidden;

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
`
