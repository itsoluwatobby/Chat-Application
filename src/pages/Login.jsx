import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { useChatContext } from '../hooks/useChatContext'
import { axiosAuth } from '../app/axiosAuth'

export const Login = () => {
  const [email, setEmail] = useState('')
  const {setLoggedIn} = useChatContext()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const from = location?.state?.from?.pathname || '/chat'

  const canSubmit = [email, password].every(Boolean)
  const onPasswordChange = e => setPassword(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)

  const handleLogin = async(e) => {
    e.preventDefault()
    setError('')
    if(!canSubmit) return
    setLoading('In progress...')
    try{
      const res = await axiosAuth.post('/login', {password, email})
      setLoggedIn(true)
      //setCurrentUser(res?.data)
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('userId', res?.data._id)
      setPassword('')
      setEmail('')
      navigate(from, { replace: true })
    }catch(error){
      let errorMessage;
      error?.response?.status === 403 ? errorMessage = 'bad credentials' :
      error?.response?.status === 500 ? errorMessage = 'internal error' : errorMessage = 'no server response'
      setError(errorMessage)
    }finally{
      setLoading('')
    }
  }

  return (
    <Section>
      <div className='login-form'>
        <h1>This is where the world connects better</h1>
        <form onSubmit={handleLogin}>
          <h2>Sign In</h2>
          {loading && <p className='loading'>{loading}</p>}
          {!loading && error && <p className='error'>{error}</p>}
          <div className='form-input'>
            <label htmlFor="email">Email:</label>
            <input type="email" onFocus={() => setError('')} autoComplete='off' autoFocus required onChange={onEmailChange} placeholder='John Doe'/>
          </div>
          <div className='form-input'>
            <label htmlFor="password">Password:</label>
            <input type="password" onFocus={() => setError('')} onChange={onPasswordChange} required placeholder='12doe77john'/>
          </div>
          <button disabled={!canSubmit}>Sign in</button>
          <p>Don't have an account? <Link to='/register'>Register here</Link></p>
        </form>
      </div>
    </Section>
  )
}

const Section = styled.div`
height: calc(100vh - 36px);
width: 100vw;
font-size: 18px;

  .login-form{
    flex-grow: 1;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: flex-start;
    margin-top: 5rem;
    gap: 1.5rem;

      h1{
        text-align: center;
        text-transform: capitalize;
      }

      form{
        background-color: rgba(0,0,0,0.45);
        display: flex;
        flex-direction: column;
        width: 30%;
        box-shadow: 2px 4px 12px rgba(0,0,0,0.4);
        border-radius: 10px; 
        padding: 1rem 1.5rem;
        gap: 0.7rem;

        .error{
          text-align: center;
          text-transform: capitalize;
          font-family: cursive;
          color: red;
          letter-spacing: 4px;
        }
        
        .loading{
          text-align: center;
          text-transform: capitalize;
          font-family: cursive;
          color: teal;
          letter-spacing: 4px;
        }

        h2{
          text-transform: capitalize;
        }

        .form-input{
          display: flex;
          flex-direction: column;
          width: 100%;

          input{
            border: none;
            padding: 8px;
            font-size: 18px;
            border-radius: 7px;
          
            &:focus{
              outline: none;
            }
          }
        }

        button{
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          font-size: 20px;
          border-radius: 5px;
          cursor: pointer;

          &:hover{
            background-color: rgba(255,255,255,0.7);
          }

          &:active{
            background-color: rgba(255,255,255,0.95);
          }

          &:focus{
            outline: none
          }
        }
      }

    @media (max-width: 768px){
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-top: 0;

      form{
        align-items: center;
        width: 58%;
        
      }
    }
  }

`
