import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { appStore } from "~stores/appStore";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpBackend)
  .init({
    lng: "uk",
    defaultNS: "trans22",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: process.env.NODE_ENV === "development",
  });

i18n.on("languageChanged", (lng) => {
  appStore.setLng(lng);
});
export default i18n;
