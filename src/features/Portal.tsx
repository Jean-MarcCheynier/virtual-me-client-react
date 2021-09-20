import ReactDOM from 'react-dom';

const Portal = (props: any) => {
  
  const chatRoot = document.getElementById('chat-root') || document.createElement('div');
  
  return ReactDOM.createPortal(
    props.children,
    chatRoot);
}

export default Portal;