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
import { useState } from 'react'

export const App = () => {
  const { mode } = useChatContext()
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container className={mode ? 'light__mode' : 'dark__mode'}>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route element={<PublicRoute 
            setOpenModal={setOpenModal}
          />}>
            <Route index element={<Home 
                openModal={openModal}
                setOpenModal={setOpenModal}
              />} 
            />
            <Route path='register' element={<Register 
                openModal={openModal}
                setOpenModal={setOpenModal}
              />} 
            />
            <Route path='login' element={<Login 
                openModal={openModal}
                setOpenModal={setOpenModal}
              />}
            />
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
// background-image: url(https://www.welovesolo.com/wp-content/uploads/vector02/49/27104511768.jpg);
// background-position: center;
// background-size: cover;
// background-repeat: no-repeat;


`
