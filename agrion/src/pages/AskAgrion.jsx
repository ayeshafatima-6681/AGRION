import { useState } from "react";
import "./AskAgrion.css";

const LANGUAGES = [
  {
    code: "en-IN",
    name: "English",
  },
  {
    code: "hi-IN",
    name: "हिन्दी",
  },
  {
    code: "kn-IN",
    name: "ಕನ್ನಡ",
  },
  {
    code: "te-IN",
    name: "తెలుగు",
  },
  {
    code: "ta-IN",
    name: "தமிழ்",
  },
];

const translations = {
  "en-IN": {
    assistant: "AGRION Assistant",
    label: "AGRION FARMING ASSISTANT",
    title: "Ask AGRION.",
    subtitle: "Grow with confidence.",
    description:
      "Ask questions about your crop, soil, water, pests, diseases, harvesting, storage or selling.",
    hello: "Hello, farmer 👋",
    welcome:
      "What would you like to know about farming today?",
    tryAsking: "Try asking",
    placeholder:
      "Ask AGRION anything about farming...",
    listening: "Listening...",
    hint:
      "Press Enter to send • 🎤 Speak to AGRION",
    safety: "AGRION Safety Note",
    safetyText:
      "Farming recommendations can depend on your crop, variety, soil, weather, season and local conditions. Always verify important decisions with a qualified agricultural professional or trusted local source.",
    exploreCrops: "🌱 Explore Crops",
    checkProblem: "🔍 Check Crop Problem",
    exploreMarket: "🛒 Explore Market",
    openFarm: "🚜 Open My Farm",
    organic: "🌿 Learn Organic Farming",
    learn: "📚 Learn More",
  },

  "hi-IN": {
    assistant: "AGRION सहायक",
    label: "AGRION कृषि सहायक",
    title: "AGRION से पूछें।",
    subtitle: "आत्मविश्वास से खेती करें।",
    description:
      "अपनी फसल, मिट्टी, पानी, कीट, रोग, कटाई, भंडारण या बिक्री के बारे में पूछें।",
    hello: "नमस्ते किसान 👋",
    welcome:
      "आज आप खेती के बारे में क्या जानना चाहते हैं?",
    tryAsking: "यह पूछकर देखें",
    placeholder:
      "खेती के बारे में AGRION से कुछ भी पूछें...",
    listening: "सुन रहा हूँ...",
    hint:
      "Enter दबाकर भेजें • 🎤 AGRION से बोलें",
    safety: "AGRION सुरक्षा सूचना",
    safetyText:
      "खेती की सलाह आपकी फसल, किस्म, मिट्टी, मौसम और स्थानीय परिस्थितियों पर निर्भर कर सकती है। महत्वपूर्ण निर्णयों को कृषि विशेषज्ञ या विश्वसनीय स्थानीय स्रोत से सत्यापित करें।",
    exploreCrops: "🌱 फसलें देखें",
    checkProblem: "🔍 फसल की समस्या देखें",
    exploreMarket: "🛒 बाजार देखें",
    openFarm: "🚜 मेरा खेत खोलें",
    organic: "🌿 जैविक खेती सीखें",
    learn: "📚 और सीखें",
  },

  "kn-IN": {
    assistant: "AGRION ಸಹಾಯಕ",
    label: "AGRION ಕೃಷಿ ಸಹಾಯಕ",
    title: "AGRION ಅನ್ನು ಕೇಳಿ.",
    subtitle: "ವಿಶ್ವಾಸದಿಂದ ಕೃಷಿ ಮಾಡಿ.",
    description:
      "ನಿಮ್ಮ ಬೆಳೆ, ಮಣ್ಣು, ನೀರು, ಕೀಟಗಳು, ರೋಗಗಳು, ಕೊಯ್ಲು, ಸಂಗ್ರಹಣೆ ಅಥವಾ ಮಾರಾಟದ ಬಗ್ಗೆ ಕೇಳಿ.",
    hello: "ನಮಸ್ಕಾರ ರೈತರೆ 👋",
    welcome:
      "ಇಂದು ಕೃಷಿಯ ಬಗ್ಗೆ ನೀವು ಏನು ತಿಳಿದುಕೊಳ್ಳಲು ಬಯಸುತ್ತೀರಿ?",
    tryAsking: "ಇದನ್ನು ಕೇಳಿ",
    placeholder:
      "ಕೃಷಿಯ ಬಗ್ಗೆ AGRION ಅನ್ನು ಏನಾದರೂ ಕೇಳಿ...",
    listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ...",
    hint:
      "Enter ಒತ್ತಿ ಕಳುಹಿಸಿ • 🎤 AGRION ಜೊತೆ ಮಾತನಾಡಿ",
    safety: "AGRION ಸುರಕ್ಷತಾ ಸೂಚನೆ",
    safetyText:
      "ಕೃಷಿ ಸಲಹೆಗಳು ಬೆಳೆ, ತಳಿ, ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಸ್ಥಳೀಯ ಪರಿಸ್ಥಿತಿಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರಬಹುದು. ಪ್ರಮುಖ ನಿರ್ಧಾರಗಳನ್ನು ಕೃಷಿ ತಜ್ಞರು ಅಥವಾ ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಥಳೀಯ ಮೂಲದೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ.",
    exploreCrops: "🌱 ಬೆಳೆಗಳನ್ನು ನೋಡಿ",
    checkProblem: "🔍 ಬೆಳೆ ಸಮಸ್ಯೆ ಪರಿಶೀಲಿಸಿ",
    exploreMarket: "🛒 ಮಾರುಕಟ್ಟೆ ನೋಡಿ",
    openFarm: "🚜 ನನ್ನ ಫಾರ್ಮ್ ತೆರೆಯಿರಿ",
    organic: "🌿 ಸಾವಯವ ಕೃಷಿ ಕಲಿಯಿರಿ",
    learn: "📚 ಇನ್ನಷ್ಟು ಕಲಿಯಿರಿ",
  },

  "te-IN": {
    assistant: "AGRION సహాయకుడు",
    label: "AGRION వ్యవసాయ సహాయకుడు",
    title: "AGRION ను అడగండి.",
    subtitle: "నమ్మకంతో వ్యవసాయం చేయండి.",
    description:
      "మీ పంట, నేల, నీరు, పురుగులు, వ్యాధులు, కోత, నిల్వ లేదా అమ్మకం గురించి అడగండి.",
    hello: "నమస్కారం రైతు 👋",
    welcome:
      "ఈ రోజు వ్యవసాయం గురించి మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    tryAsking: "ఇలా అడగండి",
    placeholder:
      "వ్యవసాయం గురించి AGRION ను ఏదైనా అడగండి...",
    listening: "వింటున్నాను...",
    hint:
      "Enter నొక్కి పంపండి • 🎤 AGRION తో మాట్లాడండి",
    safety: "AGRION భద్రతా సూచన",
    safetyText:
      "వ్యవసాయ సలహాలు పంట, రకం, నేల, వాతావరణం మరియు స్థానిక పరిస్థితులపై ఆధారపడవచ్చు. ముఖ్యమైన నిర్ణయాలను వ్యవసాయ నిపుణులు లేదా నమ్మకమైన స్థానిక వనరుతో ధృవీకరించండి.",
    exploreCrops: "🌱 పంటలను చూడండి",
    checkProblem: "🔍 పంట సమస్యను తనిఖీ చేయండి",
    exploreMarket: "🛒 మార్కెట్ చూడండి",
    openFarm: "🚜 నా ఫార్మ్ తెరవండి",
    organic: "🌿 సేంద్రియ వ్యవసాయం నేర్చుకోండి",
    learn: "📚 మరింత నేర్చుకోండి",
  },

  "ta-IN": {
    assistant: "AGRION உதவியாளர்",
    label: "AGRION விவசாய உதவியாளர்",
    title: "AGRION-ஐ கேளுங்கள்.",
    subtitle: "நம்பிக்கையுடன் விவசாயம் செய்யுங்கள்.",
    description:
      "உங்கள் பயிர், மண், நீர், பூச்சிகள், நோய்கள், அறுவடை, சேமிப்பு அல்லது விற்பனை பற்றி கேளுங்கள்.",
    hello: "வணக்கம் விவசாயி 👋",
    welcome:
      "இன்று விவசாயம் பற்றி நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?",
    tryAsking: "இதை கேளுங்கள்",
    placeholder:
      "விவசாயம் பற்றி AGRION-ஐ எதையும் கேளுங்கள்...",
    listening: "கேட்கிறேன்...",
    hint:
      "Enter அழுத்தி அனுப்புங்கள் • 🎤 AGRION உடன் பேசுங்கள்",
    safety: "AGRION பாதுகாப்பு குறிப்பு",
    safetyText:
      "விவசாய பரிந்துரைகள் பயிர், வகை, மண், வானிலை மற்றும் உள்ளூர் நிலைமைகளைப் பொறுத்து மாறலாம். முக்கியமான முடிவுகளை விவசாய நிபுணர் அல்லது நம்பகமான உள்ளூர் ஆதாரத்துடன் சரிபார்க்கவும்.",
    exploreCrops: "🌱 பயிர்களை பார்க்கவும்",
    checkProblem: "🔍 பயிர் பிரச்சனையை சரிபார்க்கவும்",
    exploreMarket: "🛒 சந்தையை பார்க்கவும்",
    openFarm: "🚜 என் பண்ணையை திறக்கவும்",
    organic: "🌿 இயற்கை விவசாயம் கற்கவும்",
    learn: "📚 மேலும் கற்கவும்",
  },
};

