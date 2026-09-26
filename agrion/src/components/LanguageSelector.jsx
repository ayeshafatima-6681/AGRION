import { useEffect, useState } from "react";
import "./LanguageSelector.css";
import {
  getAgrionLanguages,
  getStoredLanguage,
  saveAgrionLanguage,
  getLanguageByCode,
} from "../data/languages";

function LanguageSelector({ onLanguageChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    getStoredLanguage()
  );

  const [open, setOpen] = useState(false);

  const languages = getAgrionLanguages();
  const currentLanguage = getLanguageByCode(selectedLanguage);

  useEffect(() => {
    const handleStorageChange = () => {
      setSelectedLanguage(getStoredLanguage());
    };

    window.addEventListener(
      "agrionLanguageChanged",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "agrionLanguageChanged",
        handleStorageChange
      );
    };
  }, []);

  const handleLanguageSelect = (languageCode) => {
    const savedLanguage =
      saveAgrionLanguage(languageCode);

    setSelectedLanguage(savedLanguage);
    setOpen(false);

    window.dispatchEvent(
      new CustomEvent("agrionLanguageChanged", {
        detail: {
          language: savedLanguage,
        },
      })
    );

    if (onLanguageChange) {
      onLanguageChange(savedLanguage);
    }
  };

  return (
    <div className="agrion-language-selector">
      <button
        type="button"
        className="agrion-language-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Choose language"
      >
        <span className="agrion-language-globe">
          🌐
        </span>

        <span className="agrion-language-current">
          {currentLanguage.nativeName}
        </span>

        <span
          className={`agrion-language-arrow ${
            open ? "open" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="agrion-language-menu">
          <div className="agrion-language-menu-header">
            <strong>Choose your language</strong>
            <span>
              AGRION will use this preference
            </span>
          </div>

          <div className="agrion-language-list">
            {languages.map((language) => (
              <button
                type="button"
                key={language.code}
                className={`agrion-language-option ${
                  selectedLanguage === language.code
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleLanguageSelect(
                    language.code
                  )
                }
              >
                <span className="agrion-language-native">
                  {language.nativeName}
                </span>

                <span className="agrion-language-name">
                  {language.name}
                </span>

                {selectedLanguage ===
                  language.code && (
                  <span className="agrion-language-check">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;