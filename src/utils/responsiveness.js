import { css } from "styled-components"

/**
 * @description max-width: 480px
 */
export const Mobile = (props) => {
  return css`
    @media (max-width: 480px) {
      ${props}
    }
  `
}

/**
 * @description max-width: 680px
 */
export const MaxMobile = (props) => {
  return css`
    @media (max-width: 680px) {
      ${props}
    }
  `
}

/**
 * @description max-width: 760px
 */
export const Midscreen = (props) => {
  return css`
    @media (max-width: 760px) {
      ${props}
    }
  `
}

// large screen
/**
 * @description min-width: 680px
 */
export const Smscreen = (props) => {
  return css`
    @media (min-width: 680px) {
      ${props}
    }
  `
}

/**
 * @description min-width: 760px
 */
export const Mdscreen = (props) => {
  return css`
    @media (min-width: 760px) {
      ${props}
    }
  `
}

/**
 * @description min-width: 960px
 */
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