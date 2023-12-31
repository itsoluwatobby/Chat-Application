import {RiWhatsappFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Lgscreen, MaxMobile, Mobile } from '../utils/responsiveness'

export const Top = ({ setOpenModal }) => {
  return (
    <TopComponent>
      <Link to='/' className='logo'>
        <p><span className='firstLetter'>S</span>wift</p>
        <RiWhatsappFill className='whatsapp-logo'/>
      </Link>
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
padding: 16px 25px 0 25px;
box-shadow: 2px 4px 16px rgba(0,50,10,0.8);
display: flex;
align-items: center;
background-color: rgba(0,0,0,0.3);
border: none;
justify-content: space-between;
  
  .logo{
    flex: none;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .whatsapp-logo{
      color: green;
      font-size: 28px;
      cursor: pointer;
    }

    p{
      font-size: 18px;
      cursor: pointer;
      text-decoration: none;
      color: white;

      .firstLetter {
        font-size: 36px;
        font-weight: 700;
      }
    }

    ${Mobile({
      display: 'none;'
    })}

  }

  ul{
    flex: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
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
        color: rgba(255,255,255,0.7);
      }

      .links{
        color: lightgray;
        transform: all 0.24s ease-in-out;

        &:hover{
          color: rgba(255,255,255,0.8);
        }
      }
    }
  }

  ${Lgscreen({
    padding: '16px 40px 0 40px'
  })}
`
