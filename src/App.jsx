import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register } from './pages/Register'
import styled from 'styled-components'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { PublicRoute } from './components/PublicRoute'
import { Home } from './pages/Home'
import { Chat } from './pages/Chat'
import { ProtectedRoute } from './components/ProtectedRoute'

export const App = () => {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route element={<PublicRoute />}>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path='chat' element={<Chat />} />
          </Route>
        
        </Route>
      
      </Routes>
    </Container>
  )
}

const Container = styled.div`
  background-color: rgba(0,0,0,0.85);
  min-height: 100vh;
  width: 100vw;
  color: white;

`
