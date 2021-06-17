import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";


import FloatingContainer from './features/chat/FloatingContainer';
import Portal from './features/Portal';

import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";
import WebSocketProvider from './features/ws/WebSocketProvider';


i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: "fr", // if you're using a language detector, do not define the lng option
  fallbackLng: "fr",                             // language to use
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    fr: {
      common: common_fr
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <I18nextProvider i18n={i18next}>
          <Portal>
            <FloatingContainer />
          </Portal>

            <App />
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
