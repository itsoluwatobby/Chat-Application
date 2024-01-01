import {Outlet, useLocation} from 'react-router-dom'
import styled from 'styled-components'
import { Top } from '../components/Top'
import { useState } from 'react'

export const PublicRoute = ({ openModal, setOpenModal }) => {
  const {pathname} = useLocation()
  // const path = ['/register', '/login']

  return (
    <Main>
      <Top setOpenModal={setOpenModal} openModal={openModal} />
      <Outlet />
    </Main>
  )
}

const Main = styled.div`
height: 100vh;
width: 100vw;
display: flex;
font-size: 18px;
flex-direction: column;
//gap: 2rem;
`