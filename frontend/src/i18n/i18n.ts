import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import nl from './locales/nl/translation.json';

export const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    },
    nl: {
        translation: nl
    }
} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    resources,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    keySeparator: false,
});

export default i18n;