import {RiWhatsappFill} from 'react-icons/ri'
import styled from 'styled-components'

export const Top = () => {
  return (
    <TopComponent>
      <div className='logo'>
        <RiWhatsappFill className='whatsapp-logo'/>
        <p>Itsoluwatobby</p>
      </div>
    </TopComponent>
  )
}

const TopComponent = styled.div`
padding: 8px 10px;
box-shadow: 2px 4px 16px rgba(0,0,0,0.25);
  
  .logo{
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .whatsapp-logo{
      color: green;
      font-size: 24px;
    }

    p{
      font-size: 18px;
    }
  }
`
