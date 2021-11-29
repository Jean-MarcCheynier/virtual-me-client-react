import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import FloatingChat from './features/chat/FloatingChat';
import Portal from './features/Portal';
import WebSocketProvider from './features/ws/WebSocketProvider';
import { ChatLayout } from './features/chat/chatSlice';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <WebSocketProvider>


            <Portal>
              <FloatingChat display={[ChatLayout.BUBBLE, ChatLayout.FLOATING]}/>
            </Portal>
            <App />

      </WebSocketProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
