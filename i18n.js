import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import jaTranslation from './locales/ja.json';

const languageKey = 'language';
let storedLanguage;

if (typeof window !== 'undefined') {
  storedLanguage = window.localStorage.getItem(languageKey);
}


i18n
    .use(initReactI18next)
    .init({
        resources:{
            en:{
                translation: enTranslation,
            },
            ja:{
                translation: jaTranslation,
            },
        },
        lng: storedLanguage || 'en',
        fallbackLng:'en',
        interpolation:{
            escapeValue:false
        },
        saveLanguageState:true,
    })
export default i18n;
