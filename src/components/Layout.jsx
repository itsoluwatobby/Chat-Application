import {Outlet, useLocation} from 'react-router-dom'
import styled from 'styled-components'

export const Layout = () => {
  const {pathname} = useLocation()
  // const path = ['/register', '/login']

  return (
    <Main>
      <Outlet />
    </Main>
  )
}

const Main = styled.div`

`