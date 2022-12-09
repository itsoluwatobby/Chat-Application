import {Outlet, useLocation} from 'react-router-dom'

export const Layout = () => {
  const {pathname} = useLocation()
  // const path = ['/register', '/login']

  return (
    <div>
      <Outlet />
    </div>
  )
}
