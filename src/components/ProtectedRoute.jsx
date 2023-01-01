import {Outlet, Navigate, useLocation} from 'react-router-dom';

export const ProtectedRoute = () => {
  const location= useLocation()
  const currentUserId = localStorage.getItem('userId')

  return  currentUserId ? 
              <Outlet /> : 
                <Navigate to='/login' state={{from: location}} replace/>
    
}
