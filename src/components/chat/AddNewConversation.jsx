import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useChatContext } from '../../hooks/useChatContext'
import { SearchCon } from './SearchCon'
import { Users } from './Users';
import { axiosAuth } from '../../app/axiosAuth';

export const AddNewConversation = ({ filteredUserSearch, socket }) => {
  const {refresh, setConversation, conversation} = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [convo, setConvo] = useState({});
  let loadRef = useRef(0);
    
  const incLoad = () => ++loadRef

  const createConvo = async(friendId) => {
    const initialState = {adminId: currentUserId, friendId}
    try{
      //updatedUser && setConvo(updatedUser)
      // await socket.emit('create', updatedUser?.username)
      const res = await axiosAuth.post(`/conversation/create`, initialState)
      const updatedUser = res?.data && ({ ...res?.data, done: true })
      updatedUser && setConvo(updatedUser)
      incLoad()
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
  
  useEffect(() => {
    let isMounted = true
    socket.emit('create_conversation', convo)
    socket.on('new_conversation', data => {
      isMounted && setConversation(prev => [...prev, data])
      setConvo({}) 
    })
    console.log(loadRef.current)
    console.log(convo)
    return () => isMounted = false
  }, [loadRef.current])

  // const create = async (friendId) => {
  //   const initialState = {adminId: currentUserId, friendId}
  //   const val = await createConvo(initialState)
  //   val && await socket.emit('create_Conversation', val)
  // }


  return (
    <NewConversation>
      <SearchCon />
      {
      filteredUserSearch.length ?
        filteredUserSearch.map(user => (
          <div onClick={() => {
            createConvo(user?._id)
          }} key={user._id}>
            <Users user={user} loading={loading} error={error}/>
          </div>
          ))
          :
          <p className='error'>No more users</p>
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
