import styled from 'styled-components'
import { Conversations } from './Conversations'
import { Search } from './Search'
import {useChatContext} from '../hooks/useChatContext'
import { useCallback, useEffect, useState, lazy, Suspense } from 'react'
import { axiosAuth } from '../app/axiosAuth';
import GroupContent from './chat/GroupContent'
const LazyGroup = lazy(() => import('./chat/GroupContent'));

export const Main = () => {
  const {
    setChatId, loggedIn, setClick, search, setMessages, 
    chatId, conversation, setConversation, messages, 
    notification, setNotification, setIsChatOpened
  } = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [groupConversation, setGroupConversation] = useState([]);

  useEffect(() => {
    setIsChatOpened(false)
  }, [chatId.convoId])

  // const fetchGroup = useCallback(async () => {  
  //   const controller = new AbortController()
  //   const res = await axiosAuth.get(`/group_conversation/${currentUserId}`, {
  //     signal: controller.signal
  //   })
  //   setGroup(res.data)
  // }, [])

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
        fetchGroup()
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
    setIsChatOpened(true)
  }, [chatId.convoId])

  useEffect(() => {
    const controller = new AbortController()
    const usersInGroup = async() => {
      const allUsers = await axiosAuth.get(`/usersInGroup/${currentUserId}`, {
         signal: controller.signal 
      })
      setGroupConversation(allUsers?.data)
    }
    usersInGroup()
    return () => controller.abort()
  }, [conversation?.length])

  const updatedUsers = conversation.map(eachUser => {
    return {...eachUser, openedChat: false}
  })

  const filteredConversation = updatedUsers.filter(convo => (convo?.username).toLowerCase().includes(search.toLowerCase()))

  const openChat = (user) => {
    setChatId({ userId: user?._id, convoId: user?.convoId })
    const filterAll = notification.filter(notify => notify?.senderId !== user?._id)
    notification.length && setNotification([filterAll])
    setMessages([])
  }

  let content;

  loading ? content = <p className='loading'>loading your conversation...</p> :
  conversation.length ? content = (
              <>
                {
                  filteredConversation.map(user => (
                    <div
                      className={chatId?.convoId === user?.convoId ? 'current' : ''}
                      key={user?._id} 
                      onClick={() => openChat(user)}
                    >
                      <Conversations user={user} />
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
      {/* <Suspense fallback={<p>loading...</p>}>
        <LazyGroup groupConversation={groupConversation}/>
      </Suspense> */}
      {filteredConversation && <GroupContent groupConversation={groupConversation}/>}
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

