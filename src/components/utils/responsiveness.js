import { css } from "styled-components"

export const Mobile = (props) => {
  return css`
    @media (max-width: 480px) {
      ${props}
    }
  `
}

export const MaxMobile = (props) => {
  return css`
    @media (max-width: 680px) {
      ${props}
    }
  `
}

export const Midscreen = (props) => {
  return css`
    @media (max-width: 759px) {
      ${props}
    }
  `
}

// large screen
export const Mdscreen = (props) => {
  return css`
    @media (min-width: 760px) {
      ${props}
    }
  `
}

export const Lgscreen = (props) => {
  return css`
    @media (min-width: 960px) {
      ${props}
    }
  `
}

export const CustomStyles = {
  button(props={
    "background-color": 'rgba(20,200,50,0.6);'
  }){
    return {
      "padding": '5px 10px;', 
      "border-radius": '5px;',
      "border": '0;',
      "cursor": 'pointer;',
      "color": 'white',
      ...props,
    }
  }
}