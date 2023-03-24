import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";
import uk from "./locales/uk.json";
import LocalStorageService from "~services/local-storage.service";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  uk: {
    translation: {
      ...uk,
    },
  },
  ru: {
    translation: {
      ...ru,
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: LocalStorageService.get("i18next_lang", "uk"), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
