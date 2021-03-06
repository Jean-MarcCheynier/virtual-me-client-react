import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ChatLayout, selectMessageList, selectChatLayout, selectSendingStatus } from './chatSlice';

import { IMessage, MessageType, RecipientType } from '@virtual-me/virtual-me-ts-core';
import Message from './Message';

import styles from './chat.module.scss';
import Pencil from './Pencil';
import { useMediaQuery } from 'react-responsive';

type MessageListProps = {
  chatLayout: ChatLayout,
  messageList: IMessage<any>[],
  status: string
}

export const MessageList: React.FC<MessageListProps> = (props) => {
  
  const { messageList, chatLayout, status } = props;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const bottomList = useRef(null)
  const [showScroll, setShowScroll] = useState(false);
  
  const scrollToBottom = () => {
    const element: any = bottomList.current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  const handleOnScroll = (e: any) => {
    setShowScroll(e.target.scrollTopMax !== 0);
    
  }
  
  useEffect(() => {
    const element: any = bottomList.current;
    if (element) {
      // Scroll smothly to the bottom when a new message is received
      element.scrollIntoView({ behavior: "smooth" });
      setShowScroll(element.offsetTop >= 400);
    }
    scrollToBottom();
  }, [messageList])
  
  const style: any = {};
  if (chatLayout === ChatLayout.FLOATING && !isTabletOrMobile) {
    style.maxHeight = "calc( 80vh - 200 px )";
  }
  
  return <div className={styles.container} style={style}>
    {(showScroll && (isTabletOrMobile || chatLayout !== ChatLayout.FLOATING)) &&
      <div className={styles.topShadow} />}
    <div className={`mx-2 py-2 
        ${styles.scrollableList} 
        ${chatLayout === ChatLayout.FIXED ? styles.fixScrollableList : ""}
        ${chatLayout === ChatLayout.FLOATING && !isTabletOrMobile ? styles.floatingScrollableList : ""}
      `}
      onScroll={handleOnScroll}>
      {messageList.length !== 0 && messageList.map((msg, index) =>
      <div key={index}
        className={`mw-75 d-flex ${msg?.from?.type === RecipientType.BOT ? 'flex-row' : 'flex-row-reverse'} bd-highlight`}>
        <Message message={msg} />
      </div>)}
      {status === 'pending' && 
      <div className={`mw-75 d-flex flex-row bd-highlight`}>
        <Message message={{ content: <Pencil/>, type: MessageType.TEXT, from: { type: RecipientType.BOT }}} />
      </div> }
      <div ref={bottomList} />
    </div>
    {showScroll && <div className={styles.bottomShadow} />}
  </div>
}

const mapStateToProps = (state: any) => ({
  messageList: selectMessageList(state),
  status: selectSendingStatus(state),
  chatLayout: selectChatLayout(state)
})

export default connect(mapStateToProps)(MessageList);