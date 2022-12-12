import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../features/authSlice'
import { CgProfile } from 'react-icons/cg';
import { BsImageFill } from 'react-icons/bs';

export const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const canSubmit = [username, email, password].every(Boolean)
  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)
  const onImageChange = e => setImage(e.target.files[0])

  useEffect(() => {
    if(image?.size > 1048576){
      setImage('')
      return alert('Max file size 1.3mb')
    }
  }, [image])

  const uploadImage = async () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'dwb3ksib')
    try{
      setLoading(true)
      const response = await axios.post('https://api.cloudinary.com/v1_1/dr8necpxh/image/upload', data)
      const url = response.data?.url
      return url
    }catch(error){
      !error.response && setError('No server response')
      error.response && setError(error.message)
    }finally{
      setLoading(false)
    }
  }

  const handleRegister = async(e) => {
    e.preventDefault()
    try{
        if(canSubmit){
          const profilePicture = await uploadImage()
          console.log({profilePicture})
          await dispatch(registerUser({username, password, email, profilePicture})).unwrap()
          navigate('/login')
          setPassword('')
          setUsername('')
          setEmail('')
        }else return
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Section>
      <div className='register-form'>
        <h1>This is where the world connects better</h1>
        <form onSubmit={handleRegister}>
          <h2>Sign Up</h2>
          {image ? <img src={URL.createObjectURL(image)} alt={image.originalFilename} 
            className='profile-picture'/> : <CgProfile className='pics'/>}
            {loading && <p className='upload'>uploading image...</p>}
          <div className='form-input'>
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              autoComplete='off'
              autoFocus 
              id='username'
              onChange={onUsernameChange}
              placeholder='John Doe'/>
          </div>
          <div className='form-input'>
            <label htmlFor="email">Email:</label>
            <input 
              type="text" 
              autoComplete='off'
              id='email'
              onChange={onEmailChange}
              placeholder='JohnDoe@gmail.com'/>
          </div>
          <div className='form-input'>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id='password'
              onChange={onPasswordChange}
              placeholder='12doe77john'/>
          </div>
          <div className='image'>
            <input 
              type="file" 
              id='image'
              onChange={onImageChange}
              accept= 'image/png'
              hidden
            />
            <label htmlFor="image">
              <BsImageFill className='input'/>
              <p>{image ? 'File uploaded' : 'choose a file'}</p>
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
        }

        .upload{
          color: gray;
        }

        .pics{
          font-size: 2.5rem;
          color: gray;
        }
      
        .profile-picture{
          width: 3rem;
          flex-grow: none;
          height: 3rem;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
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
