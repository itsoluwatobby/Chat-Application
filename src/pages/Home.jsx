import React from 'react'
import styled from 'styled-components'
import background1 from '../../public/images/bg-1.png'
import background2 from '../../public/images/bg-2.png'
import background3 from '../../public/images/bg-3.png'
import { AboutModal } from '../components/AboutModal'

export const Home = ({ openModal, setOpenModal }) => {
  return (
    <HomePage>
      <div className='det'>
        <h1>
          Conversations with friends just got better
        </h1>
        <div className='background_image'>
          <div className='bg bg_one'>
            <img src={background2} alt="background-image-2" />
          </div>
          <div className='bg bg_two'>
            <img src={background1} alt="background-image-1" />
          </div>
          <div className='bg bg_three'>
            <img src={background3} alt="background-image-3" />
          </div>
        </div>
        {/* <p className='chatgpt'>Chat App in conjunction with ChatGPT</p> */}
      </div>
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

const HomePage = styled.div`
text-align: center;
display: flex;
flex-direction : column;
// background-image: url(https://www.welovesolo.com/wp-content/uploads/vector02/49/27104511768.jpg);
// background-position: center;
// background-size: cover;
// background-repeat: no-repeat;
// background-blend-mode: color;
height: 100%;
background-image: conic-gradient(black, gray, black);
overflow: hidden;
position: relative;

.det{
  display: flex;
  flex-direction : column;
  gap: 5rem;
  justify-content: space-evenly;
  height: 100%;
}
h1{
  text-align: center;
  font-size: 3rem;
  text-transform: capitalize;
  text-shadow: -2px 0 3px #FF0000, 0 2px 10px #0000FF;
}

.chatgpt{
  font-family: mono;
  font-size: 42px;
  margin-top: -5em;
  text-shadow: -2px 0 3px #FF0000, 0 2px 10px #0000FF;
}

.background_image{
  margin-top: -5rem;
  display: flex;
  justify-content: space-evenly;

  .bg{
    width: 12.5rem;
    height: 15em;
    border-radius: 10px;
    border: 1px solid lightgray;
    //transform: skewY(20deg);
    transform: rotate(50deg);
  

    img{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }
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
