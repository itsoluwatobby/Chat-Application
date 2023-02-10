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
import { OpenAI } from './pages/OpenAI'
import { useChatContext } from './hooks/useChatContext'

export const App = () => {
  const { mode } = useChatContext()
  return (
    <Container className={mode ? 'light__mode' : 'dark__mode'}>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route element={<PublicRoute />}>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path='chat' element={<Chat />} />
            <Route path='openai' element={<OpenAI />} />
          </Route>
        
        </Route>
      
      </Routes>
    </Container>
  )
}

const Container = styled.div`
min-height: 100vh;
width: 100vw;

`
