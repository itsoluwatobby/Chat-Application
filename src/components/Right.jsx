import React from 'react'
import styled from 'styled-components'

export const Right = () => {
  return (
    <RightSection>
      right
    </RightSection>
  )
}

const RightSection = styled.div`
height: 100%;
flex-grow: 7.7;
display: flex;
flex-direction: column;
background-color: #333333;
justify-content: space-between;
padding: 2rem 0;
align-items: center;

`
