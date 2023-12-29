import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ChatContextProvider } from './context/ChatContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

process.env.NODE_ENV === 'production' && disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <ChatContextProvider>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </ChatContextProvider>
  </React.StrictMode>,
)
