import React from 'react';
import { connect } from 'react-redux';
import { selectMessageList } from './chatSlice';

import { IMessage, MessageSender, IDialogQuestion } from '../../@types/message';
import Message from './Message';

import styles from './MessageList.module.scss';

type MessageListProps = {
  messageList: IMessage<String | IDialogQuestion>[]
}

export const MessageList = (props: MessageListProps) => {
  const { messageList } = props;
  return <div className="position-relative">
    <div className="position-absolute" style={{ zIndex: 9999, top: 0, left: 0, height: '20px', width: '100%', backgroundImage: "linear-gradient(rgb(236, 197, 204, 0.8), 40%, rgb(236, 197, 204, 0))" }} />
    <div className={`mx-2 ${styles.scrollableList}`}>
    {messageList.map((msg, index) =>
      <div key={index}
        className={`mw-75 d-flex ${msg.from === MessageSender.BOT ? 'flex-row' : 'flex-row-reverse'} bd-highlight`}>
        <Message message={msg} />
      </div>)}
    </div>
    <div className="position-absolute" style={{
      zIndex: 9999,
      bottom: '0',
      left: 0, height: '20px', width: '100%', backgroundImage: "linear-gradient(rgb(236, 197, 204, 0), 60%, rgb(236, 197, 204, 0))" }} />
  </div>
}

const mapStateToProps = (state: any) => ({ messageList: selectMessageList(state) })

export default connect(mapStateToProps)(MessageList);