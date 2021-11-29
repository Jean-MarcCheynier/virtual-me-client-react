import React, {useState, useEffect} from 'react';
import { connect} from 'react-redux';
import Chat from './Chat';
import { ChatLayout, selectChatLayout, restoreLayout, setLayout } from './chatSlice';
import styles from "./chat.module.scss";
import { CSSTransition } from 'react-transition-group';
import ButtonGroup from './ButtonGroup';
import { BsFillChatDotsFill } from 'react-icons/bs'
import { Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Auth from '../auth/Auth';
import { FaComments } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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
  preferredColor?: string,
  prevLayout?: any,
  authenticated: any,
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
  const { chatLayout, display, restoreLayout, setLayout, authenticated, preferredColor } = props;
  const [t] = useTranslation('common');
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' });
  //const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  
  useEffect(() => {
    if (isTabletOrMobile) {
      setLayout(ChatLayout.FLOATING)
      setLayout(ChatLayout.BUBBLE)
    }
  }, [isTabletOrMobile, setLayout])
  

  
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

  // Set container class according to layout
  const cClass = styles[`container-${chatLayout}`];
  // Set bg according to color preferences
  const preferredStyle = (preferredColor) ? { backgroundColor: preferredColor} : {}
  
  
  return (
    <CSSTransition
      in={chatLayout === ChatLayout.BUBBLE}
      timeout={400}
      classNames='floating-chat'>
      <div className={` ${cClass}  
          chat-container
          shadow-sm
          ${displayContainer ? '' : 'd-none'} 
          ${chatLayout} 
          ${(isTabletOrMobile && !authenticated && chatLayout !== ChatLayout.BUBBLE) ? styles.authContainer :''}
        `}
        style={{
          ...(chatLayout === ChatLayout.FLOATING && !isTabletOrMobile) ? {
            ...position
          } : {},
          ...preferredStyle
        }}
        onMouseDown={handleOnMouseDown}
        onClick={handleOnClick}
      >
        {chatLayout !== ChatLayout.BUBBLE ?
          <>
        <div className={styles.buttonGroup}>
          <ButtonGroup/>
        </div>
            {authenticated ?
              <div className={styles.chat}>
                <Chat />
              </div>
              :
              <div className={`text-center mt-5 text-primary` }>
                <FaComments size={70} />
                <h2>{t('auth.mobileTitle')}</h2>
                <Auth />
              </div>
            }
</>
          :
        <Button className="text-center h-100 w-100 rounded-circle"><BsFillChatDotsFill size={24} /></Button>
          
        }   
      </div>
        
    </CSSTransition>)
}

const mapStateToProps = (state: any) => ({
  prevLayout: state.chat.prevLayout,
  preferredColor: state.preferences?.color,
  chatLayout: selectChatLayout(state),
  authenticated: state.auth.role
});

export default connect(mapStateToProps,
  {
    restoreLayout,
    selectChatLayout,
    setLayout
  })(FloatingChat)