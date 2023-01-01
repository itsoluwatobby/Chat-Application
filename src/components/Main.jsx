import styled from 'styled-components'
import { Conversations } from './Conversations'
import { Search } from './Search'
import {useChatContext} from '../hooks/useChatContext'
import { useEffect, useState } from 'react'
import { axiosAuth } from '../app/axiosAuth'

export const Main = () => {
  const {setChatId, loggedIn, setClick, setMessages, conversation, setConversation} = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchUsersInConversation = async() => {
      setLoading(true)
      try{
        const res = await axiosAuth.get(`/usersInConversation/${currentUserId}`)
        setConversation([...res?.data])
      }catch(error){
        let errorMessage;
        error?.response?.status === 400 ? errorMessage = 'userId required' :
        error?.response?.status === 404 ? errorMessage = 'No conversations, start a new conversation' :
        error?.response?.status === 500 ? errorMessage = 'internal error' : errorMessage = 'no server response'
        setError(errorMessage)
      }finally{
        setLoading(false)
      }
    }
    fetchUsersInConversation()

    return () => isMounted = false
  }, [loggedIn, currentUserId])

  const startChat = (userId, convoId) =>{
    setChatId({userId, convoId})
    setMessages([])
  }

  let content;

  loading ? content = <p className='loading'>loading your conversation...</p> :
  conversation.length ? content = (
              <>
                {
                  conversation.map(user => (
                    <div
                      key={user?._id} 
                      onClick={() => startChat(user?._id, user?.convoId)}
                    >
                      <Conversations user={user}/>
                    </div>
                    ))
                  }
              </>)
              : !error ? content = <p>No conversations, start a new conversation</p> : ''

  return (
    <MainPage>
      <Search />
      {!conversation.length && error && <p>{error}</p>}
      {content}
    </MainPage>
  )
}

const MainPage = styled.div`
height: 100%;
display: flex;
flex-grow: 2.5;
flex-direction: column;
gap: 0.2rem;
padding: 0 0.2rem;
overflow-y: scroll;

.error{
  text-align: center;
  text-transform: capitalize;
  font-family: cursive;
  color: red;
  margin-top: 1rem;
}

.loading{
  text-align: center;
  text-transform: capitalize;
  font-family: cursive;
  color: teal;
  margin-top: 1rem;
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

  @media (max-width: 908px){
    flex-grow: none;
    min-width: 250px;
  }

  @media (max-width: 468px){
    flex-grow: none;
    max-width: 150px;
  }
`
