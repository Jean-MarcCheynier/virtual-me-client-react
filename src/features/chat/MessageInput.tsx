import React from 'react';
import { connect } from 'react-redux';

import { MdSend } from 'react-icons/md';
import Form from 'react-bootstrap/Form'

import { IMessage, MessageSender, MessageType, TextMessage } from '../../@types/message';

import styles from './MessageInput.module.scss';

//Connect 
import { sendMessageAsync } from './chatSlice';


type MessageInputProps = {
  onChange?: (message: IMessage<any>) => any,
  onSubmit: (message: IMessage<any>) => void
}

export const MessageInput = (props: MessageInputProps) => {
  
  const { onChange, onSubmit } = props;
  
  const [message, setMessage] = React.useState<IMessage<any>>(new TextMessage(''));
  
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLElement>): any => {
    if (e.key === "Enter") {
      handleOnSubmit(e)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content: any = e.target.value;
    if (typeof content === 'string') {
      const message: IMessage<String> = {
        type: MessageType.TEXT,
        from: MessageSender.USER,
        content: content
      }
      setMessage(message);
      if (onChange) {
        onChange(message)
      }
    } else {
      console.error("Wrong message format")
    }
  }

  const handleOnSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (message.content) {
      onSubmit(message)
      setMessage(new TextMessage(''))
    }
  }
  
  
  
  return <Form className={`mx-2 ${styles.shaddow}`} onSubmit={handleOnSubmit}>
    <Form.Control
      onChange={handleOnChange}
      onKeyPress={handleOnKeyPress}
      name='message'
      value={message.content}
      as="textarea"
      placeholder="Leave a comment here"/>

    <MdSend className="text-primary"/>

  </Form>
}

export default connect(null, { onSubmit: sendMessageAsync })(MessageInput)