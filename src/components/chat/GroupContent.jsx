import { useEffect, useState } from "react"
import styled from "styled-components";
import { CgProfile } from 'react-icons/cg';
import { MdMoreHoriz } from 'react-icons/md';
import { useChatContext } from "../../hooks/useChatContext";
import { axiosAuth } from "../../app/axiosAuth";

const GroupContent = ({ groupConvo }) => {
  const { chatId, setChatId, setMessages, setClick, setOpen, formatDate, currentUser, setGroupConversation } = useChatContext()
  const currentUserId = localStorage.getItem('userId');
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState('');

  const deleteGroupConversation = async(convoId) => {
    try{
      const otherGroupConversations = groupConvo.filter(group => group?.convoId !== convoId)
      await axiosAuth.delete(`/group_conversation/delete/${currentUserId}/${convoId}`)
      setGroupConversation(otherGroupConversations)
      setChatId({})
      refresh()
      }catch(error) {
        let errorMessage;
        !error?.response ? errorMessage = 'no server response' : 
        error?.response?.status === 400 ? errorMessage = 'id required' :
        error?.response?.status === 404 ? errorMessage = 'No conversations, start a new conversation' :
        error?.response?.status === 500 ? errorMessage = 'internal error' : ''
        setError(errorMessage)
      }
  }
  const filteredGroupConvo = groupConvo && groupConvo.filter(groupCo => !currentUser?.deletedConversationIds?.includes(groupCo?.convoId))
  
  const openGroupChat = (group) => {
    setChatId({ groupName: group?.groupName, convoId: group?.convoId })
    setMessages([])
  }

  return (
    <GroupContainer
      onClick={() => {
        setError('')
        setClick(false)
        setOpen(false)
      }}
    >
      {
        filteredGroupConvo.map(group => (
          <div 
            onClick={() => openGroupChat(group)}
            key={group?.convoId} className={`group ${chatId?.convoId === group?.convoId ? 'current' : ''}`}>
            {/* user?.profilePicture ? <img src={user?.profilePicture} alt={user?.username} 
            className='profile-picture'/> : <CgProfile className='pics'/> */}
            <div className="group_convo">
              <CgProfile className='profile'/>
              <div>
                <p>{group?.groupName}</p>
                <div className="members">{group?.members.length} members
                  
                </div>
              </div>
            </div>
            {
              reveal && 
              <button
                onMouseEnter={() => setReveal(true)}
                onMouseLeave={() => setReveal(false)}
                onClick={() => deleteGroupConversation(group?.convoId)}
              >Remove</button>
            }
            <div className="end">
              <MdMoreHoriz 
                onMouseEnter={() => setReveal(true)}
                onMouseLeave={() => setReveal(false)}
                className='more'
              />
              <p>{formatDate(group?.createdAt)}</p>
            </div>
          </div>
        ))
      }
    </GroupContainer>
  )
}

export default GroupContent

const GroupContainer = styled.div`


  .current{
    background-color: #333;
  }

  .group{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.3rem;
    cursor: pointer;
    border-radius: 5px;
    position: relative;

    .group_convo{
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .profile{
        font-size: 3.2rem;
        color: gray;
      }
  
      div{
        
        p{
          text-transform: capitalize;
        }
  
        .members{
          display: flex;
          align-items: center;
          color: rgba(255,255,255,0.5);
        }
      }
    }

    button{
      position: absolute;
      right: 0.5rem;
      top: 1rem;
      border-radius: 5px;
      border: none;
      background-color: gray;
      padding: 4px;
      cursor: pointer;
      z-index: 60;

      &:hover{
        background-color: lightgray;
      }
    }

    .end{
      display: flex;
      flex-direction: column;
      height: 100%;

      .more{
        position: absolute;
        right: 0.5rem;
        top: 0;
        font-size: 24px;
        cursor: pointer;
      }

      p{
        font-size: 13px;
        color: rgba(255,255,255,0.4);
      }
    }

    &:hover{
      background-color: rgba(0,0,0,0.2);
    }
  }

`