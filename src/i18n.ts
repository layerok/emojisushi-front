import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpBackend)
  .init({
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
