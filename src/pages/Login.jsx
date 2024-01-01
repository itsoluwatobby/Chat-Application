import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { useChatContext } from '../hooks/useChatContext'
import { axiosAuth } from '../app/axiosAuth'
import { AboutModal } from '../components/AboutModal';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { CustomStyles, MaxMobile, Midscreen } from '../utils/responsiveness';

export const Login = ({ openModal, setOpenModal }) => {
  const [email, setEmail] = useState('')
  const { loggedIn, setLoggedIn } = useChatContext()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [reveal, setReveal] = useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 3500)
  }, [error])

  return (
    <Section>
      <div className='login-form'>
        <ContainerLogo className='container-logo'>
          <div className='inner-container'>
            <p className='title-logo'><span className='firstLetter'>S</span>wift Chat</p>
            <p className='info'>
              Chat with friends and family.
              Connect with all with ease and speed
            </p>

            {/* <button
              onClick={() => navigate('/login')}
              >
              Get Started
            </button> */}
          </div>

          <h1>This is where the world connects better</h1>
        </ContainerLogo>

        <form onSubmit={handleLogin}>
          <h2>Sign In</h2>
          {loading && <p className='loading'>{loading}</p>}
          {!loading && error && <p className='error'>{error}</p>}
          <div className='form-input'>
            <label htmlFor="email">Email:</label>
            <input type="email" onFocus={() => setError('')} autoComplete='off' autoFocus required onChange={onEmailChange} placeholder='John Doe'/>
          </div>
          <div className='form-input pass_reveal'>
            <label htmlFor="password">Password:</label>
            <input type={reveal ? "text" : "password"} onFocus={() => setError('')} onChange={onPasswordChange} required placeholder='************'/>
            {
              reveal ? 
                      <AiFillEye 
                        onClick={() => setReveal(false)}
                        className='eyes'/> 
                        : 
                      <AiFillEyeInvisible 
                        onClick={() => setReveal(true)}
                        className='eyes'
                      />
            }
          </div>
          <button disabled={!canSubmit}>Sign in</button>
          <p className='create-account'>
            Don't have an account? 
          <Link to='/register' className='register'>Register</Link>
          </p>
        </form>
      {
        openModal && (
          <div className='modal_container'>
            <AboutModal setOpenModal={setOpenModal} />
          </div>
        )
      }
      </div>
    </Section>
  )
}


const Section = styled.div`
height: calc(100vh - 36px);
width: 100vw;
font-size: 18px;
background-image: conic-gradient(black, gray, black);
justify-content: space-evenly;
overflow-y: scroll;

  &::-webkit-scrollbar{
    width: 1px;
  }

  .login-form{
    position: relative;
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 3rem;
    padding: 0rem 3rem;
    gap: 3.5rem;
    font-size: 16px;

      h1{
        text-align: center;
        align-self: center;
        padding: 2rem 0.5rem 0;
        text-transform: capitalize;
      }

      form{        
        height: 46%;
        background-color: rgba(0,0,0,0.45);
        display: flex;
        flex-direction: column;
        width: 30%;
        box-shadow: 2px 4px 12px rgba(0,0,0,0.4);
        border-radius: 10px; 
        padding: 1rem 1.5rem;
        gap: 0.6rem;
        font-size: 16px;

        ${MaxMobile(
          {
            width: '60%',
            justifyContent: 'center',
          }
        )}

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
            font-size: 16px;
            border-radius: 7px;
          
            &:focus{
              outline: none;
            }

            &::placeholder{
              font-size: 14px;
            }
          }
        }
        
        .pass_reveal{
          position: relative;

          .eyes{
            position: absolute;
            right: 0.5rem;
            top: 28px;
            color: rgba(0,0,0,0.8);
            font-size: 24px;
            cursor: pointer;
          }
        }

        .create-account {
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .register{
            text-decoration: underline;

            &:hover{
              opacity: 0.7;
            }
          }
        }

        button{
          align-self: center;
          width: 60%;
          padding: 10px;
          margin-top: 5px;
          font-size: 16px;
          border-radius: 5px;
          border: 0;
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

  .modal_container{
    border: 3px groove gray;
    border-radius: 10px;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.5);
    padding: 8px;
    z-index: 999;
    margin-top: -26rem;
    background-color: rgba(0,0,0,0.95);

    @media (max-width: 508px){
      margin-top: -33.5rem;
    }

    @media (min-width: 768px){
      position: absolute;
      left: 3rem;
      top: 20rem;
    }
  }

`

const ContainerLogo = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .inner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    ${Midscreen(
      {
        display: 'none',
      }
    )}
    
    .title-logo {
    font-size: 2.9rem;
    text-transform: capitalize;
    text-shadow: -2px 0 3px #FF0000, 0 2px 10px #0000FF;

    .firstLetter {
      font-size: 4rem;
    }
  }

  .info {
    font-size: 17px;
    line-height: 18px;
    word-spacing: 2px;
    letter-spacing: 1px;
    width: 260px;
    padding: 10px;
    text-align: center;
    font-family: sans;
    white-space: pre-wrap;
  }
  
  button{
    ${CustomStyles.button({
      "background": 'linear-gradient(rgba(220,180,0,0.5),rgba(20,200,50,0.5));',
      "padding": '10px 20px;',
    })}
    
    &:focus{
      outline: 0;
    }
    
    &:hover{
      background-color: rgba(20,200,50,0.6);
    }
  }
}

`