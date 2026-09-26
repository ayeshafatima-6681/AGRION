import { useEffect, useRef, useState } from "react";
import "./AgrionOnboarding.css";

const LANGUAGES = [
  {
    code: "en-IN",
    name: "English",
    nativeName: "English",
    speechCode: "en-IN",
  },
  {
    code: "hi-IN",
    name: "Hindi",
    nativeName: "हिन्दी",
    speechCode: "hi-IN",
  },
  {
    code: "kn-IN",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    speechCode: "kn-IN",
  },
  {
    code: "te-IN",
    name: "Telugu",
    nativeName: "తెలుగు",
    speechCode: "te-IN",
  },
  {
    code: "ta-IN",
    name: "Tamil",
    nativeName: "தமிழ்",
    speechCode: "ta-IN",
  },
];

function AgrionOnboarding({ mode, onBack, onComplete }) {
  const [name, setName] = useState(
    () => localStorage.getItem("agrionUserName") || ""
  );

  const [language, setLanguage] = useState(
    () => localStorage.getItem("agrionLanguage") || "en-IN"
  );

  const [isListening, setIsListening] = useState(false);

  const [message, setMessage] = useState(
    mode === "voice"
      ? "Hello! What is your name?"
      : "Hello! What is your name?"
  );

  const recognitionRef = useRef(null);

  const selectedLanguage =
    LANGUAGES.find((item) => item.code === language) ||
    LANGUAGES[0];

  useEffect(() => {
    if (mode !== "voice") {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage(
        "Voice recognition is not available. Please type your name."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = selectedLanguage.speechCode;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);

      setMessage(
        language === "hi-IN"
          ? "मैं सुन रहा हूँ... अपना नाम बताइए।"
          : language === "kn-IN"
          ? "ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ... ನಿಮ್ಮ ಹೆಸರನ್ನು ಹೇಳಿ."
          : language === "te-IN"
          ? "నేను వింటున్నాను... మీ పేరు చెప్పండి."
          : language === "ta-IN"
          ? "நான் கேட்கிறேன்... உங்கள் பெயரைச் சொல்லுங்கள்."
          : "I'm listening... Please tell me your name."
      );
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript.trim();

      if (!transcript) {
        setMessage(
          "I didn't hear your name. Please try again."
        );
        return;
      }

      let cleanedName = transcript
        .replace(
          /^(my name is|my name's|i am|i'm|this is|myself)\s+/i,
          ""
        )
        .trim();

      if (!cleanedName) {
        cleanedName = transcript;
      }

      setName(cleanedName);

      const response =
        language === "hi-IN"
          ? `आपसे मिलकर खुशी हुई, ${cleanedName}!`
          : language === "kn-IN"
          ? `${cleanedName}, ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದು ಸಂತೋಷವಾಗಿದೆ!`
          : language === "te-IN"
          ? `${cleanedName}, మిమ్మల్ని కలవడం ఆనందంగా ఉంది!`
          : language === "ta-IN"
          ? `${cleanedName}, உங்களை சந்தித்ததில் மகிழ்ச்சி!`
          : `Nice to meet you, ${cleanedName}!`;

      setMessage(response);

      setIsListening(false);

      speak(response, selectedLanguage.speechCode);
    };

    recognition.onerror = (event) => {
      console.log(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);

      if (event.error === "not-allowed") {
        setMessage(
          "Please allow microphone access and tap the microphone again."
        );
      } else if (event.error === "no-speech") {
        setMessage(
          "I couldn't hear you. Tap the microphone and speak clearly."
        );
      } else {
        setMessage(
          "Something went wrong. Tap the microphone and try again."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch (error) {
        console.log(error);
      }

      recognitionRef.current = null;
    };
  }, [mode, language, selectedLanguage.speechCode]);

  const speak = (text, languageCode) => {
    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = languageCode;

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      setMessage(
        "Voice recognition is not available in this browser."
      );
      return;
    }

    if (isListening) {
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.log(
        "Recognition already running:",
        error
      );
    }
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;

    setLanguage(newLanguage);

    const selected =
      LANGUAGES.find(
        (item) => item.code === newLanguage
      ) || LANGUAGES[0];

    localStorage.setItem(
      "agrionLanguage",
      newLanguage
    );

    if (mode === "voice") {
      const messages = {
        "en-IN": "Hello! What is your name?",
        "hi-IN": "नमस्ते! आपका नाम क्या है?",
        "kn-IN": "ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಹೆಸರೇನು?",
        "te-IN": "నమస్కారం! మీ పేరు ఏమిటి?",
        "ta-IN": "வணக்கம்! உங்கள் பெயர் என்ன?",
      };

      const newMessage =
        messages[newLanguage] ||
        messages["en-IN"];

      setMessage(newMessage);

      speak(
        newMessage,
        selected.speechCode
      );
    }
  };

  const handleContinue = () => {
    const finalName = name.trim();

    if (!finalName) {
      setMessage(
        language === "hi-IN"
          ? "कृपया पहले अपना नाम बताएं या टाइप करें।"
          : language === "kn-IN"
          ? "ದಯವಿಟ್ಟು ಮೊದಲು ನಿಮ್ಮ ಹೆಸರನ್ನು ಹೇಳಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ."
          : language === "te-IN"
          ? "దయచేసి ముందుగా మీ పేరు చెప్పండి లేదా టైప్ చేయండి."
          : language === "ta-IN"
          ? "முதலில் உங்கள் பெயரைச் சொல்லுங்கள் அல்லது தட்டச்சு செய்யுங்கள்."
          : "Please tell me or type your name first."
      );

      return;
    }

    try {
      recognitionRef.current?.abort();
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem(
      "agrionUserName",
      finalName
    );

    localStorage.setItem(
      "agrionLanguage",
      language
    );

    onComplete({
      name: finalName,
      language,
      languageName: selectedLanguage.name,
    });
  };

  return (
    <div className="onboarding-page">
      <main className="onboarding-container">

        <section className="onboarding-card">

          <div className="onboarding-top">

            <button
              type="button"
              className="onboarding-back"
              onClick={onBack}
            >
              ← Back
            </button>

            <div className="onboarding-brand">

              <div className="onboarding-brand-icon">
                🌱
              </div>

              <div>
                <strong>AGRION</strong>
                <span>From Seed to Market</span>
              </div>

            </div>

          </div>

          <div className="onboarding-content">

            <div className="onboarding-icon">
              {mode === "voice" ? "🎤" : "💬"}
            </div>

            <div className="onboarding-badge">
              LET'S GET STARTED
            </div>

            <h1>
              {mode === "voice"
                ? "Let's talk!"
                : "Let's get to know you"}
            </h1>

            <p className="onboarding-message">
              {message}
            </p>

            {/* LANGUAGE */}

            <div className="onboarding-question">
              <label htmlFor="agrion-language">
                🌍 Language
              </label>

              <select
                id="agrion-language"
                value={language}
                onChange={handleLanguageChange}
              >
                {LANGUAGES.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                  >
                    {item.nativeName} — {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* NAME */}

            <div className="onboarding-question">

              <label htmlFor="name">
                Your name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  setName(value);

                  if (value.trim()) {
                    setMessage(
                      `Nice to meet you, ${value.trim()}!`
                    );
                  }
                }}
                placeholder="Your name"
                autoComplete="name"
              />

            </div>

            {mode === "voice" && (
              <div className="onboarding-voice">

                <button
                  type="button"
                  className={
                    isListening
                      ? "onboarding-mic listening"
                      : "onboarding-mic"
                  }
                  onClick={startListening}
                  aria-label="Start voice input"
                >
                  {isListening ? "🔴" : "🎤"}
                </button>

                <div className="onboarding-voice-status">
                  {isListening
                    ? "Listening... Speak now"
                    : "Tap the microphone and speak"}
                </div>

              </div>
            )}

            <button
              type="button"
              className="onboarding-continue"
              onClick={handleContinue}
            >
              Continue →
            </button>

            <div className="onboarding-security">
              🔒 Your information is kept private.
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AgrionOnboarding;