import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Signin from '../auth/Signin';
import { connect } from 'react-redux';
import Auth from './../auth/Auth';

type ChatProps = {
  authenticated?: boolean | null,
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
  authenticated: state.auth.role
})

export default connect(mapStateToProps, null)(Chat)
