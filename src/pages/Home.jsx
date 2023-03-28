import React from 'react'
import styled from 'styled-components'

export const Home = () => {
  return (
    <HomePage>
      <h1>
        Welcome to my awesome chat application
      </h1>
      <p>You also get to chat with a bot</p>
    </HomePage>
  )
}

const HomePage = styled.div`
text-align: center;
display: flex;
flex-direction : column;
gap: 5rem;
background-image: url(https://www.welovesolo.com/wp-content/uploads/vector02/49/27104511768.jpg);
background-position: center;
background-size: cover;
background-repeat: no-repeat;
background-blend-mode: color;
height: 100%;

p{
  font-family: mono;
  font-size: 42px;
  text-shadow: -2px 0 3px #FF0000, 0 2px 10px #0000FF;
}
`
