import React from 'react'
import styled from 'styled-components'
import background1 from '/images/bg-1.png'
import background2 from '/images/bg-2.png'
import background3 from '/images/bg-3.png'
import { AboutModal } from '../components/AboutModal'
import { CustomStyles } from '../utils/responsiveness'
import { useNavigate } from 'react-router-dom'
import {RiWhatsappFill} from 'react-icons/ri'


export const Home = ({ openModal, setOpenModal }) => {
  const navigate = useNavigate()

  return (
    <HomePage>
      <div className='det'>
        <div className='container-logo'>
          <p className='title-logo'><span className='firstLetter'>S</span>wift Chat</p>
          <p className='info'>
            Chat with friends and family.
            Connect with all with ease and speed
          </p>

          <button
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
        </div>

        <figure className='bg bg_one'>
          <img src={background2} alt="background-image-2" />
        </figure>
        
        {/* <p className='chatgpt'>Chat App in conjunction with ChatGPT</p> */}
      </div>

      <RiWhatsappFill className='iconfill' />
      {
        openModal && (
          <div className='modal_container'>
            <AboutModal setOpenModal={setOpenModal} />
          </div>
        )
      }
    </HomePage>
  )
}

/**
 * 
 *  <h1>
      Conversations with friends just got better
    </h1> 
 * 
 * <div className='bg bg_two'>
            <img src={background1} alt="background-image-1" />
          </div>
          <div className='bg bg_three'>
            <img src={background3} alt="background-image-3" />
          </div>
 */

const HomePage = styled.div`
display: flex;
flex-direction : column;
width: 100%;
height: 100%;
background-image: conic-gradient(black, gray, black);
overflow: hidden;
position: relative;
align-items: center;
padding: 5rem 3rem 3rem;

  .det{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    
    .container-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      
      .title-logo{
        font-size: 2.9rem;
        text-transform: capitalize;
        text-shadow: -2px 0 3px #FF0000, 0 2px 10px #0000FF;

        .firstLetter {
          font-size: 4rem;
        }
      }

      .info {
        font-size: 17px;
        line-height: 18px;
        word-spacing: 2px;
        letter-spacing: 1px;
        width: 260px;
        padding: 10px;
        text-align: center;
        font-family: sans;
        white-space: pre-wrap;
      }

      button{
        ${CustomStyles.button({
          "background": 'linear-gradient(rgba(220,180,0,0.5),rgba(20,200,50,0.5));',
          "padding": '10px 20px;',
        })}

        &:focus{
          outline: 0;
        }

        &:hover{
          background-color: rgba(20,200,50,0.6);
        }
      }
    }
    
    // .background_image{
    //   display: flex;
    //   justify-content: space-evenly;
    
      .bg{
        width: 9rem;
        height: 13rem;
        border-radius: 10px;
        border: 1px solid lightgray;
        transform: rotate(15deg);
      
        img{
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 10px;
        }
      }
    // }
  }

.chatgpt{
  font-family: mono;
  font-size: 42px;
  margin-top: -5em;
  text-shadow: -2px 0 3px #FF0000, 0 2px 10px #0000FF;
}

.modal_container{
  border: 3px groove gray;
  border-radius: 10px;
  box-shadow: 2px 4px 16px rgba(0,0,0,0.5);
  padding: 8px;
  z-index: 999;
  margin-top: -35rem;
  background-color: #363836;

  @media (min-width: 768px){
    position: absolute;
    top: 35rem;
    align-self: center;
  }
}
`