function AskAgrion({
  onBack,
  onGrow,
  onCropProblem,
  onMyFarm,
  onMarket,
  onLearn,
  onOrganic,
}) {
  const [question, setQuestion] = useState(() => {
    const savedQuestion =
      localStorage.getItem("agrionAskPrefill");

    if (savedQuestion) {
      localStorage.removeItem("agrionAskPrefill");
      return savedQuestion;
    }

    return "";
  });

  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const [language, setLanguage] = useState(
    () => localStorage.getItem("agrionLanguage") || "en-IN"
  );

  const t =
    translations[language] ||
    translations["en-IN"];

  const suggestedQuestions = [
    "How do I start growing rice?",
    "How should I manage water for my crop?",
    "My crop has pests. What should I check?",
    "How can I improve my soil?",
    "When should I harvest my crop?",
  ];

  const getAgrionResponse = (userQuestion) => {
    const text = userQuestion.toLowerCase();

    if (
      text.includes("rice") &&
      (text.includes("start") ||
        text.includes("grow") ||
        text.includes("plant"))
    ) {
      return (
        "To start growing rice, first choose a suitable variety for your local conditions. " +
        "Then prepare the land, check soil and water availability, select good-quality seed, " +
        "and follow the recommended sowing method for your area. " +
        "The correct timing and water management depend on the rice variety, season and local conditions."
      );
    }

    if (
      text.includes("water") ||
      text.includes("irrigation") ||
      text.includes("irrigate")
    ) {
      return (
        "Water management depends on your crop, soil, growth stage, rainfall and irrigation method. " +
        "Avoid unnecessary irrigation and check soil moisture before watering. " +
        "If rain is expected, consider the crop stage and current soil moisture before deciding whether additional irrigation is needed."
      );
    }

    if (
      text.includes("pest") ||
      text.includes("insect") ||
      text.includes("bug")
    ) {
      return (
        "First identify what kind of pest or damage you are seeing. " +
        "Check the leaves, stems, flowers and fruits, and look for insects or feeding damage. " +
        "Avoid applying pesticides just because damage is visible. " +
        "Correct identification is important before choosing any treatment."
      );
    }

    if (
      text.includes("disease") ||
      text.includes("yellow") ||
      text.includes("spot") ||
      text.includes("leaf")
    ) {
      return (
        "Crop symptoms such as yellow leaves or spots can have several causes, including disease, " +
        "nutrient problems, water stress, pests or environmental conditions. " +
        "AGRION should use the crop, growth stage, symptoms, photo and local conditions before giving a specific recommendation. " +
        "For now, avoid making a treatment decision based only on one symptom."
      );
    }

    if (
      text.includes("soil") ||
      text.includes("fertilizer") ||
      text.includes("nutrient") ||
      text.includes("compost")
    ) {
      return (
        "Healthy soil is the foundation of good farming. " +
        "Start with a soil test when possible so pH and important nutrients can be understood. " +
        "Use fertilizers, compost or other inputs according to the crop's needs and soil-test results rather than applying more than necessary."
      );
    }

    if (
      text.includes("harvest") ||
      text.includes("ready to harvest")
    ) {
      return (
        "Harvest timing depends on the crop and variety. " +
        "Look at maturity indicators such as colour, size, moisture and the crop's recommended maturity period. " +
        "Harvesting too early or too late can affect quality, storage and selling value."
      );
    }

    if (
      text.includes("market") ||
      text.includes("sell") ||
      text.includes("buyer")
    ) {
      return (
        "When selling a crop, compare more than just the quoted price. " +
        "Consider the buyer, quality requirements, quantity, transport cost, distance, payment terms and market conditions. " +
        "You can use AGRION's Market section to explore selling options."
      );
    }

    if (
      text.includes("organic") ||
      text.includes("natural farming")
    ) {
      return (
        "Organic and sustainable farming focuses on maintaining healthy soil, supporting biodiversity, " +
        "using resources efficiently and reducing unnecessary chemical inputs. " +
        "Useful practices can include composting, crop rotation, organic matter management and integrated pest management."
      );
    }

    if (
      text.includes("what should i do") ||
      text.includes("what should i do now") ||
      text.includes("help me")
    ) {
      return (
        "I can help you step by step. Tell me your crop, its current growth stage, " +
        "and what you are trying to do or what problem you are seeing."
      );
    }

    return (
      "I understand your question. AGRION can help with crop selection, land preparation, " +
      "sowing, water, nutrients, pests, diseases, crop growth, harvesting, storage, markets and selling. " +
      "For a more useful answer, tell me your crop and what is happening in your field."
    );
  };

  /*
   * EXISTING AGRION ACTION SYSTEM
   *
   * Only expanded to connect existing topics
   * already present elsewhere in AGRION.
   */
  const getAction = (userQuestion) => {
    const text = userQuestion.toLowerCase();

    /*
     * CROP / PLANTING
     */
    if (
      text.includes("grow") ||
      text.includes("plant") ||
      text.includes("sow") ||
      text.includes("crop") ||
      text.includes("seed") ||
      text.includes("plants")
    ) {
      return {
        label: t.exploreCrops,
        action: onGrow,
      };
    }

    /*
     * PEST / DISEASE / CROP PROBLEM
     */
    if (
      text.includes("pest") ||
      text.includes("disease") ||
      text.includes("yellow") ||
      text.includes("spot") ||
      text.includes("problem") ||
      text.includes("healthy crop") ||
      text.includes("healthy crops")
    ) {
      return {
        label: t.checkProblem,
        action: onCropProblem,
      };
    }

    /*
     * MARKET / SELLING / BUYERS / HARVEST / STORAGE
     */
    if (
      text.includes("market") ||
      text.includes("sell") ||
      text.includes("buyer") ||
      text.includes("harvest") ||
      text.includes("storage") ||
      text.includes("store")
    ) {
      return {
        label: t.exploreMarket,
        action: onMarket,
      };
    }

    /*
     * FARM / SOIL / WATER / COMPOST / ORGANIC MATTER
     */
    if (
      text.includes("soil") ||
      text.includes("soil health") ||
      text.includes("fertilizer") ||
      text.includes("nutrient") ||
      text.includes("water") ||
      text.includes("irrigation") ||
      text.includes("irrigate") ||
      text.includes("compost") ||
      text.includes("organic matter")
    ) {
      return {
        label: t.openFarm,
        action: onMyFarm,
      };
    }

    /*
     * ORGANIC FARMING / NATURE / BIODIVERSITY / WASTE
     */
    if (
      text.includes("organic") ||
      text.includes("natural farming") ||
      text.includes("biodiversity") ||
      text.includes("work with nature") ||
      text.includes("support biodiversity") ||
      text.includes("reduce waste") ||
      text.includes("waste")
    ) {
      return {
        label: t.organic,
        action: onOrganic,
      };
    }

    /*
     * LEARNING
     */
    if (
      text.includes("learn") ||
      text.includes("how")
    ) {
      return {
        label: t.learn,
        action: onLearn,
      };
    }

    return null;
  };

  const speakResponse = (text) => {
    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = language;

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) return;

    const agrionResponse =
      getAgrionResponse(trimmedQuestion);

    const action = getAction(trimmedQuestion);

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        type: "user",
        text: trimmedQuestion,
      },
      {
        type: "assistant",
        text: agrionResponse,
        action,
      },
    ]);

    speakResponse(agrionResponse);

    setQuestion("");
  };

  const handleSuggestedQuestion = (suggestion) => {
    setQuestion(suggestion);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;

    setLanguage(newLanguage);

    localStorage.setItem(
      "agrionLanguage",
      newLanguage
    );
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );
      return;
    }

    if (isListening) {
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spokenText =
        event.results[0][0].transcript.trim();

      setQuestion((previousQuestion) =>
        previousQuestion
          ? `${previousQuestion} ${spokenText}`
          : spokenText
      );
    };

    recognition.onerror = (event) => {
      console.error(
        "Voice recognition error:",
        event.error
      );

      setIsListening(false);

      if (event.error === "not-allowed") {
        alert(
          "Microphone permission was denied. Please allow microphone access in your browser."
        );
      } else if (event.error === "no-speech") {
        alert(
          "I couldn't hear anything. Please try speaking again."
        );
      } else {
        alert(
          "Voice input could not be started. Please try again."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="ask-agrion-page">

      <header className="ask-navbar">

        <button
          type="button"
          className="ask-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="ask-logo">
          <span>🌱</span>

          <div>
            <strong>AGRION</strong>
            <small>From Seed to Market</small>
          </div>
        </div>

        <div className="ask-navbar-status">
          <span className="status-dot"></span>
          {t.assistant}
        </div>

        <select
          className="ask-language-select"
          value={language}
          onChange={handleLanguageChange}
          aria-label="Select language"
        >
          {LANGUAGES.map((item) => (
            <option
              key={item.code}
              value={item.code}
            >
              {item.name}
            </option>
          ))}
        </select>

      </header>

      <main className="ask-main">

        <section className="ask-hero">

          <div className="ask-hero-icon">
            🤖
          </div>

          <span className="ask-label">
            {t.label}
          </span>

          <h1>
            {t.title}
            <br />
            <span>{t.subtitle}</span>
          </h1>

          <p>{t.description}</p>

        </section>

        <section className="ask-chat-card">

          {messages.length === 0 && (
            <div className="ask-welcome">

              <div className="welcome-icon">
                🌾
              </div>

              <h2>{t.hello}</h2>

              <p>{t.welcome}</p>

            </div>
          )}

          {messages.length > 0 && (
            <div className="message-list">

              {messages.map(
                (message, index) => (

                  <div
                    key={`${message.type}-${index}`}
                    className={`message-row ${message.type}`}
                  >

                    {message.type ===
                      "assistant" && (
                      <div className="message-avatar">
                        🤖
                      </div>
                    )}

                    <div>

                      <div className="message-bubble">
                        {message.text}
                      </div>

                      {message.type ===
                        "assistant" &&
                        message.action &&
                        message.action.action && (
                          <button
                            type="button"
                            className="suggestion-button"
                            style={{
                              marginTop: "10px",
                            }}
                            onClick={
                              message.action.action
                            }
                          >
                            {message.action.label}
                          </button>
                        )}

                    </div>

                    {message.type ===
                      "user" && (
                      <div className="message-avatar user-avatar">
                        👨‍🌾
                      </div>
                    )}

                  </div>
                )
              )}

            </div>
          )}

          <div className="suggestions-section">

            <div className="suggestions-heading">
              <span>💡</span>
              <strong>{t.tryAsking}</strong>
            </div>

            <div className="suggestions-list">

              {suggestedQuestions.map(
                (suggestion) => (

                  <button
                    type="button"
                    key={suggestion}
                    className="suggestion-button"
                    onClick={() =>
                      handleSuggestedQuestion(
                        suggestion
                      )
                    }
                  >
                    <span>🌱</span>
                    {suggestion}
                  </button>

                )
              )}

            </div>

          </div>

          <div className="ask-input-area">

            <button
              type="button"
              className={`voice-button ${
                isListening
                  ? "listening"
                  : ""
              }`}
              onClick={handleVoiceInput}
              aria-label="Use voice"
              title={
                isListening
                  ? t.listening
                  : "Speak to AGRION"
              }
            >
              {isListening ? "🔴" : "🎤"}
            </button>

            <textarea
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder={
                isListening
                  ? t.listening
                  : t.placeholder
              }
              rows="1"
              aria-label="Ask AGRION a question"
            />

            <button
              type="button"
              className="send-button"
              onClick={handleSend}
              disabled={!question.trim()}
              aria-label="Send question"
            >
              ➤
            </button>

          </div>

          <p className="input-hint">
            {t.hint}
          </p>

        </section>

        <section className="ask-safety">

          <div className="safety-icon">
            ⚠️
          </div>

          <div>

            <strong>{t.safety}</strong>

            <p>{t.safetyText}</p>

          </div>

        </section>

      </main>

      <footer className="ask-footer">

        <strong>🌱 AGRION</strong>

        <p>From Seed to Market</p>

        <small>
          Growing knowledge. Growing possibilities.
        </small>

      </footer>

    </div>
  );
}

export default AskAgrion;