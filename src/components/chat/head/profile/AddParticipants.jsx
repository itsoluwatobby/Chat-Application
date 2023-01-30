import React, { useEffect, useState } from 'react';
import { BsArrowLeft, BsPersonCircle } from 'react-icons/bs';
import styled from 'styled-components';
import { axiosAuth } from '../../../../app/axiosAuth';
import { useChatContext } from '../../../../hooks/useChatContext';
import { MessagePrompt } from '../../MessagePrompt';
import { Participants } from './Participants';

export const AddParticipants = ({ 
  filteredParticipantsSearch, searchGroup, setSearchGroup, group, setAddParticipants }) => {
  const { newGroup, setNewGroup, chatId, currentUser, conversation, setConversation } = useChatContext();
  const [promptWindow, setPromptWindow] = useState(false);

  const onGroupUserChange = e => setSearchGroup(e.target.value)

  const [groupUser, setGroupUser] = useState([]);
  
  const addUserToGroup = async() => {
    //filter conversation prevoius conversation
    const othersInConversation = conversation.filter(converse => converse?.convoId !== chatId?.convoId)
    const groupIds = newGroup.map(singlePerson => singlePerson?.id)
    const initialState = {groupId: chatId?.convoId, memberIds: [...groupIds]}
    const {data} = await axiosAuth.put(`/add_userToGroup/${currentUser?._id}`, initialState)
    data && setConversation([...othersInConversation, data])
    setPromptWindow(false)
    setNewGroup([])
    setAddParticipants(false)
  }
  
  useEffect(() => {
    setGroupUser(newGroup)
    return () => setGroupUser([])
  }, [newGroup])

  let selectedContact = (
    <div className='selected_container'>
      {newGroup.length ? 
        groupUser.map(group => (
          <div key={group.id} className='selected_contact'>
            <BsPersonCircle className='contact'/>
            <p>{group?.username}</p>
          </div>
        )) : ''
      }
    </div>
  )

  let messagePrompt = (
    <article className='message_prompt'>
      <div className='top'>
        <p className='add_participant'>Add participant?</p>
        <p>You will add <b>{newGroup.length}</b> {newGroup.length === 1 ? 'participant' : 'participants'} to {group?.groupName}.</p>
      </div>
      <div className='base'>
        <button onClick={addUserToGroup}>Yes</button>
        <button onClick={() => setPromptWindow(false)}>No</button>
      </div>
    </article>
  )

  return (
    <ParticipantsComponent>
      <TopComponent>
        <div className="top">
          <BsArrowLeft className='arrow' 
            onClick={() => {
              setAddParticipants(false)
              setNewGroup([])  
            }}/>
          <h2>Add participants</h2>
        </div>
        <div className='search'>
          {!newGroup.length ?
            <>
              <input 
                type="text" 
                placeholder='Search'
                value={searchGroup}
                onChange={onGroupUserChange}
              />
            </> 
            :
             selectedContact
          }
        </div>
      {newGroup?.length >= 1 && 
        <button
          onClick={() => setPromptWindow(true)}
        >
          Add <b>{newGroup?.length}</b> {newGroup?.length === 1 ? 'person' : 'people'}
        </button>}
      </TopComponent>
      <BaseComponent>
        <div className='allUsers'>All users</div>
          {
            filteredParticipantsSearch ? 
            filteredParticipantsSearch.map(user => (
              <div key={user?._id} className='contacts'>
                <Participants user={user} />
              </div>
              ))
             :
            <p>user not found</p>
          }
          {promptWindow && messagePrompt}
      </BaseComponent>
    </ParticipantsComponent>
  )
}

