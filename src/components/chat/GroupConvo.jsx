import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { axiosAuth } from '../../app/axiosAuth';
import { useChatContext } from '../../hooks/useChatContext';
import { useGetOthers } from '../../hooks/useGetOthers';
import { SearchCon } from './SearchCon';
import { Users } from './Users';
import {TbCameraPlus} from 'react-icons/tb';
import { BsEmojiSmile } from 'react-icons/bs';

export const GroupConvo = () => {
  const {setOpen, setClick, isNext, proceed, setProceed, conversation, searchUsers, setConversation, refresh} = useChatContext();
  const currentUserId = localStorage.getItem('userId');
  const [result] = useGetOthers(currentUserId);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newGroup, setNewGroup] = useState([]);
  const [image, setImage] = useState('')
  const [groupName, setGroupName] = useState('')

  const onImageChange = e => setImage(e.target.files[0])

  const editedUsers = result && Array.isArray(result) && result.map(eachUser => {
    return { ...eachUser, checked: false }
  })

  const filteredSearch = editedUsers && Array.isArray(editedUsers) && editedUsers.filter((user, i) => !conversation[i]?.conversationId.includes(user?.conversationId[i]) && (user.username.toLowerCase()).includes(searchUsers.toLowerCase()))
  
  const createGroupConvo = async() => {
    if(newGroup.length && groupName){
      try{
        const res = await axiosAuth.post(`/conversation/create_group/${currentUserId}`, {
          memberIds: newGroup, groupName
        })
        setConversation(prev => [...prev, res.data])
        console.log(res?.data)
        setGroupName('')
        setNewGroup([])
        refresh()
      }
      catch(error) {
        let errorMessage;
        error?.response?.status === 400 ? errorMessage = 'id required' :
        error?.response?.status === 404 ? errorMessage = 'not found' :
        error?.response?.status === 409 ? errorMessage = 'conversation already exist' :
        error?.response?.status === 500 ? errorMessage = 'internal error' : errorMessage = 'no server response'
        setError(errorMessage)
      }
      finally{
        setLoading(false)
      }
    }
    else return
  }
  
  useEffect(() => {
    if(!image) return
    if(image?.size > 1448576){
      setImage('')
      return alert('Max allowed size is 1.4mb')
    }
  }, [image])

  return (
    <GroupConversation>
      <SearchCon groupConvo/>
      {!(proceed && isNext) ?
        (
          !Array.isArray(result) ?
          <p className='error'>{result}</p>
          :
          filteredSearch.map(user => (
            <div onClick={() => setError('')} key={user._id}>
              <Users 
                user={user} loading={loading} 
                error={error} groupConvo  
                newGroup={newGroup} setNewGroup={setNewGroup}
              />
            </div>
          ))
        )
        :
        (
          <div className='group_content'>
            <div className='image'>
              <input 
                type="file" 
                id='image'
                onFocus={() => setError('')}
                onChange={onImageChange}
                accept= 'image/*'
                hidden
              />
              <label htmlFor="image">
              {
                image ? 
                  <img src={URL.createObjectURL(image)} alt={image.originalFilename} 
                  className='profile-picture'/> 
                  :
                  <div className='camera'>
                    <TbCameraPlus className='pics'/>
                  </div>
                }
                {/* change this IMAGE condition later */}
                <p>
                    {image ? 'Change group icon' 
                      : <>
                          Add group icon 
                          <span style={{color: 'gray'}}> (optional)</span>
                        </>}
                </p>
              </label>
            </div>
            <div className='group_name'>
              <p className='title'>
                Provide a group subject 
                <span> required*</span>
              </p>
              <p className='input_name'>
                <input 
                  type="text" 
                  placeholder='Enter a subject'
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                />
                <BsEmojiSmile className='smile'/>
              </p>
            </div>
              <div className='proceed'>
                <button onClick={createGroupConvo}>Create</button>
                <button onClick={() => setProceed(false)}className='cancel'>Cancel</button>
              </div>
          </div>
          )
        }
      </GroupConversation>
    )
  }

const GroupConversation = styled.div`
  position: absolute;
  z-index: 60;
  top: 4rem;
  transform: translate(90%);
  width: 17.5em;
  background-color: #363636;
  border-radius: 10px;
  overflow-y: scroll;
  padding: 0.1rem 0 0.1rem 0;
  box-shadow: -2px 4px 16px rgba(0,0,0,0.3);

  @media (max-width: 1108px){
    transform: translate(60%);
  }

  &::-webkit-scrollbar{
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
  }

  .group_content{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    padding-top: 1rem;

    .image{
      display: flex;
      width: 100%;
      align-items: center;

      label{
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        gap: 1rem;

        .profile-picture{
          width: 40px;
          flex-grow: none;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
          cursor: pointer;
        }

        .camera{
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: grid;
          place-content: center;
          padding: 0.5rem;
          background-color: rgba(0,0,0,0.25);
          cursor: pointer;
          
          .pics{
            font-size: 1.1rem;
            font-weight: 500;
            color: #fdf6e4;
          }
        }

        p{
          cursor: pointer;
        }
      }
    }

    .group_name{

      .title{
        margin-left: 1rem;
        padding-bottom: 0.6rem;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 0.3rem;

        span{
          color: gray;
        }
      }

      .input_name{
        display: flex;
        align-items: center;
        width: 88%;
        margin: auto;
        height: 26px;
        background-color: #48494B;
        padding: 0 0.4rem;
        color: white;
        border-radius: 5px;
        box-shadow: 0 1px 0 #ffffff;

        input{
          border: none;
          height: 100%;
          flex-grow: 4;
          padding: 0.3rem;
          color: white;
          background-color: transparent;

          &:focus{
            outline: none;
            box-shadow: 0 1px 0 rgba(0,255,0,0.4);
            background-color: rgba(0,0,0,0.25);
          }

          &::placeholder{
            color: lightgray;
          }
        }

        &:focus{
          box-shadow: 0 1px 0 rgba(0,255,0,0.4);
          background-color: rgba(0,0,0,0.25);
        }
        
        .smile{
          font-size: 15px;
        }
      }
    }

    .proceed{
      margin-top: 2.5rem;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0.4rem 0.6rem;
      gap: 0.25rem;
  
      button{
        width: 100%;
        border-radius: 5px;
        padding: 0.5rem;
        border: none;
        background-color: #28a99e;
        box-shadow: -1px 2px 16px rgba(0,0,0,0.4);
        cursor: pointer;
        transition: 0.25 all;
  
        &:focus{
          outline: none;
        }
  
        &:hover{
          opacity: 0.9;
        }
      }
  
      .cancel{
        background-color: #777b7e;
        color: white;
        transition: 0.25 all;
  
        &:hover{
          opacity: 0.8;
        }
      }
    }
  }

`