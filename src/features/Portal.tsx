import ReactDOM from 'react-dom';

const Portal = (props: any) => {
  
  const modalRoot = document.getElementById('chat-root') || document.createElement('div');
  
  return ReactDOM.createPortal(
    props.children,
    modalRoot);
}

export default Portal;