import React from 'react'
import styled from 'styled-components'
import { conversations } from '../../data'
import { useChatContext } from '../../hooks/useChatContext'
import { SearchCon } from './SearchCon'
import { Users } from './Users'

export const AddNewConversation = () => {
  const {searchUsers, setSearchUsers} = useChatContext()

  const filteredSearch = conversations.filter(user => (user.username.toLowerCase()).includes(searchUsers.toLowerCase()))

  const resetSearch = () => {
    setSearchUsers('')
  }

  return (
    <NewConversation>
      <SearchCon />
      {filteredSearch.map(conversation => (
        <div onClick={resetSearch} key={conversation.id}>
          <Users user={conversation}/>
        </div>
        ))
      }
    </NewConversation>
  )
}

const NewConversation = styled.div`
  position: absolute;
  z-index: 60;
  top: 4rem;
  transform: translate(90%);
  width: 18.5em;
  height: 25em;
  background-color: rgba(15,25,20);
  border-radius: 10px;
  overflow-y: scroll;

  @media (max-width: 1108px){
    transform: translate(60%);
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
