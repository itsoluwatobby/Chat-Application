import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import {CgProfile} from 'react-icons/cg';
import {CiEdit} from 'react-icons/ci';
import { RiErrorWarningLine } from 'react-icons/ri';
import { sub } from 'date-fns';
import { useChatContext } from '../../../../hooks/useChatContext';
import { axiosAuth } from '../../../../app/axiosAuth';

export const GroupProfile = ({ target, user, loggedInUser }) => {
  const { currentUser, loadGroup, setChatId, setOpenGroupProfile } = useChatContext();
  const [enterGroupName, setEnterGroupName] = useState('');
  const [enterGroupDescription, setEnterGroupDescription] = useState('');
  const [text, setText] = useState(false);
  const [text2, setText2] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [nameCount, setNameCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const groupNameRef = useRef();
  const descriptionRef = useRef();

  const timeEdit = new Intl.RelativeTimeFormat('en-us', {
    dateStyle: 'short',
    timeStyle: 'full'
  })

  useEffect(() => {
    setEnterGroupName(target?.groupName)
    groupNameRef?.current?.focus()
  }, [openInput])

  useEffect(() => {
    setNameCount(enterGroupName?.length)
  }, [enterGroupName])

  useEffect(() => {
    setEnterGroupDescription(target?.description)
    descriptionRef?.current?.focus()
  }, [openDescription])
  
  useEffect(() => {
    setDescriptionCount(enterGroupDescription?.length)
  }, [enterGroupDescription])

  const onGroupNameChange = e => setEnterGroupName(e.target.value);
  const onGroupDescriptionChange = e => setEnterGroupDescription(e.target.value);

  const updateGroupInfo = async() => {
    setLoading(true)
    const initialState = { groupName: enterGroupName, groupDescription: enterGroupDescription, groupId: target?._id }
    try{
      const res = await axiosAuth.put('/conversation/update_group_info', initialState)
      loadGroup()
      //groupName: enterGroupName, convoId: target?._id
      setChatId({})
      setOpenInput(false)
      setOpenDescription(false)
      ///setOpenGroupProfile(true)
    }
    catch(error){
      setLoading(false)
      console.log(error?.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <GroupProfilePage 
      onDoubleClick={() => {
        setOpenInput(false)
        setOpenDescription(false)
      }}
      className='right_container'>
      {target?.groupAvatar ? 
        <img src={target?.groupAvatar} alt={target?.groupName} className='pics'/>
        : <CgProfile className='profile'/>
      }
        <div className='title'>
          {openInput ? 
            <ProfileInputBox groupName
              refValue={groupNameRef} loading={loading}
              maxValue={25} count={nameCount}
              text={text} setText={setText}
              handleClick={updateGroupInfo}
              inputValue={enterGroupName} 
              onChangeType={onGroupNameChange} 
            />
            :
            <>
              <span className='name'>{user?.username ? user?.username : target?.groupName}</span>
              <span className='edit'>
              {user ?  
                user?._id === currentUser?._id &&
                <CiEdit 
                  onClick={() => setOpenInput(true)}
                  className='icons'/> 
                :
                  target?.adminId === currentUser?._id ? 
                  <CiEdit 
                    onClick={() => setOpenInput(true)}
                    className='icons'/> 
                  : <RiErrorWarningLine className='icon' />
              }
            </span>
            </>
          }
        </div>
        {!user && 
          <>
            <p className='created'>Created</p>
            <p className='date'>{new Date(target?.createdAt?.split('T')[0]).toLocaleString()}</p>
          </>
        }
        <div className='description'>
          <div className='created'>{user ? 'About' : 'Description'}</div>
          <div className='date'>
            {openDescription ? 
              <ProfileInputBox 
                refValue={descriptionRef}
                handleClick={updateGroupInfo}
                maxValue={512} count={descriptionCount}
                text={text2} setText={setText2}
                inputValue={enterGroupDescription} 
                onChangeType={onGroupDescriptionChange} 
              />
              :
              <>
                <span>{user ? user?.about : target?.description}</span>
                <span className='edit'>
                {
                  target?.adminId === currentUser?._id ? 
                  <CiEdit 
                    onClick={() => setOpenDescription(true)}
                    className='icons'/> 
                  : <RiErrorWarningLine className='icon' />
                }
              </span>
              </>
            }
          </div>
        </div>
        <div className='base_buttons'>  
          <p
              //onClick={() => toggleButton(NAVIGATE.FST)} 
            >
            <span>Exit group</span>
          </p>
          <p
              //onClick={() => toggleButton(NAVIGATE.FST)} 
            >
            <span className='report'>Report group</span>
          </p>
        </div>
    </GroupProfilePage>
  )
}

const ProfileInputBox = ({ 
  refValue, groupName, inputValue, onChangeType, text, setText, count, maxValue, handleClick, loading }) => {
  
  return (
    <div>
      <div className='input_box'>
        <input 
          type="text" 
          ref={refValue}
          maxLength={maxValue}
          value={inputValue}
          onChange={onChangeType}
        />
      </div>
      {groupName ?
        <button
          onMouseEnter={() => setText(true)}
          onMouseLeave={() => setText(false)}
          onClick={handleClick}
        >{text ? 
          <span>{loading ? '---' : 'Done'}</span> 
            : 
          <span>{count}/25</span>
        }
        </button>
        :
        <button
          onMouseEnter={() => setText(true)}
          onMouseLeave={() => setText(false)}
          onClick={handleClick}
        >{text ? 
            <span>{loading ? '---' : 'Done'}</span> 
              : 
            <span>{count || 0}/512</span>
          }
          </button>
      }
    </div>
  )
}


const GroupProfilePage = styled.div`

  .pics{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .profile{
    font-size: 5.5rem;
    color: gray;

    &:hover{
      color: rgba(0,0,0,0.25);
    }
  }

  .title{
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 99;

    div{
      display: flex;
      flex-direction: column;
      gap: 0.05rem;

      .input_box{
        margin-top: 0.6rem;
        flex: 1;
        min-width: 30vw;
        background-color: #333333;
        border-bottom: 2px solid rgba(255,235,255,0.6);
        color: white;
        border-radius: 5px;
        z-index: 999;
  
        input{
          border: none;
          height: 100%;
          width: 100%;
          color: white;
          padding: 0.4rem;
          background-color: transparent;
  
          &:focus{
            outline: none;
          }
        }
      }

      button{
        align-self: flex-end;
        border-radius: 6px;
        border: none;
        font-size: 14px;
        padding: 0.18rem 1.3rem;
        background-color: rgba(0,250,190,0.5);

        &:focus{
          outline: none;
        }

        &:active{
          background-color: rgba(0,250,190,0.7);
        }
      }
    }


    .name{
      font-size: 1.8rem;
      font-weight: 300;
      white-space: pre-wrap;
    }

    .edit{
      flex: none;
      margin-top: 0.4rem;
      position: fixed;
      right: 1.5rem;
      border-radius: 5px;
      padding: 6px;
      display: grid;
      place-content: center;
      cursor: auto;
      font-size: 14px;
      transition: all 0.15s ease-in-out;
      z-index: 999;

      .icons{
        font-size: 20px;
      }

      &:hover{
        background-color: rgba(255,255,255,0.16);
      }
    }
  }

  .created{
    font-size: 14px;
    color: rgba(255,255,255,0.5);
  }

  .date{
    margin-top: -0.2rem;
    font-size: 14px;
    color: rgba(255,255,255,0.95);
    z-index: 99;
  }

  .description{
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.95rem;

    .date{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: pre-wrap;

      div{
        display: flex;
        flex-direction: column;
        gap: 0.05rem;
  
        .input_box{
          margin-top: 0.6rem;
          flex: 1;
          min-width: 30vw;
          background-color: #333333;
          border-bottom: 2px solid rgba(255,235,255,0.6);
          color: white;
          border-radius: 5px;
          z-index: 999;
    
          input{
            border: none;
            height: 100%;
            width: 100%;
            color: white;
            padding: 0.4rem;
            background-color: transparent;
    
            &:focus{
              outline: none;
            }
          }
        }
  
        button{
          align-self: flex-end;
          border-radius: 6px;
          border: none;
          font-size: 14px;
          padding: 0.18rem 1.3rem;
          background-color: rgba(0,250,190,0.5);
  
          &:focus{
            outline: none;
          }
  
          &:active{
            background-color: rgba(0,250,190,0.7);
          }
        }
      }


      .edit{
        margin-top: 0.2rem;
        display: grid;
        place-content: center;
        position: fixed;
        right: 1.5rem;
        border-radius: 5px;
        padding: 6px;
        cursor: auto;
        font-size: 14px;
        transition: all 0.15s ease-in-out;
        z-index: 999;

        .icons{
          font-size: 20px;
        }

        &:hover{
          background-color: rgba(255,255,255,0.16);
        }
      }
    }
  }

  .base_buttons{
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 1rem;

    p{
      display: grid;
      place-content: center;
      font-size: 14px;
      gap: 0.8rem;
      color: white;
      padding: 7px;
      cursor: default;
      font-weight: 300;
      border-radius: 5px;
      width: 8.4rem;
      background-color: rgba(255,255,255,0.05);
      transition: all 0.15s ease-in-out;

      .report{
        color: rgba(255,90,0,0.99);
      }

      .icon{
        font-size: 19px;
      }

      &:hover{
        background-color: rgba(255,255,255,0.08);
      }

      &:active{
        background-color: rgba(255,255,255,0.05);
      }
    }
  }

`