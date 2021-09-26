import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Signin from '../auth/Signin';
import { FaClone, FaMinus, FaExternalLinkSquareAlt } from 'react-icons/fa';
import ButtonLight from '../../components/custom/buttons/ButtonLight';
import { connect, useDispatch } from 'react-redux';
import { ChatPosition, setPosition, selectChatPostion } from './chatSlice';

type ChatProps = {
  style?: any,
  authenticated?: boolean | null,
  position?: ChatPosition
}

const Chat = (props: ChatProps) => {
  
  const { style, authenticated, position } = props;
  const dispatch = useDispatch();
  
  const setFloatting = () => {
    dispatch(setPosition(ChatPosition.FLOATING))
  }
  
  const setFix = () => {
    dispatch(setPosition(ChatPosition.FIXED))
  }

  const setBubble = () => {
    dispatch(setPosition(ChatPosition.BUBBLE))
  }
  
  return <div id="chat" onClick={() => { if(position === ChatPosition.BUBBLE) { setFloatting()} }}
    className={`shadow-sm p-2 ${(position === ChatPosition.BUBBLE)?'bubble':''}`}
    style={{
      ...style,
      backgroundColor: 'rgb(255,255,255, 0.1)'
    }}>
    { position !== ChatPosition.BUBBLE &&
    <>
      <div className="mb-2 d-flex flex-row-reverse">
        {position === ChatPosition.FIXED && 
        <>
          <ButtonLight className="ml-1" onClick={setFloatting}><FaClone /></ButtonLight>
          <ButtonLight onClick={setBubble}><FaMinus /></ButtonLight>
        </>}
        {position === ChatPosition.FLOATING && 
        <>
          {/* Padding issue with FaExternalLink */}
          <ButtonLight className="pt-0 ml-1" onClick={setFix}><FaExternalLinkSquareAlt /></ButtonLight>
          <ButtonLight onClick={setBubble}><FaMinus /></ButtonLight>
        </>}
      </div>
      {authenticated ?
        <>
          <MessageList />
          <MessageInput />
        </>
        :
        <Signin />
      }
    </>}
  </div>

}

const mapStateToProps = (state: any) => ({
  position: selectChatPostion(state),
  authenticated: state.auth.role
})

export default connect(mapStateToProps, null)(Chat)
