import React from 'react'
import styled from 'styled-components';
import { RxCross2 } from 'react-icons/rx';
import { useChatContext } from '../../hooks/useChatContext';

export const CopiedText = () => {
  const { currentUser, setReference, reference } = useChatContext();

  return (
    <Copied>
      <div className={reference?.text ? 'copy_container' : 'dis_copy'}>
        <div className='copied'>
          <p>
            <span className='sender'>
              {
                currentUser?._id === reference?.senderId 
                  ? 
                    'You' : reference?.username
              }
            </span>
            {!reference?.image ?  
              <span className='text'>
                {
                  reference?.text.split(' ').length > 22 
                    ?
                    reference?.text.slice(0, 105) + '...' : reference?.text 
                }
              </span>
              :
              <img src={reference?.image} alt="" className='image'/>
            }
          </p>
          {(reference?.text || reference?.image) &&
            <p className='crosses'>
              <RxCross2 
                onClick={() => setReference({})}
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
  border-radius: 5px 5px 0 0;
  display: block;

    .copied{
      display: flex;
      align-items: centers;
      flex-direction: row;
      justify-content: space-between;
      background-color: #363636;
      width: 100%;
      border-radius: 5px 5px;
      padding: 0.35rem;
      border-left: 3px solid rgba(0,255,205,0.85); 

      p{
        flex-basis: 1;
        display: flex;
        flex-direction: column;
        gap: 0.15rem;

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
        
        .image{
          object-fit: cover;
          width: 100px;
          height: 100px;
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
