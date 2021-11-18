import { connect } from 'react-redux';
import { sendMessageAsync } from './chatSlice';
import { Card, Button } from 'react-bootstrap';
import { IMessage, ITextMessage, IQuickRepliesMessage, TextMessage, MessageType, RecipientType, IButtonsMessage } from '@virtual-me/virtual-me-ts-core'
import { Trans, useTranslation } from 'react-i18next';
import { Color } from 'react-bootstrap/esm/types';


type MessageProps = {
  message: IMessage<unknown>,
  onSubmit: (message: ITextMessage) => void
  options?: {
    translate: boolean
  }
}

export function Message(props: MessageProps) {
  const { message, onSubmit } = props;
  const [t] = useTranslation('common')
  
  const handleOnQuickReply = (textMessage: string) => {
    const newMessage: ITextMessage = new TextMessage(textMessage);
    newMessage.from = {
      type: RecipientType.USER
    };
    onSubmit(newMessage)
  }
  
  const renderContent = () => {
    switch (message.type) {
      case MessageType.TEXT:
        const textMessage: ITextMessage = message as ITextMessage;
        if (textMessage.translatable) {
          return <Trans t={t}>{textMessage.content}</Trans>
        } else {
          return textMessage.content
        }
      case MessageType.QUICK_REPLIES:
        const quickReplyMessage: IQuickRepliesMessage = message as IQuickRepliesMessage;
        return <>
          <div>{quickReplyMessage.content.title}</div>

          {quickReplyMessage.content.buttons.map((button: any, index: number) => {
            return <Button key={index} variant="secondary" className="my-1 w-100" onClick={e => handleOnQuickReply(button.value)}>{button.title}</Button>
          })}

        </>
      
      case MessageType.BUTTONS:
        const buttonMessage: IButtonsMessage = message as IButtonsMessage;
        return <>
          <div>{buttonMessage.content.title}</div>

          {buttonMessage.content.buttons.map((button: any, index: number) => {
            return <Button key={index} variant="secondary" className="my-1 w-100" onClick={e => handleOnQuickReply(button.value)}>{button.title}</Button>
          })}
        </>
    
      default:
        return "void"

    }
  }
  
  let bg;
  let text: Color = 'dark';
  const messageType = message?.from?.type;
  switch (messageType) {
    case RecipientType.USER:
      bg = 'primary';
      text = 'white';
      break;
    case RecipientType.BOT:
      bg = 'light'
      break;
    case RecipientType.SYSTEM:
      bg = 'warning'
      break;
    default:
      bg = 'grey';  
  }
  
  
  return <Card
    style={{maxWidth:"80%"}}
    bg={bg}
    text={text}
    className="mb-2 shadow-sm"
  >
    <Card.Body>
      {renderContent()}
    </Card.Body>
  </Card>
} 

export default connect(null, { onSubmit: sendMessageAsync })(Message)