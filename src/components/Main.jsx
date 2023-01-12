import styled from 'styled-components'
import { Conversations } from './Conversations'
import { Search } from './Search'
import {useChatContext} from '../hooks/useChatContext'
import { useCallback, useEffect, useState, lazy, Suspense } from 'react'
import { axiosAuth } from '../app/axiosAuth';
import GroupContent from './chat/GroupContent'
// const LazyGroup = lazy(() => import('./chat/GroupContent'));

export const Main = ({ socket, inputRef }) => {
  const {
    setChatId, loggedIn, setClick, search, setMessages,  chatId, conversation, setConversation, messages, groupConversation, setGroupConversation, notification, setNotification, setIsChatOpened, currentUser, setTypingEvent, message, setMessage
  } = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setIsChatOpened(false)
  }, [chatId.convoId])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const fetchUsersInConversation = async() => {
      let count = 0
      try{
        setLoading(true)
        setError('')
        const res = await axiosAuth.get(`/usersInConversation/${currentUserId}`, {
          signal: controller.signal
        })
        const updatedUsers = res?.data && res?.data.map(user => ({ ...user, done: true, order: count++ }))
        isMounted && updatedUsers && setConversation([...updatedUsers])
        fetchGroup()
      }catch(error){
        if(error){
          let errorMessage;
          error?.response?.status === 400 ? errorMessage = 'userId required' :
          error?.response?.status === 404 ? errorMessage = 'No conversations, start a new conversation' :
          error?.response?.status === 500 ? errorMessage = 'internal error' : errorMessage = 'no server response'
          setError(errorMessage)
        }else return
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
    setIsChatOpened(true)
  }, [chatId.convoId])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const usersInGroup = async() => {
      try{
        const groupMembers = await axiosAuth.get(`/usersInGroup/${currentUserId}`, {
            signal: controller.signal 
          })
        isMounted && setGroupConversation(groupMembers?.data)
      }
      catch(error){
        
      }
    }
    usersInGroup()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [loggedIn])

  // const updatedUsers = conversation.map(eachUser => {
  //   return {...eachUser, openedChat: false}
  // })
  
  useEffect(() => {
    const filteredConversation = conversation.filter(user => !currentUser?.deletedConversationIds?.includes(user?.convoId))
    const searchConversation = filteredConversation && filteredConversation?.filter(convo => (convo?.username)?.toLowerCase()?.includes(search?.toLowerCase()))
    const target = searchConversation.find(user => user?._id === chatId?.userId)
    const others = searchConversation.filter(searchUser => searchUser?._id !== chatId?.userId)
    const currentChat = [target, ...others]
    target ? setFiltered(currentChat) : setFiltered(searchConversation)
  }, [currentUser, search, message])

  const openChat = (user) => {
    setChatId({ userId: user?._id, convoId: user?.convoId })
    setTypingEvent({})
    inputRef?.current?.focus()
    const filterAll = notification?.filter(notify => notify?.senderId !== user?._id)
    notification?.length && setNotification([filterAll])
    setMessages([])
    setMessage('')
  }

  let content;

  loading ? content = <p className='loading'>loading your conversation...</p> :
  conversation.length ? content = (
              <>
                {filtered &&
                  filtered.map(user => (
                    <div
                      className={chatId?.convoId === user?.convoId ? 'current' : ''}
                      key={user?._id} 
                      onClick={() => openChat(user)}
                    >
                      <Conversations 
                        user={user} socket={socket} 
                      />
                    </div>
                    ))
                  }
              </>)
              : (!groupConversation.length && !error) ? content = <p>No conversations, start a new conversation</p> : ''

  
  return (
    <MainPage>
      <Search />
      {
        !conversation.length && !groupConversation.length && error && <p>{error}</p>
      }
      {content}
      {filtered && <GroupContent groupConvo={groupConversation}/>}
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

