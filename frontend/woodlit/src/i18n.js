import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import pl from "./locales/pl/translation.json";

i18n
  .use(LanguageDetector) // автоматическое определение языка
  .use(initReactI18next) // интеграция с React
  .init({
    resources: {
      en: { translation: en },
      pl: { translation: pl },
    },
    fallbackLng: "en",   // язык по умолчанию
    interpolation: {
      escapeValue: false, // react уже экранирует
    },
  });

export default i18n;
