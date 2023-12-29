import { useEffect } from 'react';
import { TbError404 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    const returnTimer = setTimeout(() => {
      navigate(-1)
    }, 4000)
    return () => clearTimeout(returnTimer)
  }, [navigate])

  return (
    <NotFoundPage>
      Page Not Found
      <TbError404 className='errorIcon' />
      <span className='errorText'>You will be automatically redirected...</span>
    </NotFoundPage>
  )
}

const NotFoundPage = Styled.div`
  width: 100%;
  height: 100vh;
  font-family: mono;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  font-size: 32px;

  .errorIcon {
    font-size: 60px;
    color: white;
  }

  .errorText {
    font: 18px;
    color: rgba(245,255,255,0.6);
  }
`