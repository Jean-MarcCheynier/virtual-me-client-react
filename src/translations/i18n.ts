//import i18nhttp from 'i18next-http-backend'
//import Backend from 'i18next-chained-backend'
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import common_fr from "./fr/common.json";
import common_en from "./en/common.json";

import manual_fr from "./fr/manual.json";
import manual_en from "./en/manual.json";

import biography_fr from "./fr/biography.json";
import biography_en from "./en/biography.json";

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
        common: common_en,
        manual: manual_en,
        bio: biography_en
      },
      fr: {
        common: common_fr,
        manual: manual_fr,
        bio: biography_fr
      },
    },
    fallbackLng: 'en',
    whitelist: ['en', 'fr'],
  });

document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
})

export default i18n;