import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import { BrowserRouter as Router } from "react-router-dom";


import FloatingChat from './features/chat/FloatingChat';
import Portal from './features/Portal';

import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";
import WebSocketProvider from './features/ws/WebSocketProvider';
import { ChatLayout } from './features/chat/chatSlice';


//import i18nhttp from 'i18next-http-backend'
//import Backend from 'i18next-chained-backend'

i18n.use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['htmlTag', 'path'],
      lookupFromPathIndex: 0
    },
    interpolation: { escapeValue: false },  // React already does escaping
    react: {
      useSuspense: true
    },
    resources: {
      en: {
        common: common_en               // 'common' is our custom namespace
      },
      fr: {
        common: common_fr
      },
    },
    fallbackLng: 'en',
  whitelist: ['en', 'fr'],
  });

document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (lng) => { console.log('langChanged'); document.documentElement.setAttribute('lang', lng); })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <I18nextProvider i18n={i18n}>
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
