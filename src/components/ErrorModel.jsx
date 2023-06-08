import styled from "styled-components";

export const ErrorModel = ({ error }) => {
  
  return (
    <ErrorComponent className='loading__construct'>
      {/* <img src={Eclipse} alt='creating conversation...' /> */}
      <p className="create">
        {error}
      </p>
    </ErrorComponent>
  )
}

const ErrorComponent = styled.div`
  z-index: 990;
  position: absolute;
  top: 5rem;
  width: 240px;
  left: 0.4rem;
  height: 80px;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(10,200,100,0.2);
  background-color: #886853;
  padding: 5px;
  box-sizing: border-box;

    .create{
      font-size: 22px;
      color: red;
      text-transform: capitalize;
      text-align: center;
      font-family: mono;

      // i{
      //   color: white;

      //   span{
      //     color: lightgreen;
      //     text-transform: uppercase;
      //   }
      // }
    }
`