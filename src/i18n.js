import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import moment from 'moment';
import 'moment/locale/ru';

moment.updateLocale('ru', {
  longDateFormat: {
    LLL: 'D MMMM YYYY, H:mm',
  },
});

moment.updateLocale('en', {
  longDateFormat: {
    LLL: 'MMMM D, YYYY H:mm',
  },
});

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: false,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
