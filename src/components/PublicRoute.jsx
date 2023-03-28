import {Outlet, useLocation} from 'react-router-dom'
import styled from 'styled-components'
import { Top } from './Top'

export const PublicRoute = () => {
  const {pathname} = useLocation()
  // const path = ['/register', '/login']

  return (
    <Main>
      <Top />
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