import {FiEdit} from 'react-icons/fi'
import {MdMoreHoriz} from 'react-icons/md'
import {CiSearch} from 'react-icons/ci';
import styled from 'styled-components';
import {RiWhatsappFill} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector ,useDispatch} from 'react-redux'
import { getCurrentUser, logoutUser } from '../features/authSlice';
import { useChatContext } from '../hooks/useChatContext';

export const Search = () => {
  const dispatch = useDispatch()
  const {setChatId, setMessageBody, setClick} = useChatContext()
  const currentUser = useSelector(getCurrentUser);
  const navigate = useNavigate()

  const handleLogout = async() => {
    await dispatch(logoutUser(currentUser?._id))
    setChatId('')
    setMessageBody({})
    navigate('/')
  }

  let searchContent = (
    <>
      <div onClick={() => setClick(false)} className='logo'>
        <Link to='/'><RiWhatsappFill className='whatsapp-logo'/></Link>
        <Link to='/'><p>Itsoluwatobby</p></Link>
        <button onClick={handleLogout} className='logout'>Logout</button>
      </div>
      <div className='topbar'>
        <p onClick={() => setClick(false)}>Chats</p>
        <div>
          <FiEdit onClick={() => setClick(true)} className='edit'/>
          <MdMoreHoriz className='more'/>
        </div>
      </div>
      <div onClick={() => setClick(false)} className='search'>
        <input 
          type="text" 
          placeholder='Search or start a new chat'
        />
        <CiSearch className='field'/>
      </div>
    </>
  )

  return (
    <SearchComponent>
      {searchContent}
    </SearchComponent>
  )
}

const SearchComponent = styled.div`
display: flex;
flex-direction: column;
padding: 0.4rem 0.4rem 1rem 0.4rem;
width: 100%;
gap: 0.7rem;
position: sticky;
top: 0;
background-color: rgba(25,30,28);
border-radius: ${props => !props.newConversation && '10px'};
box-shadow: ${props => props.newConversation && '2px 4px 16px rgba(0,0,0,0.3)'};
z-index: 50;

  .new-chat{
    margin-top: 1rem;
    font-weight: 600;
  }

  .logo{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    top: 0;
    z-index: 50;

    .logout{
      position: absolute;
      right: 0.1rem;
      border-radius: 5px;
      cursor: pointer;
      padding: 0.35rem;
      border: none;
      background-color: rgba(255,0,0,0.7);

      &:focus{
        outline: none
      }

      &:hover{
        background-color: rgba(255,0,0,0.8);
      }
    }

    .whatsapp-logo{
      color: green;
      font-size: 24px;
      cursor: pointer;
    }

    p{
      font-size: 18px;
      cursor: pointer;
      text-decoration: none;
      color: white;
    }
  }

  .topbar{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0.4rem;
    justify-content: space-between;

    p{
      font-size: 19px;
      font-weight: 600;
    }

    div{
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      gap: 0.2rem;

      .edit{
        font-size: 40px;
        cursor: pointer;
        padding: 10px;
        border-radius: 5px;

        &:hover{
          background-color: rgba(255,255,255,0.1);
        }
      }

      .more{
        font-size: 40px;
        cursor: pointer;
        padding: 10px;
        border-radius: 5px;

        &:hover{
          background-color: rgba(255,255,255,0.1);
        }
      }
    }
  }

  .search{
    display: flex;
    align-items: center;
    width: 100%;
    height: 33px;
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
      }

      &::placeholder{
        color: rgba(255,255,255, 0.7);
      }
    }

    .field{
      flex-grow: 1;
      transform: rotatey(200deg);
    }
  }
`
