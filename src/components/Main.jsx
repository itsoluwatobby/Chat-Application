import styled from 'styled-components'
import { Conversations } from './Conversations'
import { Search } from './Search'
import {useDispatch, useSelector} from 'react-redux'
import {useChatContext} from '../hooks/useChatContext'
import { useEffect, useState } from 'react'
import { getAllUsers, getCurrentUser, selectAllUsers, userError } from '../features/authSlice'
import { messageError } from '../features/messageSlice'

export const Main = () => {
  const {setChatId, loggedIn, setClick} = useChatContext()
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser);
  const error = useSelector(messageError)
  const userErrors = useSelector(userError)
  const allUsers = useSelector(selectAllUsers)
  const [users, setUsers] = useState([])
  console.log(allUsers)

  // useEffect(() => {
  //   dispatch(getConversation(conversation))
  // }, [conversation])

  useEffect(() => {
    const userInConvo = allUsers.map(
      user => currentUser.conversationId.map(
        current => user.conversationId.includes(current)))
    setUsers(userInConvo)
  }, [currentUser])

  useEffect(() => {
    let isMounted = true

    const fetchUsers = async() => {
      try{
        isMounted && await dispatch(getAllUsers())
      }catch(error){
        console.log(error)
      }
    }
    fetchUsers()

    return () => isMounted = false

  }, [loggedIn])

  // const filteredConversation = conversations?.filter(convo => convo._id !== currentUser._id)

  return (
    <MainPage>
      
      <Search />
      {userErrors ? 
        <p>{userErrors}</p> 
      :
      <>
        {!users ? 
          <p>No conversations, start a new conversation</p>
        :
        users?.map(user => (
          <div
            key={user?.email} 
            onClick={() => setChatId(user?._id)}
          >
            <Conversations user={user}/>
          </div>
        )
        )}
      </>
      }
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
