import React from 'react'
import styled from 'styled-components'

export const Home = () => {
  return (
    <HomePage>
      <h1>
        Welcome to my awesome chat application
      </h1>
    </HomePage>
  )
}

const HomePage = styled.div`



  h1{
    text-align: center;
  }
`
