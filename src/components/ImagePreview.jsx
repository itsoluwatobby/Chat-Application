import React from 'react'

export const ImagePreview = ({ image, setPreview }) => {

  return (
    image && <img src={URL.createObjectURL(image)} 
    alt="group profile" 
      onMouseLeave={() => setPreview(false)} 
      style={imageStyle}
      className='image' />
  )
}

const imageStyle = {
  position: 'fixed',
  width: '270px',
  height: '220px',
  borderRadius: '20px',
  bottom: 0,
  right: '0.3rem',
  border: '2px solid white',
  boxShahow: '2px 4px 16px rgba(0,0,0,0.25)',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(20,255,255,0.22)',
  objectFit: 'cover',
  transition: '0.45s ease-in-out'
}
