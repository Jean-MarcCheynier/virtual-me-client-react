import React from 'react';
import { Card } from 'react-bootstrap';
import { IMessage, MessageSender } from '../../@types/message';

type MessageProps = {
  message: IMessage<any>
}

export default function Message(props: MessageProps) {
  const { message } = props;
  return <Card
    bg={message.from === MessageSender.BOT?'primary':'seconday'}
    text={'dark'}
    style={{ width: '18rem' }}
    className="mb-2"
  >
    <Card.Body>
      <Card.Text>
        {message.content}
      </Card.Text>
    </Card.Body>
  </Card>
}