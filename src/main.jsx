import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ChatContextProvider } from './context/ChatContext';
import {Provider} from 'react-redux'
import {store} from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChatContextProvider>
        <Router>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </Router>
      </ChatContextProvider>
    </Provider>
  </React.StrictMode>,
)
