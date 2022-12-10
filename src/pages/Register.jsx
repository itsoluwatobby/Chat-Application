import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const Register = () => {
  const navigate = useNavigate()

  const handleRegister = async(e) => {
    e.preventDefault()
    navigate('/login')
  }
  return (
    <Section>
      <div className='register-form'>
        <h1>This is where the world connects better</h1>
        <form onSubmit={handleRegister}>
          <h2>Sign Up</h2>
          <div className='form-input'>
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              autoComplete='off'
              autoFocus 
              placeholder='John Doe'/>
          </div>
          <div className='form-input'>
            <label htmlFor="email">Email:</label>
            <input 
              type="text" 
              autoComplete='off'
              placeholder='JohnDoe@gmail.com'/>
          </div>
          <div className='form-input'>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              placeholder='12doe77john'/>
          </div>
          <button>Sign Up</button>
        <p>Already have an account? <Link to='/login'>Login in</Link></p>
        </form>
      </div>
    </Section>
  )
}

const Section = styled.div`
height: calc(100vh - 36px);
width: 100vw;
font-size: 18px;

  .register-form{
    flex-grow: 1;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: flex-start;
    margin-top: 5rem;
    gap: 2rem;

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
        width: 55%;
        
      }
    }
  }

`
