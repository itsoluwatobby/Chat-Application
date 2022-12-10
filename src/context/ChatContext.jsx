import React, { createContext, useState } from 'react'

export const ChatContext = createContext({})

export const ChatContextProvider = ({children}) => {
  const [chatId, setChatId] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const value = {
    chatId, setChatId, message, setMessage, messages, setMessages
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}
