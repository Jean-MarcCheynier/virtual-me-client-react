import React, {useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import Chat from './Chat';
import { ChatLayout, selectChatLayout, restoreLayout } from './chatSlice';
import styles from "./FloatingChat.module.scss";
import { CSSTransition } from 'react-transition-group';
import ButtonGroup from './ButtonGroup';
import { BsFillChatDotsFill } from 'react-icons/bs'
import { Button } from 'react-bootstrap';

type FloatingChatProps = {
  chatLayout?: ChatLayout,
  display?: ChatLayout[]
}
/**
 * @Description Floating container for Chat.tsx Component. 
 * Here we intercept events to position the chat component on the screen
 * @returns 
 */
export const FloatingChat = (props: FloatingChatProps) => {
  
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
  
  const whileMove = (e: any) => {
    setPosition(position => ({
      ...position,
      left: e.pageX - offset.left,
      top: e.pageY - offset.top,
    }))
  }
  

  const endMove = () => {
    window.removeEventListener('mousemove', whileMove);
    window.removeEventListener('mouseup', endMove);
  };
  
  // Trigger scroll on mousedown
  const handleOnMouseDown = (e: any) => {
    if (chatLayout === ChatLayout.FLOATING) {
      e.stopPropagation(); // remove if you do want it to propagate ..
      setOffset({ left: e.nativeEvent.layerX, top: e.nativeEvent.layerY })
      window.addEventListener('mousemove', whileMove);
      window.addEventListener('mouseup', endMove);
    }
  }
  
  const handleOnClick = (e: any) => {
    if (chatLayout === ChatLayout.BUBBLE) { dispatch(restoreLayout()) }
  }
  
  //If the attribute 'display' is specified, then display the inner component only for the ChatPosition specified.
  //If it is not specified then the inner component is displayed by default.
  const displayContainer = display === undefined || (chatLayout && display && display.includes(chatLayout))
  
  return (
    <CSSTransition
      in={chatLayout === ChatLayout.BUBBLE}
      timeout={400}
      classNames='floating-chat'>
      <div className={`${styles.floatingBg} bubble shadow-sm ${displayContainer?'':'d-none'}`}
        style={{
          ...(chatLayout === ChatLayout.FLOATING) ? {
            ...position,
            position: 'absolute',
            backgroundColor: '#e2e2e255'
          } : {},
          ...(chatLayout === ChatLayout.BUBBLE) ? { position: 'fixed' } : {},
          ...(chatLayout === ChatLayout.FIXED) ? { height: '100vh' } : {},
        }}
        onMouseDown={handleOnMouseDown}
        onClick={handleOnClick}
      >
        {chatLayout !== ChatLayout.BUBBLE ?
        <div className="p-2">
          <ButtonGroup/>
          <Chat />
        </div>
          :
          <Button className="text-center h-100 w-100 rounded-circle"><BsFillChatDotsFill size={24} /></Button>
          
        }   
      </div>
        
    </CSSTransition>)
}

const mapStateToProps = (state: any) => ({
  prevLayout: state.chat.prevLayout,
  chatLayout: selectChatLayout(state)
})

export default connect(mapStateToProps, null)(FloatingChat)