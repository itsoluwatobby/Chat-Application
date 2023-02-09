import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import {CgProfile} from 'react-icons/cg';
import {CiEdit} from 'react-icons/ci';
import { RiErrorWarningLine } from 'react-icons/ri';
import LoadingEffect from '../../../../../assest/Button-Rolling-1s-24px.svg';
import { useChatContext } from '../../../../../hooks/useChatContext';
import { axiosAuth } from '../../../../../app/axiosAuth';
import { FaTimes } from 'react-icons/fa';

export const Profile = ({ profileImage, setProfileImage }) => {
  const { currentUser, setChatId, uploadToCloud, url, setUrl, updateUserInfo } = useChatContext();
  const [enterNickName, setEnterNickName] = useState('');
  const [enterAbout, setEnterAbout] = useState('');
  const [text, setText] = useState(false);
  const [text2, setText2] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [nameCount, setNameCount] = useState(0);
  const [aboutCount, setaboutCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reveal, setReveal] = useState(false);
  const usernameRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    setEnterNickName(currentUser?.username)
    usernameRef?.current?.focus()
  }, [openInput])

  useEffect(() => {
    setNameCount(enterNickName?.length)
  }, [enterNickName])

  useEffect(() => {
    setEnterAbout(currentUser?.about)
    aboutRef?.current?.focus()
  }, [openAbout])
  
  useEffect(() => {
    setaboutCount(enterAbout?.length)
  }, [enterAbout])

  const onUsernameChange = e => setEnterNickName(e.target.value);
  const onAboutChange = e => setEnterAbout(e.target.value);
  const onProfileImageChange = e => setProfileImage(e.target.files[0])

  useEffect(() => {
    if(!profileImage) return
    if(profileImage?.size > 1448576){
      setProfileImage('')
      return alert('Max allowed size is 1.4mb')
    }
    else{
      uploadToCloud(profileImage)
    }
  }, [profileImage])

  const updateUser = async() => {
    setLoading(true)
    try{
      const initialState = { username: enterNickName, about: enterAbout, userId: currentUser?._id, profilePicture: url }
      await updateUserInfo(initialState)
      setProfileImage(null)
      setUrl(null)
      setOpenInput(false)
      setOpenAbout(false)
    }
    catch(error){
      console.log(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  const imageReveal = (
    profileImage &&
      <article className='main'>
        <img src={URL.createObjectURL(profileImage)} alt={profileImage?.originalFilename} className='image' />
        <FaTimes onClick={() => setReveal(false)}
          className='trash'
        />     
      </article>
  )

  return (
    <UserProfilePage 
      onDoubleClick={() => {
        setOpenInput(false)
        setOpenAbout(false)
      }}
      className='right_container'>
            <div 
              className='image'>
              <input 
                type="file" 
                id='profileImage'
                onFocus={() => setError('')}
                onChange={onProfileImageChange}
                accept= 'image/*'
                hidden
              />
              <label htmlFor="profileImage">
              {
                (!profileImage && currentUser?.profilePicture) ? 
                  <img src={currentUser?.profilePicture} alt={currentUser?.username} className='pics'/>
                :
                profileImage ? 
                  <img src={URL.createObjectURL(profileImage)} 
                  alt={profileImage.originalFilename} 
                  // onMouseEnter={() => setReveal(true)}
                  className='pics'/> 
                  :
                  <CgProfile className='profile'/>
                }
              </label>
              {(reveal && profileImage) && imageReveal}
              {profileImage && 
                <>
                  <button 
                    onClick={updateUser}
                    className='upload'
                  >{
                      loading ? 
                        <img src={LoadingEffect} alt='---' /> : 'upload'
                    }
                  </button>
                  <button 
                    onClick={() => setReveal(true)}
                    className='upload2'
                  >Preview
                  </button>
                </>
              }
            </div>

        <div className='title'>
          {openInput ? 
            <ProfileInputBox groupName
              refValue={usernameRef} loading={loading}
              maxValue={25} count={nameCount}
              text={text} setText={setText}
              handleClick={updateUser}
              inputValue={enterNickName} 
              onChangeType={onUsernameChange} 
            />
            :
            <>
              <span className='name'>{currentUser?.username}</span>
              <span className='edit'>
                <CiEdit 
                  onClick={() => setOpenInput(true)}
                  className='icons'/> 
              </span>
            </>
          }
        </div>
        <div className='description'>
          <div className='created'>About</div>
          <div className='date'>
            {openAbout ? 
              <ProfileInputBox 
                refValue={aboutRef}
                handleClick={updateUser}
                maxValue={512} count={aboutCount}
                text={text2} setText={setText2}
                inputValue={enterAbout} 
                onChangeType={onAboutChange} 
              />
              :
              <>
                <span>{currentUser?.about}</span>
                <span className='edit'>
                  <CiEdit 
                    onClick={() => setOpenAbout(true)}
                    className='icons'/> 
                </span>
              </>
            }
          </div>
        </div>
    </UserProfilePage>
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
          <span>{loading ? <img src={LoadingEffect} alt='---' /> : 'Done'}</span> 
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
            <span>{loading ? <img src={LoadingEffect} alt='---' /> : 'Done'}</span> 
              : 
            <span>{count || 0}/512</span>
          }
          </button>
      }
    </div>
  )
}

const UserProfilePage = styled.div`

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

  img{
    width: 15px;
    object-fit: cover;
  }

  .upload{
    width: 50px;
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

        img{
          width: 15px;
        }

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

          img{
            width: 15px;
          }
  
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

  .main{
    z-index: 90;
    position: fixed;
    top: 2rem;
    width: 270px;
    height: 220px;
    border-radius: 20px;
    border: 2px solid white;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.25);
    box-sizing: border-box;
    z-index: 500;

    .image{
      width: 100%;
      height: 100%;
      border-radius: 20px;
      object-fit: cover;      
    }
  
    .trash{
      position: absolute;
      color: rgba(0,0,0,0.6);
      background-color: lightgray;
      box-shadow: 2px 4px 16px rgba(0,0,0,0.5);
      border-radius: 50%;
      top: 8px;
      right: 0.4rem;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.15s ease-in-out;

      &:hover{
        color: rgba(0,0,0,0.7);
        scale: 0.95;
      }

      &:active{
        scale: 1;
      }
    }
  }

`