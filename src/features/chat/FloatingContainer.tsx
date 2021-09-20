import React, {useState} from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { ChatPosition } from './chatSlice';
import styles from "./FloatingContainer.module.scss";

type FloatingContainerProps = {
  displayChat?: boolean 
}
/**
 * @Description Floating container for Chat.tsx Component. 
 * Here we intercept events to position the chat component on the screen
 * @returns 
 */
export const FloatingContainer = (props: FloatingContainerProps) => {
  
  const defaultPosition = {
    top: 50,
    left: 450,
    width: 350,
    maxWidth: 350
  }
  
  const [position, setPosition] = useState(defaultPosition);
  const { displayChat } = props;
  
  // Set
  useEffect(() => {
    const offset = { left: 0, right: 0 }
    const whileMove = (e: any) => {
      setPosition(position => ({
        ...position,
        left: e.clientX - offset.left,
        top: e.clientY - offset.right,
      }))
    }
    const chatElement = document.getElementById('chat');
    if (displayChat && chatElement) {
      const endMove = () => {
        window.removeEventListener('mousemove', whileMove);
        window.removeEventListener('mouseup', endMove);
      };
      
      const triggerScroll = (event: any) => {
        offset.left = event.layerX;
        offset.right = event.layerY;
        event.stopPropagation(); // remove if you do want it to propagate ..
        window.addEventListener('mousemove', whileMove);
        window.addEventListener('mouseup', endMove);
      }
      
      chatElement.addEventListener('mousedown', triggerScroll);
      return () => {
        chatElement.removeEventListener('mousedown', triggerScroll);
      }
    }
  }, [setPosition, displayChat])
  
  if (displayChat) {
    return (
    <div className={styles.floatingBg}>
        {displayChat &&
          <Chat style={{
            ...position,
            position: 'absolute',
            zIndex: '901',
          }}/>}
    </div>)
  } else {
    return null;
  }

  
}

const mapStateToProps = (state: any) => ({
  displayChat: state.chat.position === ChatPosition.FLOATING
})

export default connect(mapStateToProps, null)(FloatingContainer)