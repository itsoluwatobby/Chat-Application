import {Outlet, Navigate, useLocation} from 'react-router-dom';

export const ProtectedRoute = () => {
  const location= useLocation()
  const loggedIn = localStorage.getItem('isLoggedIn')

  return loggedIn ? 
                <Outlet /> : 
                        <Navigate to='/login' state={{from: location}} replace/>
}
