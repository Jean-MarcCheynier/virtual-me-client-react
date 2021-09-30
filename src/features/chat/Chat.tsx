import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Signin from '../auth/Signin';
import { connect } from 'react-redux';

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
        <Signin />
    }
  </>)

}

const mapStateToProps = (state: any) => ({
  authenticated: state.auth.role
})

export default connect(mapStateToProps, null)(Chat)
