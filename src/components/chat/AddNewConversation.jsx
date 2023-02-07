import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useChatContext } from '../../hooks/useChatContext'
import { SearchCon } from './SearchCon'
import { Users } from './Users';
import { axiosAuth } from '../../app/axiosAuth';

export const AddNewConversation = ({ filteredUserSearch, setAddedConversation, socket, result }) => {
  const { refresh, setConversation, conversation, currentUser } = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [convo, setConvo] = useState({});

// const initialState = {adminId: currentUserId, friendId}
  const createConvo = async(friendId) => {
    //socket.emit('conversation', {_id: friendId})
    const initialState = {adminId: currentUserId, friendId}
    try{
      const {data} = await axiosAuth.post(`/conversation/create`, initialState)
      socket.emit('create_conversation', { newConvo: data })
      setConversation([...conversation, data])
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

  useEffect(() => {
    socket.on('new_conversation', data => {
      console.log('rendered')
      console.log(data)
      setConvo({...data})
    })
  }, [conversation])

  useEffect(() => {
    if(!convo) return
    if(convo?._id === currentUser?._id){
      console.log(convo)
      setAddedConversation(prev => prev + 2)
    }
  }, [convo?._id])
//!loading && error && <p className='errors'>{error}</p>
  return (
    <NewConversation>
      <SearchCon />
      {typeof result === 'string' ?
        <p className='error'>{result}</p>
      :
        filteredUserSearch.length ?
          filteredUserSearch.map(user => (
            <div onClick={() => {
              createConvo(user?._id)
            }} key={user._id}>
              <Users user={user} loading={loading} error={error}/>
            </div>
            ))
            :
            <p className='errors'>No more users</p>
      }
    </NewConversation>
  )
}

const NewConversation = styled.div`
  position: absolute;
  z-index: 699;
  top: 4rem;
  transform: translate(90%);
  width: 17.5em;
  background-color: #363636;
  border-radius: 10px;
  overflow-y: scroll;
  padding: 0 0 0.1rem 0;
  max-height: 28em;
  box-shadow: -2px 4px 16px rgba(0,0,0,0.3);
  transition: 0.3s ease-in-out;
  border-bottom: 10px solid rgba(0,0,0,0.2);

    .error{
      text-align: center;
      text-transform: capitalize;
      font-family: cursive;
      color: red;
      margin-top: 1.5rem;
    }

    .errors{
      text-align: center;
      text-transform: capitalize;
      font-family: cursive;
      color: gray;
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
