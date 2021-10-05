import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import { BrowserRouter as Router } from "react-router-dom";


import FloatingChat from './features/chat/FloatingChat';
import Portal from './features/Portal';

import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";
import WebSocketProvider from './features/ws/WebSocketProvider';
import { ChatLayout } from './features/chat/chatSlice';


i18next
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['htmlTag', 'path'],
      lookupFromPathIndex: 0
    },
  interpolation: { escapeValue: false },  // React already does escaping
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    fr: {
      common: common_fr
    },
  },
  whitelist: ['en', 'fr'],
  });

document.documentElement.lang = i18next.language;
i18next.on('languageChanged', (lng) => { console.log('langChanged'); document.documentElement.setAttribute('lang', lng); })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <I18nextProvider i18n={i18next}>
          <Router>
            <Portal>
              <FloatingChat display={[ChatLayout.BUBBLE, ChatLayout.FLOATING]}/>
            </Portal>
            <App />
          </Router>
        </I18nextProvider>
      </WebSocketProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
