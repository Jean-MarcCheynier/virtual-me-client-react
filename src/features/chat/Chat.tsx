import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectMessageList, sendMessageAsync } from './chatSlice';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { IMessage, MessageType, TextMessage, MessageSender } from '../../@types/message';
import Message from './Message';



export default function Chat() {
  
  const messageList: IMessage<any>[] = useAppSelector(selectMessageList);
  const dispatch = useAppDispatch();
  const [message, setMessage] = React.useState<IMessage<any>>(new TextMessage(''));
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content:any = e.target.value;
    if (typeof content ===  'string') {
      const message: IMessage<String> = {
        type: MessageType.TEXT,
        from: MessageSender.USER,
        content: content
      }
      setMessage(message)
    } else {
      console.error("Unable to submit this type of message")
    }
  }
  
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    setMessage(new TextMessage(''))
    dispatch(sendMessageAsync(message))
  }

  return <>
    <div>
      {messageList.map((msg, index) =>
        <div className={`mx-3 d-flex ${msg.from === MessageSender.BOT?'flex-row':'flex-row-reverse'} bd-highlight`}>
          <Message key={index} message={msg} />
        </div>)}
    </div>

    <Form onSubmit={handleOnSubmit}>
      <Form.Control
        onChange={handleOnChange}
        name='message'
        value={message.content}
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '100px' }}
      />
      <Button type="submit" disabled={!message.content}>submit</Button>
      
    </Form>
    </>
  
  
}
