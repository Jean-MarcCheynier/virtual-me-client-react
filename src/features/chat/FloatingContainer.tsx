import React, {useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import Chat from './Chat';
import { ChatLayout, setLayout, selectChatLayout } from './chatSlice';
import styles from "./FloatingContainer.module.scss";
import { CSSTransition } from 'react-transition-group';
import ButtonGroup from './ButtonGroup';

type FloatingContainerProps = {
  chatLayout: ChatLayout,
  display?: ChatLayout[]
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
  
  const defaultOffset = {
    top: 0,
    left: 0,
  }
  
  const [position, setPosition] = useState(defaultPosition);
  const [offset, setOffset] = useState(defaultOffset);
  const { chatLayout, display } = props;
  
  const dispatch = useDispatch();

  const setFloatting = () => {
    dispatch(setLayout(ChatLayout.FLOATING))
  }
  
  const whileMove = (e: any) => {
    //console.info("while move");
    //console.info(e);
    setPosition(position => ({
      ...position,
      left: e.pageX - offset.left,
      top: e.pageY - offset.top,
    }))
  }
  

  const endMove = () => {
    //console.info("end move");
    window.removeEventListener('mousemove', whileMove);
    window.removeEventListener('mouseup', endMove);
  };
  
  // Trigger scroll on mousedown
  const handleOnMouseDown = (e: any) => {
    if (chatLayout === ChatLayout.FLOATING) {
      //console.log(e)
      e.stopPropagation(); // remove if you do want it to propagate ..
      setOffset({ left: e.nativeEvent.layerX, top: e.nativeEvent.layerY })
      window.addEventListener('mousemove', whileMove);
      window.addEventListener('mouseup', endMove);
      
    }
  }
  
  const handleOnClick = (e: any) => {
    if (chatLayout === ChatLayout.BUBBLE) { setFloatting() }
  }
  
  const displayContainer = !display || display.includes(chatLayout)
  
  return (
    <CSSTransition
      in={chatLayout === ChatLayout.BUBBLE}
      timeout={400}
      classNames='floating-chat'>
      <div className={`${styles.floatingBg} bubble shadow-sm p-2`}
        style={{
          ...(chatLayout === ChatLayout.FLOATING) ? position : {},
          backgroundColor: 'rgb(255,255,255, 0.1)'
        }}
        onMouseDown={handleOnMouseDown}
        onClick={handleOnClick}
      >
        {chatLayout !== ChatLayout.BUBBLE &&
        <>
          <ButtonGroup/>
          <Chat />
        </>
        }
            
      </div>
        
    </CSSTransition>)
}

const mapStateToProps = (state: any) => ({
  chatLayout: selectChatLayout(state)
})

export default connect(mapStateToProps, null)(FloatingContainer)