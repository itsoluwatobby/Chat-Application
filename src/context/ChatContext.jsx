import React, { createContext, useEffect, useRef, useState } from 'react'
import {format, formatDistanceToNow, parseISO} from 'date-fns';
import { axiosAuth } from '../app/axiosAuth';

export const ChatContext = createContext({})

export const ChatContextProvider = ({ children }) => {
  const [chatId, setChatId] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [click, setClick] = useState(false);

  const [message, setMessage] = useState('');
  const [createNewConvo, setCreateNewConvo] = useState('');
  const [searchUsers, setSearchUsers] = useState('');

  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [messageBody, setMessageBody] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [num, setNum] = useState(0);
  const [result, setResult] = useState([]);

  const [errors, setErrors] = useState(null);
  const [open, setOpen] = useState(false);
  const [proceed, setProceed] = useState(false);

  const [isNext, setIsNext] = useState(false);
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [search, setSearch] = useState('');

  const [newGroup, setNewGroup] = useState([]);
  const [notification, setNotification] = useState([]);
  const [groupConversation, setGroupConversation] = useState([]);

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [customAdminMessage, setCustomAdminMessage] = useState({});
  const [typingEvent, setTypingEvent] = useState({});

  const [reference, setReference] = useState({});
  const [error, setError] = useState(null);
  const [convo, setConvo] = useState({});

  const [openGroupProfile, setOpenGroupProfile] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const currentUserId = localStorage.getItem('userId');
  
  const counterRef = useRef(0);
  const [acceptedImage, setAcceptedImage] = useState(null);
  const [reload, setReload] = useState(null);
  const [reloadAll, setReloadAll] = useState(null);

  const [toggle, setToggle] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [group, setGroup] = useState({});

  const loadGroup = () => setNum(prev => prev + 1)
  const loadMessage = () => setReload(prev => prev + 1)
  const loadMessageAll = () => setReloadAll(prev => prev + 2)
  const onSearchChange = e => setSearch(e.target.value);

  const formatDate = (date) => {
    const dateTime = parseISO(date)
    return formatDistanceToNow(dateTime) + ' ago'
  }

  const uploadPicture = async(image) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadend = () => {
      setAcceptedImage(reader.result)
    }
    return 'done'
  }

  const isMessageRead = async(msgId) => {
    const msgRes = await axiosAuth.put(`/message_read/${msgId}`)
    return msgRes?.data
  }

  const isMessageDelivered = async(msgId) => {
    const msgDel = await axiosAuth.put(`/message_delivered/${msgId}`,)
    return msgDel?.data
  }

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
    chatId, setChatId, message, setMessage, messages, loggedIn, 
    setLoggedIn, setMessages, messageBody, setMessageBody, click, 
    setClick, searchUsers, setSearchUsers, createNewConvo, setCreateNewConvo, 
    formatDate, currentUser, setCurrentUser, num, conversation, 
    setConversation, result, open, setOpen, proceed, setProceed, isNext, 
    setIsNext, onSearchChange, search, newGroup, setNewGroup, notification, 
    setNotification, counterRef, isChatOpened, setIsChatOpened, groupConversation, 
    setGroupConversation, typingEvent, setTypingEvent, welcomeMessage, setWelcomeMessage, 
    customAdminMessage, setCustomAdminMessage, reference, setReference, 
    error, setError, convo, setConvo, openGroupProfile, setOpenGroupProfile, loadGroup, 
    toggle, setToggle, emojiOpen, setEmojiOpen, group, setGroup, uploadPicture, acceptedImage, 
    setAcceptedImage, openUserProfile, setOpenUserProfile, reload, setReload, loadMessage, 
    reloadAll, setReloadAll, loadMessageAll
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}
