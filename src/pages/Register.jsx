import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CgProfile } from 'react-icons/cg';
import { BsImageFill } from 'react-icons/bs';
import { axiosAuth } from '../app/axiosAuth'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState()
  const navigate = useNavigate()
  
  const canSubmit = [username, email, password].every(Boolean)
  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)
  
  const onImageChange = e => setFile(e.target.files[0])
  file && console.log(file)
  useEffect(() => {
    if(!file) return
    if(file?.size > 1448576){
      setFile('')
      return alert('Max allowed size is 1.4mb')
    }
  }, [file])

  //{username, password, email}
  const handleRegister = async(e) => {
    e.preventDefault()
    setError('')
    if(!canSubmit) return

    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    data.append('email', email)
      // data.append('file', file)

    setLoading(true)
    try{
      await axiosAuth.post('/register', data)
      setPassword('')
      setUsername('')
      setEmail('')
      setFile()
      navigate('/login')
    }
    catch(error){
      let errorMessage;
      error?.response?.status === 409 ? errorMessage = 'email taken' :
      error?.response?.status === 500 ? errorMessage = 'internal error' : errorMessage = 'no server response'
      setError(errorMessage)
    }finally{
      setLoading(false)
    }
  }

  return (
    <Section>
      <div className='register-form'>
        <h1>This is where the world connects better</h1>
        <form onSubmit={handleRegister}>
          <h2>Sign Up</h2>
          {loading && <p className='loading'>In progress...</p>}
          {error && <p className='error'>{error}</p>}
          {
            file ? <img src={URL.createObjectURL(file)} alt={file.originalFilename} 
            className='profile-picture'/> : <CgProfile className='pics'/>
          }
          <div className='form-input'>
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              autoComplete='off'
              autoFocus 
              id='username'
              onFocus={() => setError('')}
              onChange={onUsernameChange}
              placeholder='John Doe'/>
          </div>
          <div className='form-input'>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              autoComplete='off'
              id='email'
              onFocus={() => setError('')}
              onChange={onEmailChange}
              placeholder='JohnDoe@gmail.com'/>
          </div>
          <div className='form-input'>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id='password'
              onFocus={() => setError('')}
              onChange={onPasswordChange}
              placeholder='12doe77john'/>
          </div>
          <div className='image'>
            <input 
              type="file" 
              id='image'
              onFocus={() => setError('')}
              onChange={onImageChange}
              accept= '.jpg,.jpeg,.png'
              hidden
            />
            <label htmlFor="image">
              <BsImageFill className='input'/>
              <p>{file ? 'File uploaded' : 'choose a file'}</p>
            </label>
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
    margin-top: 3rem;
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
        gap: 0.6rem;

        h2{
          text-transform: capitalize;
          text-align: center;
        }

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

        .upload{
          color: gray;
        }

        .pics{
          font-size: 2.5rem;
          color: gray;
          margin: auto;
        }
      
        .profile-picture{
          width: 3rem;
          flex-grow: none;
          height: 3rem;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
          margin: auto;
        }

        .form-input{
          display: flex;
          flex-direction: column;
          width: 100%;

          input{
            border: none;
            padding: 7px;
            font-size: 18px;
            border-radius: 7px;
          
            &:focus{
              outline: none;
            }
          }
        }

        .image{
          display: flex;
          width: 100%;
          align-items: flex-start;

          label{
            display: flex;
            align-items: center;
            gap: 2rem;

            .input{
              font-size: 1.7rem;
              cursor: pointer;
            }

            p{
              cursor: pointer;
            }
          }
        }

        button{
          width: 100%;
          padding: 7px;
          font-size: 20px;
          border-radius: 5px;
          border: none;
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
      margin-top: -1rem;

      form{
        align-items: center;
        width: 55%;
        
      }
    }
  }

`