const ParticipantsComponent = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
box-sizing: border-box;
overflow: hidden;
padding-bottom: 1rem;
`
const TopComponent = styled.div`
flex: 2;
display: flex;
flex-direction: column;
width: 100%;
padding: 3px;

  .top{
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .arrow{
      font-size: 28px;
      background-color: #323232;
      padding: 4px;
      border-radius: 50%;

      &:active{
        scale: 0.95;
      }
    }
  }

  .search{
    display: flex;
    align-items: center;
    width: 100%;
    margin: auto;
    background-color: #333333;
    padding: 0.1rem;
    color: gray;
    border-radius: 5px;
    border-bottom: 1px solid rgba(255,255,255,0.4);

    .selected_container{
      display: flex;
      align-items: center;
      max-height: 4.4rem;
      flex-wrap: wrap;
      gap: 0.1rem;
      width: 100%;
      overflow-y: scroll;

      .selected_contact{
        display: flex;
        align-items: center;
        background-color: #26a69a;
        color: white;
        padding: 0.05rem 0.09rem;
        max-width: 65px;
        border-radius: 5px;
        opacity: 0.98;

        .contact{
          color: rgba(0,0,0,0.45);
        }

        p{
          margin-left: -1rem;
        }
      }

      &::-webkit-scrollbar{
        width: 1px;
      }
    
      &::-webkit-scrollbar-track {
        background: transparent;
      }
    
      &::-webkit-scrollbar-thumb {
        background: gray;
      }
    }
    
    input{
      border: none;
      height: 100%;
      flex-grow: 4;
      padding: 0.3rem;
      color: gray;
      background-color: transparent;

      &:focus{
        outline: none;
        box-shadow: 0 1px 0 rgba(0,255,0,0.4);
      }

      &::placeholder{
        color: rgba(255,255,255, 0.7);
      }
    }

    &:focus{
      
    }
  }

  button{
    width: 100%;
    border-radius: 5px;
    background-color: rgba(0,190,160,0.99);
    border: none; 
    padding: 7px;
    font-weight: 500;
    transition: all 0.15s ease-in-out;

    &:focus{
      outline: none;
    }
    
    &:hover{
      background-color: rgba(0,190,160,0.87);
    }

    &:active{
      background-color: rgba(0,190,160,0.99);
    }
  }

  margin-bottom: 0;
`
const BaseComponent = styled.div`
flex: 9;
width: 100%;
margin-top: -0.5rem;
display: flex;
flex-direction: column;
overflow-y: scroll;
position: relative;
gap: 0;

  .allUsers{
    flex: none;
    align-self: flex-start;
    background-color: #343232;
    z-index: 50;
    min-width: 100%;
    padding: 12px 4px 3px 8px;
    font-size: 18px;
    position: sticky;
    top: 0;
  }

  .contacts{
    margin-top: -4px;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.08rem 0.1rem;
    border-radius: 5px;
    z-index: 1;
    cursor: pointer;
    margin-bottom: -8px;

    .pics{
      font-size: 3rem;
      color: gray;
    }

    .profile-picture{
      width: 2.5rem;
      flex-grow: none;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
    }

    .top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .date{
        color: gray;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        transform: translatey(50%);
      }

      p{

        input{
          width: 15px;
          height: 15px;
          box-shadow: 2px 4px 16px rgba(0,0,0,0.1);
          background-color: #333333;
          cursor: pointer;

          &:checked{
            background-color: green;
          }
        }
      }
    }

    &:hover{
      background-color: rgba(200,200,200,0.1);
    }
  }

  &::-webkit-scrollbar{
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: gray;
  }

  .message_prompt{
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 55vw;
    height: 25vh;
    gap: 0;
    border-radius: 20px;
    font-size: 15px;
    border: 1px solid gray;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.2);
    z-index: 999;
    top: 13rem;
    right: 2rem;
    color: white;
    box-sizing: border-box;

    @media (max-width: 1000px){
      min-width: 55vw;
      right: 2rem;
    }

    @media (min-width: 1050px){
      min-width: 40vw;
      right: 5rem;
    }

    @media (max-width: 600px){
      min-width: 65vw;
      right: -1rem;
    }

    .top{
      background-color: #363938;
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      padding: 0 1.7rem;
      height: 50%;
      flex: 1;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      gap: 0.58rem;
      word-wrap: break-all;
      white-space: pre-wrap;

      .add_participant{
        font-weight: 600;
      }
    }

    .base{
      flex: 1;
      margin-top: 0;
      background-color: #333333;
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-around;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;

      button{
        padding: 0.5rem 3.5rem;
        background-color: rgba(255,255,255,0.06);
        transition: all 0.15s ease-in-out;
        right: 2rem;
        color: white;
        border-radius: 5px;
        border: none;
        box-shadow: 2px 4px 16px rgba(0,0,0,0.2);

        &:focus{
          outline: none;
        }

        &:hover{
          background-color: rgba(255,255,255,0.08);
        }

        &:active{
          scale: 0.98;
          background-color: rgba(255,255,255,0.08);
        }
      }
    }
  }
`
