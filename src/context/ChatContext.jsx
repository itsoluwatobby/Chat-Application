import React, { createContext, useEffect, useState } from 'react'

export const ChatContext = createContext({})

export const ChatContextProvider = ({children}) => {
  const [chatId, setChatId] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [click, setClick] = useState(false)
  const [message, setMessage] = useState('')
  const [searchUsers, setSearchUsers] = useState('')
  const [response, setResponse] = useState('')
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState({})

  
  const value = {
    chatId, setChatId, message, setMessage, messages, loggedIn, setLoggedIn, response, setMessages, setResponse, messageBody, setMessageBody, click, setClick, searchUsers, setSearchUsers
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}
