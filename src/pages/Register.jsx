import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CgProfile } from 'react-icons/cg';
import { BsImageFill } from 'react-icons/bs';
import { axiosAuth } from '../app/axiosAuth'
import { useChatContext } from '../hooks/useChatContext';
import { AboutModal } from '../components/AboutModal';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { CustomStyles, MaxMobile, Midscreen } from '../utils/responsiveness';

export const Register = ({ openModal, setOpenModal }) => {
  const { uploadToCloud, url, setUrl } = useChatContext();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate()
  
  const canSubmit = [username, email, password].every(Boolean)
  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)
  
  const onImageChange = e => setFile(e.target.files[0])

  useEffect(() => {
    if(!file) return
    if(file?.size > 1448576){

      setFile('')
      return alert('Max allowed size is 1.4mb')
    }
    else{
      uploadToCloud(file)
    }
  }, [file])

  //{username, password, email}
  const handleRegister = async(e) => {
    e.preventDefault()
    setError('')

      if(!canSubmit) return
      setLoading(true)
    try{
      await axiosAuth.post('/register', { username, email, password, profilePicture: url })
      setPassword('')
      setUsername('')
      setEmail('')
      setFile()
      setUrl(null)
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
          <div className='form-input pass_reveal'>
            <label htmlFor="password">Password:</label>
            <input type={reveal ? "text" : "password"}
              id='password' onFocus={() => setError('')}
              onChange={onPasswordChange}
              placeholder='**************'
            />
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
          <div className='image'>
            <input 
              type="file" 
              id='images'
              onFocus={() => setError('')}
              onChange={onImageChange}
              accept= '.jpg,.jpeg,.png'
              hidden
            />
            <label htmlFor="images">
              <BsImageFill className='input'/>
              <p>{file ? 'File added' : 'choose a file'}</p>
            </label>
          </div>
          <button>Sign Up</button>
        <p className='login-account'>Already have an account? <Link to='/login' className='login'>Login</Link></p>
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
// overflow: hidden;
justify-content: space-evenly;
overflow-y: scroll;

  &::-webkit-scrollbar{
    width: 1px;
  }

  .register-form{
    position: relative;
    flex: none;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0rem 3rem;
    margin-top: 3rem;
    gap: 1.5rem;

      h1{
        text-align: center;
        align-self: center;
        padding: 2rem 0.5rem 0;
        text-transform: capitalize;
      }

      form{
        height: 65%;
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
            font-size: 16px;
            border-radius: 7px;
          
            &:focus{
              outline: none;
            }

            &::placeholder {
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

        .login-account {
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .login{
            text-decoration: underline;

            &:hover{
              opacity: 0.7;
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
          align-self: center;
          width: 60%;
          padding: 10px;
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
      margin-top: -1rem;

      form{
        align-items: center;
        width: 55%;
        
      }
    }
  }

  .modal_container{
    border: 3px groove gray;
    border-radius: 10px;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.5);
    padding: 8px;
    z-index: 999;
    margin-top: -33rem;
    background-color: rgba(0,0,0,0.95);

    @media (max-width: 508px){
      margin-top: -39rem;
    }

    @media (min-width: 768px){
      position: absolute;
      left: 3rem;
      top: 30rem;
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
        display: 'none'
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