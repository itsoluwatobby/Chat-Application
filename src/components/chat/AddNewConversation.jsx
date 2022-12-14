import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useChatContext } from '../../hooks/useChatContext'
import { SearchCon } from './SearchCon'
import { Users } from './Users';
import { axiosAuth } from '../../app/axiosAuth';

export const AddNewConversation = ({ result, socket }) => {
  const {searchUsers, refresh, setConversation, conversation} = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
    
  const createConvo = async(friendId) => {
    const initialState = {adminId: currentUserId, friendId}
    try{
      const res = await axiosAuth.post(`/conversation/create`, initialState)
      const updatedUser = res?.data && ({ ...res?.data, done: true })
      updatedUser && setConversation(prev => [...prev, updatedUser])
      refresh()
    }catch(error) {
      let errorMessage;
      error?.response?.status === 400 ? errorMessage = 'id required' :
      error?.response?.status === 404 ? errorMessage = 'not found' :
      error?.response?.status === 409 ? errorMessage = 'conversation already exist' :
      error?.response?.status === 500 ? errorMessage = 'internal error' : errorMessage = 'no server response'
      setError(errorMessage)
    }finally{
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   socket.on('new_conversation', data => {
  //     setConversation(prev => [...prev, data])
  //     refresh() 
  //   })
  // }, [socket])

  // const create = async (friendId) => {
  //   const initialState = {adminId: currentUserId, friendId}
  //   const val = await createConvo(initialState)
  //   val && await socket.emit('create_Conversation', val)
  // }

//!conversation[i]?.conversationId.includes(user?.conversationId[i]) && 
  const filteredSearch = result && Array.isArray(result) && result.filter((user, i) => !user?.conversationId.includes(conversation.map(({convoId}) => convoId)) && (user.username.toLowerCase()).includes(searchUsers.toLowerCase()))
  
  return (
    <NewConversation>
      <SearchCon />
      {
      !Array.isArray(result) ?
        <p className='error'>{result}</p>
        :
        filteredSearch.map(user => (
          <div onClick={() => {
            createConvo(user?._id)
          }} key={user._id}>
            <Users user={user} loading={loading} error={error}/>
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
  width: 17.5em;
  background-color: #363636;
  border-radius: 10px;
  overflow-y: scroll;
  padding: 0 0 0.3rem 0;
  max-height: 28em;
  box-shadow: -2px 4px 16px rgba(0,0,0,0.3);

    .error{
      text-align: center;
      text-transform: capitalize;
      font-family: cursive;
      color: red;
      margin-top: 2rem;
    }

  @media (max-width: 1108px){
    transform: translate(60%);
  }

  &::-webkit-scrollbar{
    width: 0;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
  }
`
