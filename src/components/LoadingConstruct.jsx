import styled from "styled-components";
import Eclipse from '../assest/Eclipse-1s-118px.svg';

export const LoadingConstruct = ({ name, group, add }) => {
  const groupName = group?.length > 10 ? group.substring(0, 10)+'...' : group  
  return (
    <LoadingComponent className='loading__construct'>
      <img src={Eclipse} alt='creating conversation...' />
      <p className="create">
        <i>
          {add ? 'Adding users to' :'Creating'} &nbsp;
          {group ? 'group' : 'a Conversation with'} &nbsp;
            <span>{name || groupName}</span>...
        </i>
      </p>
    </LoadingComponent>
  )
}

const LoadingComponent = styled.div`
z-index: 990;
position: absolute;
top: 2rem;
width: 240px;
left: 0.4rem;
height: 120px;
border-radius: 10px;
box-shadow: 2px 4px 12px rgba(10,200,100,0.2);
background-color: #333333;
padding: 5px;
box-sizing: border-box;

  img{
    height: 70px;
    width: 100%;  
    object-fix: cover;
  }

  .create{
    font-size: 15px;
    text-align: center;
    font-family: mono;

    i{
      color: white;

      span{
        color: lightgreen;
        text-transform: uppercase;
      }
    }
  }
`