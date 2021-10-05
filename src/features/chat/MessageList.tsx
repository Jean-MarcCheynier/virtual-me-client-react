import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ChatLayout, selectMessageList, selectChatLayout } from './chatSlice';

import { IMessage, RecipientType } from '@virtual-me/virtual-me-ts-core';
import Message from './Message';

import styles from './MessageList.module.scss';

type MessageListProps = {
  chatLayout: ChatLayout,
  messageList: IMessage<any>[]
}

export const MessageList = (props: MessageListProps) => {
  
  const { messageList, chatLayout } = props;
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
  
  return <div className="position-relative">
    {showScroll && <div className={styles.topShadow} />}
    <div className={`mx-2 py-2 ${styles.scrollableList} ${chatLayout === ChatLayout.FIXED ? styles.fixScrollableList:""}`} onScroll={handleOnScroll}>
      {messageList.length !== 0 && messageList.map((msg, index) =>
      <div key={index}
        className={`mw-75 d-flex ${msg?.from?.type === RecipientType.BOT ? 'flex-row' : 'flex-row-reverse'} bd-highlight`}>
        <Message message={msg} />
      </div>)}
      <div ref={bottomList} />
    </div>
    {showScroll && <div className={styles.bottomShadow} />}
  </div>
}

const mapStateToProps = (state: any) => ({
  messageList: selectMessageList(state),
  chatLayout: selectChatLayout(state)
})

export default connect(mapStateToProps)(MessageList);