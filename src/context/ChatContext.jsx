import React, { createContext, useEffect, useState } from 'react'
import {format, formatDistanceToNow, parseISO} from 'date-fns';
import { axiosAuth } from '../app/axiosAuth';

export const ChatContext = createContext({})

export const ChatContextProvider = ({children}) => {
  const [chatId, setChatId] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [click, setClick] = useState(false)
  const [message, setMessage] = useState('')
  const [createNewConvo, setCreateNewConvo] = useState('')
  const [searchUsers, setSearchUsers] = useState('')
  const [messages, setMessages] = useState([])
  const [conversation, setConversation] = useState([]);
  const [messageBody, setMessageBody] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [num, setNum] = useState(0);
  const [result, setResult] = useState([]);
  const [errors, setErrors] = useState(null);
  const [open, setOpen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const currentUserId = localStorage.getItem('userId');

  const refresh = () => setNum(prev => prev + 1)

  const formatDate = (date) => {
    const dateTime = parseISO(date)
    return formatDistanceToNow(dateTime) + ' ago'
  }
  
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchUsers = async() => {
      try{
        const res = await axiosAuth.get('/', {
          signal: controller.signal
        })
        isMounted && setResult(res?.data)
        refresh()
      }catch(error) {
        let errorMessage;
        !error.response ? errorMessage = 'no server response' : 
        error.response.status === 400 ? errorMessage = 'no users available' :
        error.response.status === 500 ? errorMessage = 'internal error' : ''
        setErrors(errorMessage)
      }
    }
    fetchUsers()

    return () => {
      controller.abort()
      isMounted = false
    }
  }, [loggedIn])

  // const updateUser = async(id, initialState) => {
  //   try{
  //     const updateUser = await axiosAuth.put(`/update/${id}`, initialState)
  //     return updateUser.data
  //   }catch(error) {
  //     let errorMessage;
  //     !error.response ? errorMessage = 'no server response' : 
  //     error.response.status === 403 ? errorMessage = 'bad credentials' :
  //     error.response.status === 500 ? errorMessage = 'internal error' : ''
  //     return errorMessage
  //   }
  // }
  
  const value = {
    chatId, setChatId, message, setMessage, messages, loggedIn, setLoggedIn, setMessages, messageBody, setMessageBody, click, setClick, searchUsers, setSearchUsers, createNewConvo, setCreateNewConvo, formatDate, currentUser, setCurrentUser, refresh, num, conversation, setConversation, result, open, setOpen, proceed, setProceed, isNext, setIsNext
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}
