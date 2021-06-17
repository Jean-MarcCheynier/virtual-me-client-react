import { connect } from 'react-redux';
import { sendMessageAsync } from './chatSlice';

import { Card, Button } from 'react-bootstrap';
import { IMessage, MessageSender, TextMessage } from '../../@types/message';
import { Trans, useTranslation } from 'react-i18next';


type MessageProps = {
  message: IMessage<any>,
  onSubmit: (message: IMessage<String>) => void
  options?: {
    translate: boolean
  }
}

export function Message(props: MessageProps) {
  const { message, onSubmit, options } = props;
  const [t] = useTranslation('common')
  
  const handleOnQuickReply = (textMessage: string) => {
    const newMessage: TextMessage = new TextMessage(textMessage)
    onSubmit(newMessage)
  }
  
  const renderContent = () => {
    if (typeof message.content === 'string') {
      if (message.translatable) {
        return <Trans t={t}>{message.content}</Trans>
      } else {
        return message.content
      }
      
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
  
  let bg = 'primary';
  console.log(message);
  if (message.from === MessageSender.BOT) {
    bg = 'secondary'
  }
  if (message.from === MessageSender.SYSTEM) {
    bg = 'warning'
  }
  
  
  return <Card
    style={{maxWidth:"80%"}}
    bg={bg}
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