import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { connect } from 'react-redux';
import { ChatLayout, selectChatLayout } from './chatSlice';

type ChatProps = {
  authenticated?: boolean | null,
  chatLayout?: ChatLayout
}

const Chat = (props: ChatProps) => {
  
  return (<>
          <MessageList />
          <MessageInput />
  </>)

}

const mapStateToProps = (state: any) => ({
  authenticated: state.auth.role,
  chatLayout: selectChatLayout(state)
})

export default connect(mapStateToProps, null)(Chat)
