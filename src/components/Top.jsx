import {RiWhatsappFill} from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Lgscreen, Mobile, MaxMobile } from '../utils/responsiveness'
import { useEffect, useState } from 'react'

let prevPathname = ''
export const Top = ({ openModal, setOpenModal }) => {
  const { pathname } = useLocation()
  const [navName, setNavName] = useState('Home')
  const [openDropdown, setOpenDropdown] = useState(false)

  useEffect(() => {
    if (pathname !== prevPathname){
      setOpenDropdown(false)
      prevPathname = pathname
    }
    // else if (openModal && !openDropdown){
    //   setOpenModal(false)
    // }
  }, [pathname, openModal])


  return (
    <TopComponent openDropdown={openDropdown}>
      <Link to='/' className='logo'>
        <p><span className='firstLetter'>S</span>wift</p>
        <RiWhatsappFill className='whatsapp-logo'/>
      </Link>

      <BurgerModal 
      openDropdown={openDropdown}
      className='button-top'>
        <li
          onClick={() => setOpenModal(false)}
        ><Link to='/' className='links'>Home</Link></li>
        <li
          onClick={() => setOpenModal(false)}
        ><Link to='login' className='links'>Login</Link></li>
        <li
          onClick={() => setOpenModal(false)}
        ><Link to='register' className='links'>Register</Link></li>
        <li
          onClick={() => {
            setOpenModal(prev => !prev)
            setOpenDropdown(false)
          }}
          title='About Developer'
          className='links'>About Us</li>
        <li
          onClick={() => {
            setOpenModal(prev => !prev)
            setOpenDropdown(false)
          }}
          title='About Developer'
          className='links'>Contact</li>
      </BurgerModal>

      <DropDownButton 
      openDropdown={openDropdown}
      onClick={() => setOpenDropdown(prev => !prev)}
      className='burgerButton'>
        {openDropdown ? 'Close' : 'Open'}
        {/* <HamBurger
         openDropdown={openDropdown}
         className='burger1' />
        <HamBurger 
        openDropdown={openDropdown}
        className='burger2' />
        <HamBurger 
        openDropdown={openDropdown}
        className='burger3' /> */}
      </DropDownButton>
    </TopComponent>
  )
}

const TopComponent = styled.div`
position: relative;
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
      display: 'none'
    })}

  }

  ${Lgscreen({
    padding: '16px 40px 0 40px'
  })}
`

const BurgerModal = styled.ul`

  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  list-style: none;
  padding: 5px 0;

  ${MaxMobile(
    {
      display: props => props.openDropdown ? 'flex' : 'none',
      flexDirection: 'column', 
      position: 'absolute',
      top: '3.5rem',
      right: '0',
      left: '0',
      width: '100%',
      zIndex: '50',
      backgroundColor: 'rgba(0,0,0,0.95)',
      gap: '0.8rem',
      padding: '1.5rem',
      // height: '95vh',
    }
  )}
  
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

`

const DropDownButton = styled.button`

  background-color: ${props => props.openDropdown ? 'rgba(255,255,250,0.1)' : 'inherit'};
  transition: all 0.2s ease-in-out;
  border: none;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  // width: 32px;
  height: 32px;
  cursor: pointer;
  color: white;
  border-radius: 10px;
  padding: 4px 10px;
  // border-radius: ${props => props.openDropdown ? '100%' : ''};


  ${MaxMobile(
    {
      display: 'flex',
    }
  )}

  &:focus {
    outline: 0;
  }

  &:hover {
    opacity: 0.8;
  }
`

const HamBurger = styled.span`

width: 32px;
border-radius: 3px;
height: 2px;
transition: all 0.2s ease-in-out;

.burger1 {
  background-color: ${props => props.openDropdown ? 'gray' : 'lightgray'};
  transform: ${props => props.openDropdown ? 'rotate-[45deg]' : ''};
}

.burger3 {
  background-color: ${props => props.openDropdown ? 'gray' : 'lightgray'};
  transform: ${props => props.openDropdown ? '-rotate-[45deg]' : ''};
}

.burger2 {
  display: ${props => props.openDropdown ? 'hidden' : 'block'};
  background-color: white;
}
`