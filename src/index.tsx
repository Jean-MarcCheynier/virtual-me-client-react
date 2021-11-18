import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import FloatingChat from './features/chat/FloatingChat';
import Portal from './features/Portal';
import WebSocketProvider from './features/ws/WebSocketProvider';
import { ChatLayout } from './features/chat/chatSlice';
import i18n from './translations/i18n';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <WebSocketProvider>
        <I18nextProvider i18n={i18n}>

            <Portal>
              <FloatingChat display={[ChatLayout.BUBBLE, ChatLayout.FLOATING]}/>
            </Portal>
            <App />
        </I18nextProvider>
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
