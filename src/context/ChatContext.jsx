import React, { createContext, useEffect, useRef, useState } from 'react'
import {format, formatDistanceToNow, parseISO} from 'date-fns';
import { axiosAuth } from '../app/axiosAuth';
import axios from 'axios';
import { NAVIGATE } from '../components/chat/head/profile/navigate';

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
  const [made, setmade] = useState(0);
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

  const [updated, setUpdated] = useState(null);
  const [reloadAll, setReloadAll] = useState(null);
  const [active, setActive] = useState(localStorage.getItem('active') || false);
  
  const [userGroupConvos, setUserGroupConvos] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  
  const [buttonState, setButtonState] = useState(NAVIGATE.FST);
  const [group, setGroup] = useState({});
  const [mode, setMode] = useState(false);

  const [soundNotification, setSoundNotification] = useState(false);
  const [url, setUrl] = useState(null);
  const [addParticipants, setAddParticipants] = useState(false);

  const loadGroup = () => setNum(prev => prev + 1)
  const refresh = () => setMade(prev => prev + 1)
  const loadMessage = () => setReload(prev => prev + 1)
  const loadMessageAll = () => setReloadAll(prev => prev + 2)
  const onSearchChange = e => setSearch(e.target.value);

  const formatDate = (date) => {
    const dateTime = parseISO(date)
    return formatDistanceToNow(dateTime) + ' ago'
  }

  // const uploadPicture = async(image) => {
  //   const reader = new FileReader()
  //   reader.readAsDataURL(image)
  //   reader.onloadend = () => {
  //     setAcceptedImage(reader.result)
  //   }
  //   return 'done'
  // }

  useEffect(() => {
    localStorage.setItem('active', active)
  }, [active])

  const uploadToCloud = async (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'dwb3ksib')

    const res = await axios.post(`https://api.cloudinary.com/v1_1/dr8necpxh/image/upload`, data)
    setUrl(res?.data?.url)
  }

  const isMessageRead = async(msgId) => {
    const msgRes = await axiosAuth.put(`/message_read/${msgId}`)
    return msgRes?.data
  }

  const isMessageDelivered = async(msgId) => {
    const msgDel = await axiosAuth.put(`/message_delivered/${msgId}`,)
    return msgDel?.data
  }
  const reloadUser = () => setUpdated(prev => prev + 2)
  const updateUserInfo = async(initialState) => {
    try{
      await axiosAuth.put(`/update/${currentUser?._id}`, initialState)
      reloadUser()
    }
    catch(error){
      console.log(error?.message)
    }
  }
  
  const value = {
    chatId, setChatId, message, setMessage, messages, loggedIn, addParticipants, setAddParticipants, 
    setLoggedIn, setMessages, messageBody, setMessageBody, click, setClick, searchUsers, setSearchUsers, 
    createNewConvo, setCreateNewConvo, formatDate, currentUser, setCurrentUser, num, conversation, 
    setConversation, result, open, setOpen, proceed, setProceed, isNext, setIsNext, onSearchChange, 
    search, newGroup, setNewGroup, notification, setNotification, counterRef, isChatOpened, setIsChatOpened, 
    groupConversation, setGroupConversation, typingEvent, setTypingEvent, welcomeMessage, setWelcomeMessage, 
    customAdminMessage, setCustomAdminMessage, reference, setReference, error, setError, convo, setConvo, 
    openGroupProfile, setOpenGroupProfile, loadGroup, toggle, setToggle, emojiOpen, setEmojiOpen, group, 
    setGroup, acceptedImage, setAcceptedImage, openUserProfile, setOpenUserProfile, reload, setReload, 
    loadMessage, reloadAll, setReloadAll, loadMessageAll, updated, updateUserInfo, userGroupConvos, 
    setUserGroupConvos, url, setUrl, uploadToCloud, buttonState, setButtonState, mode, setMode, 
    soundNotification, setSoundNotification, refresh, made, active, setActive
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}
