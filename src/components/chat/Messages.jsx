import styled from 'styled-components';
import { BsCheck, BsCheckAll } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { useChatContext } from '../../hooks/useChatContext';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { axiosAuth } from '../../app/axiosAuth';

export const Messages = ({ message, dates }) => {
  const { currentUser, chatId, loadMessage, loadMessageAll } = useChatContext();
  const [extract, setExtract] = useState(false);

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
  }

  const isMessageRead = async(msgId) => {
    const msgRes = await axiosAuth.put(`/message_read/${msgId}`)
    return msgRes?.data
  }

  const isMessageDelivered = async(msgId) => {
    const msgDel = await axiosAuth.put(`/message_delivered/${msgId}`)
    return msgDel?.data
  }

  const isMessageDeleted = async(init) => {
    await axiosAuth.delete(`/messages_delete/${init?.messageId}/${init?.adminId}/${init?.option}`)
    loadMessage()
    init?.option === 'forAll' && loadMessageAll()
  }
  
  const msgConstruct = { messageId: message?._id, adminId: currentUser?._id }

  const messageExtract = (
    <section 
    //onMouseEnter={() => setExtract(true)}
      className='message_extract'>
        <div 
          onClick={() => isMessageDeleted({ ...msgConstruct, option: 'forMe' })}
          className='compo1'>
          <FaTrash className='trash' />
          Delete For me
        </div>
        {message?.senderId === currentUser?._id && (
            <div 
              onClick={() => isMessageDeleted({ ...msgConstruct, option: 'forAll' })}
              className='compo1 compo2'>
              <FaTrash className='trash' />
              Delete For Everyone
            </div>
          )
        }
    </section>
  )

  const message_content = (
    <>
        {message?.referencedMessage?._id &&
          <div className='copied'>
            <p className='referenced_message'>
              <span className='sender'>
                {
                  currentUser?._id === message?.referencedMessage?.senderId 
                    ? 
                      'You' : message?.referencedMessage?.username
                }
              </span>
              <span className='text'>
                {
                  message?.referencedMessage?.text.split(' ').length > 22 
                    ?
                    message?.referencedMessage?.text.slice(0, 105) + '...' : message?.referencedMessage?.text 
                }
              </span>
            </p>
          </div>
        }
        {message?.image && (
            message?.senderId !== currentUser?._id ? 
              <a href={message?.image} title='Tap to View' target='_blank'>
                <img src={message?.image} alt="image preview"  
                  className='image' />
              </a> 
                : 
              <img src={message?.image} alt="image preview"  
                className='image' />
          )
        }
        <p>{message?.text}</p>  
        <p className='message_base'>
          {chatId?.groupName && (
            message?.senderId === currentUser?._id ?
              <span className='you'>You</span>
              :
              <span className='you'>{message?.username}</span>
            )
          }
          <span className={`dateTime ${chatId?.groupName ? 'time' : 'other'}`}>
            {format(parseISO(message?.dateTime), 'p')}
            <BsCheckAll className={`checks ${message?.isMessageRead ? 'color' : null}`}/>
          </span>
        </p>
        {extract && messageExtract}
      </>
  )
//: <p>You deleted this message.</p>
  return (
    <MessagesComponent 
      onMouseEnter={() => setExtract(true)}
      onMouseLeave={() => setExtract(false)}
    >
      {/* {
        dates.includes(
          format(parseISO(message?.dateTime), 'd/yy')) 
            &&  (
                  <p>
                    {format(parseISO(message?.dateTime), 'd/yy')}
                  </p>
                )
      } */}
      { message?.isMessageDeleted?.includes(currentUser?._id) ? <i className='deleted'>You deleted this message.</i> : message_content }
    </MessagesComponent>
  )
}

const MessagesComponent = styled.div`
position: relative;
transition: all 0.5s ease-in-out;

  .deleted{
    border-radius: 0;
    color: gray;
    padding: 5px;
  }

  .copied{
    background-color: #363636;
    max-width: 100%;
    border-radius: 5px 5px;
    padding: 0.25rem 0.35rem;
    border-left: 3px solid rgba(0,255,205,0.85); 

    .referenced_message{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: 0.15rem;

      .sender{
        color: rgb(0,255,200,0.85);
        text-transform: capitalize;
        font-size: 12px;
      }

      .text{
        white-space: pre-wrap;
        color: rgba(255,255,255,0.8);
        font-size: 13px;
        font-family: mono;
        text-align: left;
        word-wrap: break-word;
      }
    }
  }

  .image{
    height: 200px;
    width: 100%;
    border-radius: 5px;
    object-fit: cover;
  }

  p{
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .message_base{
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time{
      color: rgba(255,255,255,0.5);
      font-size: 10px;
    }

    .you{
      color: rgba(255,255,255,0.75);
      font-family: cursive;
      font-size: 10px;
    }

    .dateTime{
      display: flex;
      align-items: center;
      justify-content: right;
      font-size: 10px;

      .checks{
        margin-left: 0.2rem;
        font-size: 20px;
      }
    }

    .color{
      color: rgba(0,205,0,0.95);
    }
  }

  .other{
    width: 100%;
    text-align: right;
    font-size: 10px;
  }

  .message_extract{
    position: absolute;
    background-color: #393636;
    border-radius: 5px;
    width: 9.5rem;
    box-shadow: 2px 4px 16px rgba(0,0,0,0.9);
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    z-index: 90;

    .compo1{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 2px 4px 16px rgba(0,0,0,0.3);
      font-size: 11px;
      padding: 0.5rem;
      cursor: pointer;
      color: rgb(255,210,170);
      transition: all 0.15s ease-in-out;
      width: 100%;

      &:hover{
        color: rgb(255,10,100);
        scale: 0.98;
      }

      &:active{
        color: rgb(255,10,80);
        scale: 0.96;
      }
    }

    .compo2{
      border-top: 1px solid gray;
    }
  }
  
`
