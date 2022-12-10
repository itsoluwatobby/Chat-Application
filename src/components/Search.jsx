import {FiEdit} from 'react-icons/fi'
import {MdMoreHoriz} from 'react-icons/md'
import {CiSearch} from 'react-icons/ci';
import styled from 'styled-components';

export const Search = () => {
  return (
    <SearchComponent className='topbar'>
      <div className='topbar-top'>
        <p>Chats</p>
        <div>
          <FiEdit />
          <MdMoreHoriz />
        </div>
      </div>
      <div className='search'>
        <input 
          type="text" 
          placeholder='Search or start a new chat'
        />
        <CiSearch />
      </div>
    </SearchComponent>
  )
}

const SearchComponent = styled.div`
display: flex;
align-items: center;
padding: 0.5rem 0.5rem;
`
