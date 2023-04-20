import {RiWhatsappFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Top = ({ setOpenModal }) => {
  return (
    <TopComponent>
      <div className='logo'>
        <Link to='/'><RiWhatsappFill className='whatsapp-logo'/></Link>
        <Link to='/' className='logo_off'><p>Itsoluwatobby</p></Link>
      </div>
      <ul className='button-top'>
        <li
          onClick={() => setOpenModal(false)}
        ><Link to='login' className='links'>Login</Link></li>
        <li
          onClick={() => setOpenModal(false)}
        ><Link to='register' className='links'>Register</Link></li>
        <li
          onClick={() => setOpenModal(prev => !prev)}
          title='About Developer'
          className='links'>About</li>
      </ul>
    </TopComponent>
  )
}

const TopComponent = styled.div`
padding: 8px 10px;
box-shadow: 2px 4px 16px rgba(0,50,10,0.8);
display: flex;
align-items: center;
background-image: gray;
border: none;
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

    @media (max-width: 508px){
      
      .logo_off{
        display: none;
      }
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
      transform: all 0.24s ease-in-out;

      &:focus{
        outline: none
      }

      &:hover{
        color: rgba(255,255,255,0.35);
      }

      .links{
        color: lightgray;
        transform: all 0.24s ease-in-out;

        &:hover{
          color: rgba(255,255,255,0.35);
        }
      }
    }
  }
`
