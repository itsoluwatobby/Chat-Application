import React from 'react'
import styled from 'styled-components'

export const AboutModal = ({ setOpenModal }) => {
  return (
    <ArticleContainer className='article'>
      <h2 className='about_topic'>About Developer</h2>
      <div className='content'>
        <p className='texts'>
          Hello, my name is Oluwatobi Samuel Akinola,  I am a software developer based in Lagos, Nigeria with over two years of programming experience, I have gained extensive knowledge and skills in various programming languages, including Node.js, React.js, C, Java, Typescript, python and dart.
        </p>
        <p className='texts'>
          My passion for programming began when I was in college, where I studied Water Resources Management and Hydrology. I became fascinated with the impact of technology in solving environmental problems, and this inspired me to pursue a career in software development. I started learning, using online resources and tutorials, and soon, I realized that I had a natural talent for it.
          I have worked on several projects, including the development of a whatsapp desktop clone, resume builder app, a hangman game, a Twitter clone. These projects have allowed me to hone my skills in Node.js, React.js, and other frameworks, while also giving me the opportunity to explore new technologies and tools.
        </p>
        <p className='texts'>
          Aside from programming, I am passionate about environmental safety and protection, which is why I completed a course on this subject at the Department of Petroleum Resources. I am always looking for ways to combine my interest in technology and environmental protection, and I believe that software development can play a significant role in achieving this goal.
          In my spare time, I enjoy playing video games, watching movies, and spending time with my family and friends. I am also an avid reader and enjoy reading books on technology, science, and personal development.
        </p>
        <p className='texts'>
          In conclusion, I am a dedicated and skilled software developer who is passionate about using technology to solve real-world problems. I am always eager to learn and improve my skills, and I believe that my passion and commitment to excellence make me a valuable asset to any team. If you are looking for a developer with a broad range of skills and a strong work ethic, then I would be an excellent candidate for your team. Thank you for taking the time to read my profile, and I look forward to hearing from you soon.
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
  a{
    color: lightgreen;
    text-decoration: underline;
    font-size: 16px;
    text-align: center;
  }
`
