import React from 'react';
import { connect } from 'react-redux';

import { MdSend } from 'react-icons/md';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

import { ITextMessage, RecipientType, MessageType, TextMessage } from '@virtual-me/virtual-me-ts-core';

//Connect 
import { sendMessageAsync } from './chatSlice';
import { useTranslation } from 'react-i18next';


type MessageInputProps = {
  onChange?: (message: ITextMessage) => any,
  onSubmit: (message: ITextMessage) => void
}

export const MessageInput = (props: MessageInputProps) => {
  
  const { onChange, onSubmit } = props;
  const [message, setMessage] = React.useState<ITextMessage>(new TextMessage(''));
  const [t] = useTranslation('common');
  
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLElement>): any => {
    if (e.key === "Enter") {
      handleOnSubmit(e)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content: any = e.target.value;
    if (typeof content === 'string') {
      const message: ITextMessage = {
        type: MessageType.TEXT,
        from: {
          type: RecipientType.USER
        },
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
  
  
  
  return <Form className="m-2 position-relative" onSubmit={handleOnSubmit}>
    <Form.Control
      onChange={handleOnChange}
      onKeyPress={handleOnKeyPress}
      name='message'
      value={message.content}
      as="textarea"
      placeholder={t('chat.form.placeholder')} />
    <Button disabled={message.content.length === 0}
      variant="white"
      title={t('chat.form.send')}
      className="rounded-circle"
      style={{
        position: 'absolute',
        top: '15px',
        right: '10px',
        width: '2em',
        height: '2em'
      }} >
      <MdSend style={{ marginTop: '-4px', marginLeft: '-7px'}} size={"1.5em"} onClick={handleOnSubmit} className="text-primary" />
    </Button>
  </Form>
}

export default connect(null, { onSubmit: sendMessageAsync })(MessageInput)