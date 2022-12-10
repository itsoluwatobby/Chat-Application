import {RiWhatsappFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Search } from './Search'

export const Main = () => {
  return (
    <MainPage>
      <div className='logo'>
        <Link to='/'><RiWhatsappFill className='whatsapp-logo'/></Link>
        <Link to='/'><p>Itsoluwatobby</p></Link>
      </div>
      <Search />
    </MainPage>
  )
}

const MainPage = styled.div`
height: 100%;
display: flex;
flex-grow: 2;
flex-direction: column;
gap: 0.8rem;
padding: 0.6rem;

  .logo{
    display: flex;
    align-items: center;
    gap: 0.5rem;

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
`
