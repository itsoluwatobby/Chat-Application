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
      <ul className='button-top'>
        <li><Link to='login' className='links'>Login</Link></li>
        <li><Link to='register' className='links'>Register</Link></li>
      </ul>
    </TopComponent>
  )
}

const TopComponent = styled.div`
padding: 8px 10px;
box-shadow: -2px 4px 16px rgba(50,150,150,0.25);
display: flex;
align-items: center;
background-image: conic-gradient(black, gray, black);
justify-content: space-between;
  
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

  ul{
    display: flex;
    align-items: center;
    gap: 1rem;
    list-style: none;
    padding: 0;
    
    li{
      padding: 0.3rem;
      font-size: 17px;
      border-radius: 5px;
      border: none;
      color: lightgray;
      cursor: pointer;

      &:focus{
        outline: none
      }

      &:hover{
        color: rgba(255,255,255,0.35);
      }

      .links{
        color: lightgray;
      }
    }
  }
`
