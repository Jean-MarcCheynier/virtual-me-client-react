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
 * @Description Floating container for Chat.tsx Component. Here we intercept events to position the chat component on hte screen
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
  
  const [position, setPosition] = useState(defaultPosition)
  

  
  // Set
  useEffect(() => {
    const whileMove = (e: any) => {
      console.log(e);
      setPosition(position => ({
        ...position,
        left: position.left += e.movementX,
        top: position.top += e.movementY
      }))
    }
    const chatElement = document.getElementById('chat');
    if (chatElement) {
      
      const endMove = () => {
        window.removeEventListener('mousemove', whileMove);
        window.removeEventListener('mouseup', endMove);
      };
      
      const triggerScroll = (event: any) => {
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