import {CiSearch} from 'react-icons/ci';
import {FaArrowLeft} from 'react-icons/fa';
import {TiGroupOutline} from 'react-icons/ti';
import {BsPersonCircle} from 'react-icons/bs';
import styled from 'styled-components';
import { useChatContext } from '../../hooks/useChatContext';
import { useEffect, useState } from 'react';

export const SearchCon = ({ groupConvo }) => {
  const {searchUsers, setSearchUsers, setOpen, setNewGroup, setClick, proceed, setProceed, isNext, setIsNext, newGroup, open} = useChatContext()
  const [groupUser, setGroupUser] = useState([]);
  // const [openGroup, setOpenGroup] = useState(true)
  // console.log({openGroup})
  // useEffect(() => {
  //   setOpenGroup(false)
  // }, [open])
  
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
  
  let newConvo = (
    <>
      <div className={`new-chat ${!groupConvo && 'chat'}`}>
        {
          groupConvo && 
            <div onClick={() => {
              setOpen(false)
              setClick(true)
              setIsNext(false)
              setProceed(false)
              setNewGroup([])
            }}>
              <FaArrowLeft className='arrow'/>
            </div>
        } 
        New {groupConvo ? 'Group' : 'Chat'}
      </div>
      <div className='search'>
        {!newGroup.length ?
          <>
            <input 
              type="text" 
              placeholder='Search'
              value={searchUsers}
              onChange={e => setSearchUsers(e.target.value)}
            />
            <CiSearch className='field'/>
          </> 
          :
          selectedContact
        }
      </div>
      {!groupConvo ?
       (
         <div
          onClick={() => {
            setOpen(true)
            setClick(false)
          }}
          className='group'>
            <div className='icon'>
              <TiGroupOutline className='group-icon'/>
            </div>
            <p>New group</p>
          </div>
        )
        :
        ((isNext && !proceed) &&
          <div className='proceed'>
            <button onClick={() => setProceed(true)}>Next</button>
            <button onClick={() => setProceed(false)}className='cancel'>Cancel</button>
          </div>
        )
      }
      {!proceed &&
        <p
          style={groupConvo && group}
        >
          {groupConvo ? 'All users' : 'Frequently contacted'}
        </p>
      }
    </>
  )
  return (
    <SearchContainer>
      {newConvo}
    </SearchContainer>
  )
}

const group = {paddingTop: '1rem', paddingBottom: '1rem'}

const SearchContainer = styled.div`
position: sticky;
top: 0;
background-color: #363636;
//background-color: #333;
z-index: 50;

  .chat{
    margin-left: 0.5rem;
  }

  .new-chat{
    padding: 0.6rem 0.5rem;
    font-size: 18px;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.7rem;

    div{
      cursor: pointer;
      padding: 0.5rem;
      transition: 0.24s all;
      border-radius: 50%;
      display: grid;
      place-content: center;

      .arrow{
      }

      &:hover{
        background-color: #828282;
      }
    }
  }

  .search{
    display: flex;
    align-items: center;
    width: 88%;
    margin: auto;
    background-color: #48494B;
    padding: 0.2rem;
    color: white;
    border-radius: 5px;
    box-shadow: 0 2px 0 #28a99e;

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
        padding: 0.05rem;
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
      color: white;
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

  p{
    padding: 0.1rem 1.3rem;
    color: lightgray;
  }

  .group{
    display:flex;
    align-items: center;
    width: 90%;
    padding: 0.3rem 1rem 0.3rem 1rem;
    cursor: pointer;
    border-radius: 10px;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.85rem;

    .icon{
      padding: 0.8rem;
      height: 40px;
      width: 40px;
      display: grid;
      place-content: center;
      background-color: rgb(0,250,0);
      color: black;
      font-size: 26px;
      border-radius: 100%;
    }

    p{
      color: white;
    }

    &:hover{
      background-color: rgba(200,200,200,0.3);
    }
  }

  .proceed{
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

`