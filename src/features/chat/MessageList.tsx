import React, { useEffect, useRef, useState } from 'react';
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
  const bottomList = useRef(null)
  const [showScroll, setShowScroll] = useState(false);
  
  const scrollToBottom = () => {
    const element: any = bottomList.current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  const handleOnScroll = (e: any) => {
    console.log("Scroll")
    console.log(e.target.scrollTopMax)
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
    <div className={`mx-2 py-2 ${styles.scrollableList}`} onScroll={handleOnScroll}>
      {messageList.length !== 0 && messageList.map((msg, index) =>
      <div key={index}
        className={`mw-75 d-flex ${msg.from === MessageSender.BOT ? 'flex-row' : 'flex-row-reverse'} bd-highlight`}>
        <Message message={msg} />
      </div>)}
      <div ref={bottomList} />
    </div>
    {showScroll && <div className={styles.bottomShadow} />}
  </div>
}

const mapStateToProps = (state: any) => ({ messageList: selectMessageList(state) })

export default connect(mapStateToProps)(MessageList);