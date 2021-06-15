import React from 'react';
import { connect } from 'react-redux';
import { sendMessageAsync } from './chatSlice';

import { Card, ButtonGroup, Button } from 'react-bootstrap';
import { IMessage, MessageSender, TextMessage } from '../../@types/message';


type MessageProps = {
  message: IMessage<any>,
  onSubmit: (message: IMessage<String>) => void
}

export function Message(props: MessageProps) {
  const { message, onSubmit } = props;
  
  const handleOnQuickReply = (textMessage: string) => {
    const newMessage: TextMessage = new TextMessage(textMessage)
    onSubmit(newMessage)
  }
  
  const renderContent = () => {
    console.log(message.content);
    console.log(typeof message.content)
    if (typeof message.content === 'string') {
      console.log("coucou")
      return message.content
    }
    if ( typeof message.content === 'object') {
      return <>
        <div>{message.content.title}</div>

          {message.content.buttons.map((button: any) => {
            return <Button variant="secondary" className="my-1 w-100" onClick={ e => handleOnQuickReply(button.value)}>{ button.title }</Button>
          })}
        
        </>
    }
  }
  
  return <Card
    style={{maxWidth:"80%"}}
    bg={message.from === MessageSender.BOT?'primary':'seconday'}
    text={'dark'}
    className="mb-2 shadow-sm"
  >
    <Card.Body>
      <Card.Text>
        {renderContent()}
      </Card.Text>
    </Card.Body>
  </Card>
}

export default connect(null, { onSubmit: sendMessageAsync })(Message)