import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Signin from '../auth/Signin';
import { FaClone, FaMinus } from 'react-icons/fa';
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
  
  const handleOnExpand = () => {
    dispatch(setPosition(ChatPosition.FLOATING))
  }
  
  const handleOnReduce = () => {
    dispatch(setPosition(ChatPosition.FIXED))
  }
  
  return <div id="chat"
    className="shadow-sm p-2"
    style={{
      ...style,
      backgroundColor: 'rgb(255,255,255, 0.1)'
    }}>
    <div className="mb-2 d-flex flex-row-reverse">
      {position === ChatPosition.FIXED && <ButtonLight onClick={handleOnExpand}><FaClone /></ButtonLight>}
      {position === ChatPosition.FLOATING && <ButtonLight onClick={handleOnReduce}><FaMinus /></ButtonLight>}
    </div>
    {authenticated ?
      <>
        <MessageList />
        <MessageInput />
      </>
      :
      <Signin />
    }
    </div>
}

const mapStateToProps = (state: any) => ({
  position: selectChatPostion(state),
  authenticated: state.auth.role
})

export default connect(mapStateToProps, null)(Chat)
