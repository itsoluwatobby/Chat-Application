import {SiWhatsapp} from 'react-icons/si'
import {BsLock} from 'react-icons/bs'
import styled from 'styled-components'

export const EmptyChat = () => {
  return (
    <EmptyChatPage>
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