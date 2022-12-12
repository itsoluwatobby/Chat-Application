import {CiSearch} from 'react-icons/ci';
import styled from 'styled-components';
import { useChatContext } from '../../hooks/useChatContext';

export const SearchCon = () => {
  const {searchUsers, setSearchUsers} = useChatContext()
  let newConvo = (
    <>
      <p className='new-chat'>New Chat</p>
      <div className='search'>
        <input 
          type="text" 
          placeholder='Search'
          value={searchUsers}
          onChange={e => setSearchUsers(e.target.value)}
        />
        <CiSearch className='field'/>
      </div>
      <p>Frequently contacted</p>
    </>
  )
  return (
    <SearchContainer>
      {newConvo}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
position: sticky;
top: 0;
background-color: rgb(10,5,5);

  .new-chat{
    padding: 1rem 1.5rem;
    font-weight: 700;
    color: white;
  }

  .search{
    display: flex;
    align-items: center;
    width: 85%;
    margin: auto;
    height: 30px;
    background-color: #333333;
    padding: 0 0.4rem;
    color: white;
    border-radius: 5px;
    box-shadow: 0 1px 0 rgba(255,255,255,0.6);
    
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
    padding: 0.6rem 1.3rem;
    color: gray;
  }
`