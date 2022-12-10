import {RiWhatsappFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Top = () => {
  return (
    <TopComponent>
      <div className='logo'>
        <Link to='/'><RiWhatsappFill className='whatsapp-logo'/></Link>
        <Link to='/'><p>Itsoluwatobby</p></Link>
      </div>
    </TopComponent>
  )
}

const TopComponent = styled.div`
padding: 8px 10px;
box-shadow: 2px 4px 16px rgba(0,0,0,0.25);
  
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
