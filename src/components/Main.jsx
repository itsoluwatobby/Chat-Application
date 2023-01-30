import styled from 'styled-components'
import { Conversations } from './Conversations'
import { Search } from './Search'
import {useChatContext} from '../hooks/useChatContext'
import { useEffect, useState } from 'react'
import { axiosAuth } from '../app/axiosAuth';

export const Main = ({ socket, inputRef  }) => {
  const {
    setChatId, loggedIn, setClick, search, setEmojiOpen, setMessages, setOpenGroupProfile, chatId, conversation, setConversation, messages, groupConversation, setGroupConversation, notification, setNotification, setIsChatOpened, currentUser, setTypingEvent, message, setMessage, setCustomAdminMessage, num, setNewGroup, setOpenUserProfile, setReference
  } = useChatContext()
  const currentUserId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [personalConvo, setPersonalConvo] = useState([]);
  const [generalConvo, setGeneralConvo] = useState([]);

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
        const updatedUsers = res?.data && res?.data.map(user => ({ ...user, order: count++ }))
        isMounted && updatedUsers && setPersonalConvo([...updatedUsers])
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
    let isMounted = true
    //isMounted && setIsChatOpened(false)
    return () => isMounted = false
  }, [chatId.convoId])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const usersInGroup = async() => {
      try{
        const groupMembers = await axiosAuth.get(`/usersInGroup/${currentUserId}`, {
            signal: controller.signal 
          })
          setGroupConversation([...groupMembers?.data])
          isMounted && setGeneralConvo([...groupMembers?.data])

      }catch(error) {console.log(error?.message)}
    }
    usersInGroup()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [num, loggedIn, currentUserId])

  useEffect(() => {
    setConversation([...personalConvo, ...generalConvo])
  }, [personalConvo, generalConvo])
  
  useEffect(() => {
    const filteredConversation = conversation.filter(
      user => !currentUser?.deletedConversationIds?.includes(user?.convoId)
        ).sort((a, b) => b?.lastMessage?.dateTime?.localeCompare(a?.lastMessage?.dateTime));
//.sort((a, b) => b?.createdTime?.localeCompare(a?.createdTime));
    const searchConversation = filteredConversation && filteredConversation?.filter(
      convo => (convo?.username)?.toLowerCase()?.includes(search?.toLowerCase()) 
        || (convo?.groupName)?.toLowerCase()?.includes(search?.toLowerCase()));

    const target = searchConversation.find(
      user => !user?.groupName 
        ? user?._id === chatId?.userId 
          : user?.groupName === chatId?.groupName
    );

    const others = searchConversation.filter(
      searchUser => !searchUser?.groupName 
          ? searchUser?._id !== chatId?.userId 
              : searchUser?.groupName !== chatId?.groupName
    );

    const currentChat = [target, ...others]
    target ? setFiltered(currentChat) : setFiltered(searchConversation)
  }, [currentUser, search, message]);

  const openChat = (user) => {
    setReference({})
    !user?.groupName 
        ? setChatId({ userId: user?._id, convoId: user?.convoId }) 
            : setChatId({ groupName: user?.groupName, convoId: user?.convoId });
    setTypingEvent({})
    inputRef?.current?.focus()
    setEmojiOpen(false)
    setMessages([])
    setIsChatOpened(true)
    setCustomAdminMessage({})
    setOpenUserProfile(false)
    setMessage('')
  }

  let content;

  loading ? content = <p className='loading'>loading your conversations...</p> :
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
              : (!groupConversation.length && error) ? content = <p>No conversations yet, start a new conversation</p> : ''

  
  return (
    <MainPage onClick={() => {
      setOpenGroupProfile(false)
      setNewGroup([])  
    }}>
      <Search />
      {
        !conversation.length 
                && !groupConversation.length 
                          && !content  && error && <p className='error'>{error}</p>
      }
      {content}
    </MainPage>
  )
}

const MainPage = styled.div`
height: 100%;
display: flex;
// flex-grow: 2.5;
flex-direction: column;
gap: 0.2rem;
padding: 0 0.2rem;
overflow-y: scroll;
flex: none;
width: 350px;
min-width: 220px;

.current{
  background-color: #333;
  border-radius: 5px;
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
    width: 220px;
  }

`

