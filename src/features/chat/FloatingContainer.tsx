import React, {useState} from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { ChatPosition } from './chatSlice';
import styles from "./FloatingContainer.module.scss";
import { CSSTransition } from 'react-transition-group';

type FloatingContainerProps = {
  chatPosition?: ChatPosition 
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
  }
  
  const [position, setPosition] = useState(defaultPosition);
  const { chatPosition } = props;
  
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
    if (chatPosition && chatElement) {
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
  }, [setPosition, chatPosition])
  

    return (
    <div className={`${styles.floatingBg} ${ChatPosition.FIXED === chatPosition?'d-none':''}`}>
      <CSSTransition
        in={chatPosition === ChatPosition.BUBBLE}
        key = "bubbleAnimation"
        timeout={400}
        classNames='my-node'>
          <Chat style={{
            ...(chatPosition === ChatPosition.FLOATING)?position:{},
            position: 'absolute',
            zIndex: '901',
          }}/>
      
        </CSSTransition>
    </div>)

  
}

const mapStateToProps = (state: any) => ({
  chatPosition: state.chat.position
})

export default connect(mapStateToProps, null)(FloatingContainer)