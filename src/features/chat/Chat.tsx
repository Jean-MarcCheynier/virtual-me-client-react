import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { connect } from 'react-redux';
import Auth from './../auth/Auth';
import { ChatLayout, selectChatLayout } from './chatSlice';

type ChatProps = {
  authenticated?: boolean | null,
  chatLayou?: ChatLayout
}

const Chat = (props: ChatProps) => {
  
  const { authenticated } = props;

  
  return (<>
      {authenticated ?
        <>
          <MessageList />
          <MessageInput />
        </>
        :
          <Auth />
    }
  </>)

}

const mapStateToProps = (state: any) => ({
  authenticated: state.auth.role,
  chatLayout: selectChatLayout(state)
})

export default connect(mapStateToProps, null)(Chat)
