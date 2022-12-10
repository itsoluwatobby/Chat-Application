import styled from 'styled-components'
import { conversations } from '../data'
import { Converstions } from './Converstions'
import { Search } from './Search'
import {useChatContext} from '../hooks/useChatContext'

export const Main = () => {
  const {setChatId} = useChatContext()
  
  return (
    <MainPage>
      
      <Search />
      {conversations.map(conversation => (
        <div
          key={conversation.id} 
          onClick={() => setChatId(prev => prev = conversation?.id)}
        >
          <Converstions conversation={conversation}/>
        </div>
        )
      )}
    </MainPage>
  )
}

const MainPage = styled.div`
height: 100%;
display: flex;
flex-grow: 2.5;
flex-direction: column;
gap: 0.8rem;
padding: 0 0.6rem;
overflow-y: scroll;

  &::-webkit-scrollbar{
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
  }

  @media (max-width: 908px){
    flex-grow: none;
    min-width: 270px;
  }

  @media (max-width: 468px){
    flex-grow: none;
    max-width: 150px;
  }
`
