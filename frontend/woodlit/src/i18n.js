import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./local/en/translation.json";
import pl from "./local/pl/translation.json";
import bg from "./local/bg/translation.json";
import hu from "./local/hu/translation.json";
import el from "./local/el/translation.json";
import da from "./local/da/translation.json";
import ie from "./local/ie/translation.json";
import es from "./local/es/translation.json";
import it from "./local/it/translation.json";
import lv from "./local/lv/translation.json";
import lt from "./local/lt/translation.json";
import mt from "./local/mt/translation.json";
import de from "./local/de/translation.json";
import nl from "./local/nl/translation.json";
import pt from "./local/pt/translation.json";
import ro from "./local/ro/translation.json";
import sk from "./local/sk/translation.json";
import sl from "./local/sl/translation.json";
import fi from "./local/fi/translation.json";
import fr from "./local/fr/translation.json";
import hr from "./local/hr/translation.json";
import cs from "./local/cs/translation.json";
import sv from "./local/sv/translation.json";
import et from "./local/et/translation.json";

i18n
  .use(LanguageDetector) // автоматическое определение языка
  .use(initReactI18next) // интеграция с React
  .init({
    resources: {
      en: { translation: en },
      pl: { translation: pl },
      bg: { translation: bg },
      hu: { translation: hu },
      el: { translation: el },
      da: { translation: da },
      ie: { translation: ie },
      es: { translation: es },
      it: { translation: it },
      lv: { translation: lv },
      lt: { translation: lt },
      mt: { translation: mt },
      de: { translation: de },
      nl: { translation: nl },
      pt: { translation: pt },
      ro: { translation: ro },
      sk: { translation: sk },
      sl: { translation: sl },
      fi: { translation: fi },
      fr: { translation: fr },
      hr: { translation: hr },
      cs: { translation: cs },
      sv: { translation: sv },
      et: { translation: et }
    },
    fallbackLng: "en",   // язык по умолчанию
    interpolation: {
      escapeValue: false, // react уже экранирует
    },
  });

export default i18n;
