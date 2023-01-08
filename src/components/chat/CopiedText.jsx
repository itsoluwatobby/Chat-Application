import React from 'react'
import styled from 'styled-components';
import { RxCross2 } from 'react-icons/rx';

export const CopiedText = ({ setReference, setIsReferenced, reference }) => {
console.log(reference)
  const cancelEdit = () => {
    setReference({})
    setIsReferenced(false)
  }

  return (
    <Copied>
      <div className={reference?.text ? 'copy_container' : 'dis_copy'}>
        <div className='copied'>
          <p>
            <span className='sender'>{reference?.username}</span>
            <span className='text'>{reference?.text}</span>
          </p>
          {reference?.text &&
            <p className='crosses'>
              <RxCross2 
                onClick={cancelEdit}
                className='cross'
              />
            </p>
          }
        </div>
      </div>
    </Copied>
  )
}

const Copied = styled.div`
width: 100%;
min-height: 3rem;

.dis_copy{
  display: none;
}

.copy_container{
  width: 50%;
  position: fixed;
  bottom: 3.8rem;
  background-color: rgba(0,0,0,0.7);
  border-radius: 5px 5px 0 0;
  display: block;

  // animation: movie 1s linear;

  // @keyframes movie{
  //   from{
  //     transform: translatex(-100%);
  //   }
  //   to{
  //     transform: translatex(0);
  //   }
  // }

    .copied{
      display: flex;
      align-items: centers;
      flex-direction: row;
      justify-content: space-between;
      background-color: #363636;
      width: 100%;
      border-radius: 5px 5px;
      padding: 0.5rem 0.5rem 0.5rem 0.5rem;
      border-left: 3px solid rgba(0,255,205,0.85); 

      p{
        flex-basis: 1;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        .sender{
          color: rgb(0,255,200,0.7);
          text-transform: capitalize;
          font-size: 12px;
        }

        .text{
          white-space: wrap;
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          font-family: mono;
        }
      }

      .crosses{
        cursor: pointer;
        padding: 0.4rem;
        border-radius: 5px;
        display: grip;
        place-content: center;

        .cross{
          font-size: 17px;
        }

        &:hover{
          background-color: gray;
        }
      }
    }
  }

`
