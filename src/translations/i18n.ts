//import i18nhttp from 'i18next-http-backend'
//import Backend from 'i18next-chained-backend'
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import common_fr from "./fr/common.json";
import common_en from "./en/common.json";

i18n.use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['path'],
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
i18n.on('languageChanged', (lng) => {
  console.log('langChanged');
  document.documentElement.setAttribute('lang', lng);
})

export default i18n;