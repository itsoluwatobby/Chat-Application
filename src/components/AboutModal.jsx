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
        <p className='texts'>
          Hello, my name is Oluwatobi Samuel Akinola,  I'm a software developer based in Lagos, Nigeria with over two years of programming experience, I have gained extensive knowledge and skills in various programming languages, including Node.js, React.js, C, Java, Typescript, python and dart.
        </p>
        <p className='texts'>
          My passion for programming began when I was in college, where I studied Water Resources Management and Hydrology. I became fascinated with the impact of technology in solving environmental problems, and this inspired me to pursue a career in software development. I started learning, using online resources and tutorials, and soon, I realized that I had a natural talent for it.
        </p>
        <p className='texts'>
          I have worked on several projects, including the development of a whatsapp desktop clone, resume builder app, a hangman game, Twitter clone. These projects have allowed me to hone my skills in Node.js, React.js, and other JavaScript frameworks, while also giving me the opportunity to explore new technologies and tools.
        </p>
        <p className='texts'>
          Aside from programming, I'm passionate about environmental safety and protection. I'm always looking for ways to combine my interest in technology and environmental protection, and I believe that software development can play a significant role in achieving this goal.
          In my spare time, I enjoy watching movies, and spending time with my family and friends. I'm also an avid reader and enjoy reading books on technology and personal development.
        </p>
        <p className='texts'>
          In conclusion, I'm a dedicated and skilled software developer who is passionate about using technology to solve real-world problems. I'm always eager to learn and improve my skills, and I believe that my passion and commitment to excellence makes me a valuable asset to any team. If you are looking for a developer with a broad range of skills and a strong work ethic, then I would be an excellent candidate for your team. Thank you for taking the time to read my profile, and I look forward to hearing from you soon.
        </p>
        <p>
          GitHub Profile: &nbsp;
          <a href='https://github.com/itsoluwatobby' target='_blank' className='texts'>Visit my github profile</a>
        </p>
      </div>
    </ArticleContainer>
  )
}

const ArticleContainer = styled.article`
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
    color: lightgreen;
    text-decoration: underline;
    font-size: 16px;
    text-align: center;
  }
`
