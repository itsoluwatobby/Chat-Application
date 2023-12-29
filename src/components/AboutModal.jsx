import React from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

export const AboutModal = ({ setOpenModal }) => {
  return (
    <ArticleContainer className='article'>
      <h2 className='about_topic'>About Developer</h2>
      <FaTimes
        onClick={() => setOpenModal(false)} 
        className='cancel_button'/>
      <div className='content'>
        <span className='texts'>
          I&apos;m Oluwatobi Samuel Akinola, a software developer with over two years experience. I have gained extensive knowledge and skills in various programming languages and frameworks, including Javascript, Typescript, Node.js, React.js, bash scripting and C.
        </span><br/>
        <span className='texts'>
          In conclusion, I am a dedicated and skilled software developer who is passionate about using technology to solve real-world problems. I am always eager to learn and improve my skills, and I believe that my passion and commitment to excellence make me a valuable asset to any team. If you are looking for a developer with a strong work ethic,then I would be an excellent candidate for your team. Thank you for taking the time to go through my profile, and I look forward to hearing from you soon.                  
        </span> 
        <p>
          GitHub Profile: &nbsp;
          <a href='https://github.com/itsoluwatobby' target='_blank' className='texts'>Visit my github profile</a>
        </p>
      </div>
    </ArticleContainer>
  )
}

const ArticleContainer = styled.article`
margin: 0px 10px;

  .cancel_button{
    position: absolute;
    top: 0.1rem;
    right: 0.5rem;
    font-size: 22px;
    cursor: pointer;
    color: gray;
    transition: all 0.24s ease-in-out;
    border-radius: 50%;
    background-color: #363636;
    padding: 3px;

    &:hover{
      opacity: 0.8;
    }

    &:active{
      transform: scale(0.6);
    }
  }

  a{
    color: white;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    background-color: rgba(100,0,255,0.6);
    font-size: 16px;
    text-align: center;
    transition: all 0.24s ease-in-out;

    &:hover{
      opacity: 0.8;
    }

    &:active{
      transform: scale(0.6);
    }
  }

  .texts {
    line-height: 1.5rem;
    font-size: 0.9rem;
  }
`
