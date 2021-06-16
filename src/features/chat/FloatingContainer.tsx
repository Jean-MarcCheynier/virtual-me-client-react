import React, {useState} from 'react';
import { useEffect } from 'react';
import Chat from './Chat';
import styles from "./FloatingContainer.module.scss";

const handleOnClick = (e: React.SyntheticEvent<any>) => {
  console.log(e);
}

interface IPosition {
  top: number;
  left: number;
  maxWidth: number;
}

const FloatingContainer = () => {
  
  const defaultPosition = {
    top: 50,
    left: 450,
    width: 350,
    maxWidth: 350
  }
  
  const whileMove = (e: any) => {
    console.log(e);
    setPosition({ ...position, left: position.left += e.movementX, top: position.top += e.movementY})
  }
  
  useEffect(() => {
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
    }
    },
    [])
  
  const [position, setPosition] = useState(defaultPosition)
  
  return <div className={styles.floatingBg}
    onClick={handleOnClick}
  >
    <Chat style={{
      ...position,
      position: 'absolute',
      zIndex: '901',
    }} />
  </div>
  
}

export default FloatingContainer;