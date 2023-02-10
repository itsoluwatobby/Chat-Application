import {SiWhatsapp} from 'react-icons/si'
import {BsLock} from 'react-icons/bs'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useChatContext } from '../hooks/useChatContext'
import Eclipse from '../assest/Eclipse-1s-118px.svg';

export const EmptyChat = () => {
  const { toggle, setToggle, mode } = useChatContext()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const TIMEOUT = 2500

  const delay = () => new Promise(res => setTimeout(() => res(), TIMEOUT))

  const startChat = async() => {
    setLoading(true)
    await delay()
    setLoading(false)
    !loading && navigate('/openai')
  }

  return (
    <EmptyChatPage className={mode ? 'light__mode' : 'empty__mode'}>
      <div className='chat'>
        <p className='top'>Would You Like To Chat With a Bot? 
          <span className='open__chat'>@openai</span>
        </p>
        <div className='toggle'>
          Toggle
          <div className='button_toggle'>
            {!toggle && <span onClick={() => {
                setToggle(true)
                startChat()
              }} className={`gray ${!toggle && 'red'}`}></span>}
            {toggle && <span onClick={() => setToggle(false)} className={`green ${toggle && 'reds'}`}></span>}
          </div>
        </div>
        {loading && <img src={Eclipse} alt='' />}
        {/* {!loading && toggle ? <Navigate to='/openai' /> : <Navigate to='/chat' />} */}
      </div>
      <SiWhatsapp className='whatsapp'/>
      <div className='info'>
        <p className='top'>Itsoluwatobby for Windows</p>
        <p className='inform'>Send and receive messages at ease. Conversation with friends made easy</p>
      </div>
      <p className='secure'>
        <BsLock className='lock'/>
        <span>End-to-end encryption</span>
      </p>
    </EmptyChatPage>
  )
}

const EmptyChatPage = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
flex-direction: column;
gap: 1.5rem;
position: relative;

.chat{
  position: absolute;
  top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top{
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 700px){
      word-spacing: 5px;
    }

    .open__chat{
      margin-top: 5px;
      margin-bottom: 10px;
    }

    span{
      color: rgba(255,255,255,0.4);
    }
  }

  .toggle{
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    .button_toggle{
      display: flex;
      align-items: center;
      border-radius: 10px;
      height: 20px;
      width: 70px;
      background-color: rgba(250,2,2,0.7);
      position: relative;
      cursor: pointer;

      .gray{
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        position: absolute;
        left: 0;
        height: 100%;
        width: 50%;
        // cursor: pointer;
        box-shadow: 2px 3px 16px rgba(0,0,0,0.2);
        z-index: 90;
        transition: all 0.15s easin-in-out;

        &:hover{
          opacity: 0.98;
        }
      }

      .red{
        background-color: rgba(255,255,255,0.9);
      }

      .reds{
        background-color: rgba(0,245,2,0.85);
      }

      .green{
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        height: 100%;
        width: 50%;
        z-index: 90;
        position: absolute;
        right: 0;
        //cursor: pointer;
        box-shadow: 2px 3px 16px rgba(0,0,0,0.2);
        transition: all 0.15s easin-in-out;

        &:hover{
          opacity: 0.75;
        }
      }
    }
  }

  .loading{
    font-family: cursive;
    letter-spacing: 5px;
    margin-top: 3rem;
  }

}

  .whatsapp{
    font-size: 4.2rem;
    color: rgba(255,255,255,0.2);
  }

  .info{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;

    .top{
      color: white;
      font-size: 22px;
    }

    .inform{
      color: gray;
    }
  }

  .secure{
    display: flex;
    align-items: center;
    gap: 0.6rem;
    justify-content: center;
    position: absolute;
    bottom: 4rem; 
    color: gray;   

    .lock{

    }

    span{
      
    }
  }
`