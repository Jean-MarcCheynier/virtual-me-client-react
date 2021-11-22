import React, {useState, useEffect, useMemo} from 'react';
import { connect, useDispatch } from 'react-redux';
import Chat from './Chat';
import { ChatLayout, selectChatLayout, restoreLayout, setLayout } from './chatSlice';
import styles from "./chat.module.scss";
import { CSSTransition } from 'react-transition-group';
import ButtonGroup from './ButtonGroup';
import { BsFillChatDotsFill } from 'react-icons/bs'
import { Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

const defaultPosition = {
  top: 50,
  left: 450,
}

const defaultOffset = {
  top: 0,
  left: 0,
}

type FloatingChatProps = {
  chatLayout?: ChatLayout,
  prevLayout?: any,
  display?: ChatLayout[],
  restoreLayout?: any,
  setLayout: any,
  selectChatLayout?: any
}
/**
 * @Description Floating container for Chat.tsx Component. 
 * Here we intercept events to position the chat component on the screen
 * @returns 
 */
export const FloatingChat: React.FC<FloatingChatProps> = (props) => {
  const { chatLayout, display, selectChatLayout, restoreLayout, setLayout } = props;
  
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  
  useEffect(() => {
    if (isTabletOrMobile) {
      setLayout(ChatLayout.FLOATING)
    }
  }, [isTabletOrMobile, selectChatLayout])
  

  
  const [position, setPosition] = useState(defaultPosition);
  const [offset, setOffset] = useState(defaultOffset);

  
  
  
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
    if (chatLayout === ChatLayout.FLOATING && !isTabletOrMobile) {
      if (e.target.className === "card-body") {
        return 
      }
      e.stopPropagation(); // remove if you do want it to propagate ..
      setOffset({ left: e.nativeEvent.layerX, top: e.nativeEvent.layerY })
      window.addEventListener('mousemove', whileMove);
      window.addEventListener('mouseup', endMove);
    }
  }
  
  const handleOnClick = (e: any) => {
    if (chatLayout === ChatLayout.BUBBLE) { restoreLayout() }
  }
  
  //If the attribute 'display' is specified, then display the inner component only for the ChatPosition specified.
  //If it is not specified then the inner component is displayed by default.
  const displayContainer = display === undefined || (chatLayout && display && display.includes(chatLayout))

  const cClass = styles[`container-${chatLayout}`];
  return (
    <CSSTransition
      in={chatLayout === ChatLayout.BUBBLE}
      timeout={400}
      classNames='floating-chat'>
      <div className={`${cClass}  chat-container shadow-sm ${displayContainer ? '' : 'd-none'} ${chatLayout}`}
        style={{
          ...(chatLayout === ChatLayout.FLOATING && !isTabletOrMobile) ? {
            ...position
          } : {}
        }}
        onMouseDown={handleOnMouseDown}
        onClick={handleOnClick}
      >
        {chatLayout !== ChatLayout.BUBBLE ?
          <>
        <div className={styles.buttonGroup}>
          <ButtonGroup/>
        </div>
        <div className={styles.chat}>   
          <Chat />
      </div>
</>
          :
        <Button className="text-center h-100 w-100 rounded-circle"><BsFillChatDotsFill size={24} /></Button>
          
        }   
      </div>
        
    </CSSTransition>)
}

const mapStateToProps = (state: any) => ({
  prevLayout: state.chat.prevLayout,
  chatLayout: selectChatLayout(state)
});

export default connect(mapStateToProps,
  {
    restoreLayout,
    selectChatLayout,
    setLayout
  })(FloatingChat)