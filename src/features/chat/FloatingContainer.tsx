import React, {useState} from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import styles from "./FloatingContainer.module.scss";

const handleOnClick = (e: React.SyntheticEvent<any>) => {
  console.log(e);
}

type FloatingContainerProps = {
  auth?: any
}
/**
 * @Description Floating container for Chat.tsx Component. 
 * Here we intercept events to position the chat component on the screen
 * @returns 
 */
export const FloatingContainer = (props: FloatingContainerProps) => {
  const { auth } = props;
  
  const defaultPosition = {
    top: 50,
    left: 450,
    width: 350,
    maxWidth: 350
  }
  
  const [position, setPosition] = useState(defaultPosition);
  const [initialPosition, setIinitialPosition] = useState(defaultPosition);
  
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
    if (chatElement) {
      
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
  }, [setPosition])
  
  
  return <div className={styles.floatingBg}
    onClick={handleOnClick}
  >
    <Chat
      authenticated={auth.role}
      style={{
      ...position,
      position: 'absolute',
      zIndex: '901',
    }} />
  </div>
  
}

const mapStateToProps = (state: any) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(FloatingContainer)