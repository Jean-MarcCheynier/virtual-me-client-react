import MessageList from './MessageList';
import MessageInput from './MessageInput';

type ChatProps = {
  style?: any
}



export default function Chat(props: ChatProps) {
  
  const { style } = props;
  
  return <div className="shadow-sm" style={{
    ...style,
    backgroundColor: 'rgb(255,255,255, 0.4)'
  }}>
    <MessageList />
    <MessageInput />



    </div>

}
