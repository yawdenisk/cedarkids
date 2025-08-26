import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', countryCode: 'gb' },
  { code: 'bg', label: 'Български', countryCode: 'bg' },
  { code: 'hu', label: 'Magyar', countryCode: 'hu' },
  { code: 'el', label: 'Ελληνικά', countryCode: 'gr' },
  { code: 'da', label: 'Dansk', countryCode: 'dk' },
  { code: 'ie', label: 'Gaeilge', countryCode: 'ie' },
  { code: 'es', label: 'Español', countryCode: 'es' },
  { code: 'it', label: 'Italiano', countryCode: 'it' },
  { code: 'lv', label: 'Latviešu', countryCode: 'lv' },
  { code: 'lt', label: 'Lietuvių', countryCode: 'lt' },
  { code: 'mt', label: 'Malti', countryCode: 'mt' },
  { code: 'de', label: 'Deutsch', countryCode: 'de' },
  { code: 'nl', label: 'Nederlands', countryCode: 'nl' },
  { code: 'pl', label: 'Polski', countryCode: 'pl' },
  { code: 'pt', label: 'Português', countryCode: 'pt' },
  { code: 'ro', label: 'Română', countryCode: 'ro' },
  { code: 'sk', label: 'Slovenčina', countryCode: 'sk' },
  { code: 'sl', label: 'Slovenščina', countryCode: 'si' },
  { code: 'fi', label: 'Suomi', countryCode: 'fi' },
  { code: 'fr', label: 'Français', countryCode: 'fr' },
  { code: 'hr', label: 'Hrvatski', countryCode: 'hr' },
  { code: 'cs', label: 'Čeština', countryCode: 'cz' },
  { code: 'sv', label: 'Svenska', countryCode: 'se' },
  { code: 'et', label: 'Eesti', countryCode: 'ee' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className='language'>
       <div className="language-selector" ref={buttonRef}>
      <button className="lang-button" onClick={() => setIsOpen(!isOpen)}>
        🌐
      </button>

      {isOpen && (
        <div className="lang-modal">
          <ul className="lang-list">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button onClick={() => changeLanguage(lang.code)}>
                  <img
                    src={`https://flagcdn.com/24x18/${lang.countryCode}.png`}
                    alt={lang.label}
                    className="flag"
                  />{' '}
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}
