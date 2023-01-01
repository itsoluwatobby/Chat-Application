import styled from 'styled-components'
import { Conversations } from './Conversations'
import { Search } from './Search'
import {useChatContext} from '../hooks/useChatContext'
import { useEffect, useState } from 'react'
import { axiosAuth } from '../app/axiosAuth'

export const Main = () => {
  const {setChatId, loggedIn, setClick, search, setMessages, chatId, conversation, setConversation, messages} = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchUsersInConversation = async() => {
      setLoading(true)
      try{
        const res = await axiosAuth.get(`/usersInConversation/${currentUserId}`, {
          signal: controller.signal
        })
        isMounted && setConversation([...res?.data])
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

    return () => {
      controller.abort()  
      isMounted = false
    }
  }, [loggedIn, currentUserId])
  
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchGroupConversation = async() => {
      setLoading(true)
      try{
        const res = await axiosAuth.get(`/usersInGroup/${currentUserId}`, {
          signal: controller.signal
        })
        let users = []
        res?.data.map(user => {
          const {conversationId, friends, about, email, ...rest} = user
          users.push(rest)
        })
        isMounted && console.log(users)
        //setConversation(prev => [...prev, res?.data])
      }catch(error){
        let errorMessage;
        error?.response?.status === 400 ? errorMessage = 'userId required' :
        error?.response?.status === 404 ? errorMessage = 'You do not have a group conversation' :
        error?.response?.status === 500 ? errorMessage = 'internal error' : errorMessage = 'no server response'
        setError(errorMessage)
      }finally{
        setLoading(false)
      }
    }
    fetchGroupConversation()

    return () => {
      controller.abort()
      isMounted = false
    }
  }, [conversation])

  const startChat = (userId, convoId) =>{
    setChatId({userId, convoId})
    setMessages([])
  }

  const filteredConversation = conversation.filter(convo => (convo?.username).toLowerCase().includes(search.toLowerCase()))

  let content;

  loading ? content = <p className='loading'>loading your conversation...</p> :
  conversation.length ? content = (
              <>
                {
                  filteredConversation.map(user => (
                    <div
                      className={chatId?.userId === user?._id ? 'current' : ''}
                      key={user?._id} 
                      onClick={() => startChat(user?._id, user?.convoId)}
                    >
                      <Conversations user={user} groupConvo/>
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

.current{
  background-color: #333;
}

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
