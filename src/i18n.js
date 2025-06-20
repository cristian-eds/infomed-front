import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationPTBR from './locales/pt-BR/translation.json';

const initialLanguage = localStorage.getItem("lang") ? localStorage.getItem("lang") : document.documentElement.lang;

const resources = {
    en: {
        translation: translationEN
    },
    'pt-BR': {
        translation: translationPTBR
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: initialLanguage,
        fallbackLng: 'pt-BR',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;
