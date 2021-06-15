import React, {useState} from 'react';
import Chat from './Chat';
import styles from "./FloatingContainer.module.scss";

const handleOnClick = (e: React.SyntheticEvent<any>) => {
  console.log(e);
}

const FloatingContainer = () => {
  return <div className={styles.floatingBg}
    onClick={handleOnClick}
  >
    <Chat style={{
      maxWidth: '250px',
      position: 'absolute',
      zIndex: '1',
      top: '50px',
      left: '300px'
    }} />
  </div>
  
}

export default FloatingContainer;