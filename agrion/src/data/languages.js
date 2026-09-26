const AGRION_LANGUAGES = [
  {
    code: "en-IN",
    name: "English",
    nativeName: "English",
  },
  {
    code: "hi-IN",
    name: "Hindi",
    nativeName: "हिन्दी",
  },
  {
    code: "kn-IN",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
  },
  {
    code: "te-IN",
    name: "Telugu",
    nativeName: "తెలుగు",
  },
  {
    code: "ta-IN",
    name: "Tamil",
    nativeName: "தமிழ்",
  },
  {
    code: "ml-IN",
    name: "Malayalam",
    nativeName: "മലയാളം",
  },
  {
    code: "mr-IN",
    name: "Marathi",
    nativeName: "मराठी",
  },
  {
    code: "bn-IN",
    name: "Bengali",
    nativeName: "বাংলা",
  },
  {
    code: "gu-IN",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
  },
  {
    code: "pa-IN",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
  },
];

export const DEFAULT_LANGUAGE = "en-IN";

export const LANGUAGE_STORAGE_KEY = "agrionLanguage";

export const getAgrionLanguages = () => {
  return AGRION_LANGUAGES;
};

export const getLanguageByCode = (code) => {
  return (
    AGRION_LANGUAGES.find(
      (language) => language.code === code
    ) || AGRION_LANGUAGES[0]
  );
};

export const getStoredLanguage = () => {
  const storedLanguage = localStorage.getItem(
    LANGUAGE_STORAGE_KEY
  );

  const exists = AGRION_LANGUAGES.some(
    (language) => language.code === storedLanguage
  );

  return exists
    ? storedLanguage
    : DEFAULT_LANGUAGE;
};

export const saveAgrionLanguage = (languageCode) => {
  const exists = AGRION_LANGUAGES.some(
    (language) => language.code === languageCode
  );

  if (!exists) {
    return DEFAULT_LANGUAGE;
  }

  localStorage.setItem(
    LANGUAGE_STORAGE_KEY,
    languageCode
  );

  return languageCode;
};

export default AGRION_LANGUAGES;