import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Signin from '../auth/Signin';

type ChatProps = {
  style?: any,
  authenticated: boolean
}



export default function Chat(props: ChatProps) {
  
  const { style, authenticated } = props;
  
  return <div id="chat" className="shadow-sm" style={{
    ...style,
    backgroundColor: 'rgb(255,255,255, 0.1)'
  }}>
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
