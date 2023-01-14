import styled from "styled-components"
import {CgProfile} from 'react-icons/cg';
import {CiSearch} from 'react-icons/ci';
import { useChatContext } from "../../../../hooks/useChatContext";
import { useEffect, useState } from "react";

export const UsersInGroup = ({ groupUsers }) => {
  const { setChatId, createConvo, currentUser, setOpenGroupInfo } = useChatContext();
  const [search, setSearch] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    const searched = groupUsers.filter(user => (user?.username.toLowerCase()).includes(search.toLowerCase()))
    setSearchedUsers(searched)
  }, [search])

  const openPersonalChat = (user) => {
    //createConvo({adminId: currentUser?._id, friendId: user?._id})
    
    setOpenGroupInfo(false)
    // setChatId({userId: user?._id})
  }

  return (
    <UserGroup className='group_container'>
      <h2>Participants &#40;{groupUsers?.length}&#41;</h2>
      <div className='search'>
        <input 
          type="text" 
          placeholder='Search'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <CiSearch className='field'/>
      </div> 

      <ul>
        {
          searchedUsers.map(user => (
            <li 
              key={user?._id}
              onClick={() => openPersonalChat(user)}
              className='user_detail'>
              <div className="flex_con">
                {user?.profilePicture ? 
                  <img src={user?.profilePicture} alt={user?.username} className="pics"/>
                  :
                  <CgProfile className='profile'/>
                }
                <p className='personal_detail'>
                  <span>{user?.email}</span>
                  <span>{user?.about}</span>
                </p>
              </div>
              <p className='nick_name'>
                <span>~{user?.username}</span>
                <span>role</span>
              </p>
            </li>
          ))
        }
      </ul>
    </UserGroup>
  )
}

const UserGroup = styled.div`

  .search{
    display: flex;
    align-items: center;
    width: 105%;
    background-color: #48494B;
    padding: 0.1rem 0.3rem 0.1rem 0.1rem;
    color: white;
    border-radius: 5px;
    border-bottom: 2px solid rgba(255,255,255,0.45);
    margin-top: 0;
    margin-bottom: 0;
    position: sticky;
    top: 0;

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

  ul{
    margin-top: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 105%;
    gap: 0.1rem;
    overflow-y: scroll;
    color: rgba(255,255,255,0.95);

    .user_detail{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;
      border-radius: 7px;
      padding: 0.15rem 0.7rem;
      transition: all 0.1s ease-in-out;

      .flex_con{
        display: flex;
        align-items: center;
        gap: 0.4rem;

        pics{
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          object-fit: cover;
        }
  
        .profile{
          font-size: 3rem;
          color: gray;
        }
  
        .personal_detail{
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          color: whitesmoke;
        }
      }

      .nick_name{
        display: flex;
        color: whitesmoke;
        flex-direction: column;
        gap: 0.3rem;
      }

      &:hover{
        background-color: rgba(255,255,255,0.05);
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
`