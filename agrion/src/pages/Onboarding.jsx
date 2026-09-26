import { useState } from "react";
import "./Onboarding.css";

function Onboarding({
  role,
  initialData,
  onBack,
  onComplete,
}) {
  const [step, setStep] = useState(1);

  const [language, setLanguage] = useState(
    initialData?.language || ""
  );

  const [location, setLocation] = useState(
    initialData?.location || ""
  );

  const [farmSize, setFarmSize] = useState(
    initialData?.farmSize || ""
  );

  const [experience, setExperience] = useState(
    initialData?.experience || ""
  );

  const [interest, setInterest] = useState(
    initialData?.interest || ""
  );

  const [goal, setGoal] = useState(
    initialData?.goal || ""
  );

  const [error, setError] = useState("");

  const isFarmer = role === "farmer";

  const languages = [
    "English",
    "Hindi",
    "Kannada",
    "Telugu",
    "Tamil",
    "Malayalam",
    "Marathi",
    "Bengali",
  ];

  const farmerGoals = [
    {
      id: "grow",
      icon: "🌱",
      title: "Grow better",
      text: "Improve my crop and farming decisions.",
    },
    {
      id: "problems",
      icon: "🔍",
      title: "Solve crop problems",
      text: "Understand crop pests, diseases and problems.",
    },
    {
      id: "sell",
      icon: "🛒",
      title: "Sell better",
      text: "Find better markets and buyers.",
    },
    {
      id: "manage",
      icon: "📊",
      title: "Manage my farm",
      text: "Track my farm, costs and activities.",
    },
  ];

  const learnerGoals = [
    {
      id: "agriculture",
      icon: "🌾",
      title: "Learn agriculture",
      text: "Build practical agriculture knowledge.",
    },
    {
      id: "technology",
      icon: "🤖",
      title: "Learn technology",
      text: "Explore AI, data and smart farming.",
    },
    {
      id: "projects",
      icon: "💡",
      title: "Build projects",
      text: "Work on real-world agriculture projects.",
    },
    {
      id: "career",
      icon: "🚀",
      title: "Build my career",
      text: "Prepare for future opportunities.",
    },
  ];

  const goals = isFarmer
    ? farmerGoals
    : learnerGoals;

  const handleNext = () => {
    setError("");

    if (step === 1 && !language) {
      setError(
        "Please choose your preferred language."
      );
      return;
    }

    if (step === 2 && !location.trim()) {
      setError(
        "Please enter your city, district or state."
      );
      return;
    }

    if (step === 3) {
      if (isFarmer) {
        if (!farmSize) {
          setError("Please choose your farm size.");
          return;
        }

        if (!experience) {
          setError(
            "Please choose your farming experience."
          );
          return;
        }
      } else if (!interest) {
        setError(
          "Please choose an area you are interested in."
        );
        return;
      }
    }

    if (step < 4) {
      setStep((current) => current + 1);
      return;
    }

    if (!goal) {
      setError(
        "Please choose your main goal."
      );
      return;
    }

    const onboardingData = {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",

      role,

      language,

      location: location.trim(),

      farmSize: isFarmer
        ? farmSize
        : "",

      experience: isFarmer
        ? experience
        : "",

      interest: isFarmer
        ? ""
        : interest,

      goal,

      onboardingCompleted: true,
      onboardingCompletedAt:
        new Date().toISOString(),
    };

    if (onComplete) {
      onComplete(onboardingData);
    }
  };

  const handleBack = () => {
    setError("");

    if (step > 1) {
      setStep((current) => current - 1);
      return;
    }

    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="onboarding-page">

      <div className="onboarding-background onboarding-bg-one"></div>
      <div className="onboarding-background onboarding-bg-two"></div>

      <main className="onboarding-container">

        <section className="onboarding-card">

          <div className="onboarding-top">
            <button
              className="onboarding-back"
              type="button"
              onClick={handleBack}
            >
              ← Back
            </button>

            <span>
              Step {step} of 4
            </span>
          </div>

          <div className="onboarding-progress">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={
                  item <= step
                    ? "onboarding-progress-bar active"
                    : "onboarding-progress-bar"
                }
              ></div>
            ))}
          </div>

          <div className="onboarding-brand">
            <div className="onboarding-logo">
              🌱
            </div>

            <div>
              <strong>AGRION</strong>
              <span>From Seed to Market</span>
            </div>
          </div>

          {step === 1 && (
            <div className="onboarding-content">

              <div className="onboarding-main-icon">
                🌍
              </div>

              <span className="onboarding-label">
                LET'S PERSONALIZE AGRION
              </span>

              <h1>
                Which language are you most comfortable with?
              </h1>

              <p>
                AGRION will use your preferred language
                throughout your experience.
              </p>

              <div className="onboarding-language-grid">
                {languages.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      language === item
                        ? "onboarding-language selected"
                        : "onboarding-language"
                    }
                    onClick={() => {
                      setLanguage(item);
                      setError("");
                    }}
                  >
                    <span>
                      {item === "English"
                        ? "🇬🇧"
                        : "🗣️"}
                    </span>

                    {item}

                    {language === item && (
                      <b>✓</b>
                    )}
                  </button>
                ))}
              </div>

            </div>
          )}

          {step === 2 && (
            <div className="onboarding-content">

              <div className="onboarding-main-icon">
                📍
              </div>

              <span className="onboarding-label">
                YOUR LOCATION
              </span>

              <h1>
                Where are you located?
              </h1>

              <p>
                This helps AGRION provide more relevant
                local farming, weather and market features.
              </p>

              <div className="onboarding-field">
                <label htmlFor="onboarding-location">
                  City, district or state
                </label>

                <div className="onboarding-input">
                  <span>📍</span>

                  <input
                    id="onboarding-location"
                    type="text"
                    placeholder="Example: Bengaluru, Karnataka"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    autoComplete="address-level2"
                  />
                </div>

                <small>
                  You can provide a broad location. Precise
                  location is not required.
                </small>
              </div>

              <div className="onboarding-info">
                🔐 AGRION will only use location information
                for relevant features.
              </div>

            </div>
          )}

          {step === 3 && isFarmer && (
            <div className="onboarding-content">

              <div className="onboarding-main-icon">
                🚜
              </div>

              <span className="onboarding-label">
                YOUR FARM
              </span>

              <h1>
                Help AGRION understand your farm
              </h1>

              <p>
                You can update these details later as your
                farming situation changes.
              </p>

              <div className="onboarding-question">
                <label>
                  How much land do you farm?
                </label>

                <div className="onboarding-pills">
                  {[
                    "Less than 1 acre",
                    "1–5 acres",
                    "5–10 acres",
                    "More than 10 acres",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={
                        farmSize === item
                          ? "onboarding-pill selected"
                          : "onboarding-pill"
                      }
                      onClick={() => {
                        setFarmSize(item);
                        setError("");
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="onboarding-question">
                <label>
                  How much farming experience do you have?
                </label>

                <div className="onboarding-pills">
                  {[
                    "Just starting",
                    "1–5 years",
                    "5–10 years",
                    "10+ years",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={
                        experience === item
                          ? "onboarding-pill selected"
                          : "onboarding-pill"
                      }
                      onClick={() => {
                        setExperience(item);
                        setError("");
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {step === 3 && !isFarmer && (
            <div className="onboarding-content">

              <div className="onboarding-main-icon">
                🎓
              </div>

              <span className="onboarding-label">
                YOUR INTEREST
              </span>

              <h1>
                What interests you most?
              </h1>

              <p>
                AGRION will personalize your learning
                experience around your interests.
              </p>

              <div className="onboarding-interest-grid">

                {[
                  {
                    id: "agriculture",
                    icon: "🌾",
                    title: "Agriculture",
                  },
                  {
                    id: "data",
                    icon: "📊",
                    title: "Data & Analytics",
                  },
                  {
                    id: "ai",
                    icon: "🤖",
                    title: "AI & Technology",
                  },
                  {
                    id: "sustainability",
                    icon: "🌿",
                    title: "Sustainability",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      interest === item.id
                        ? "onboarding-interest selected"
                        : "onboarding-interest"
                    }
                    onClick={() => {
                      setInterest(item.id);
                      setError("");
                    }}
                  >
                    <span>{item.icon}</span>
                    <strong>{item.title}</strong>

                    {interest === item.id && (
                      <b>✓</b>
                    )}
                  </button>
                ))}

              </div>

            </div>
          )}

          {step === 4 && (
            <div className="onboarding-content">

              <div className="onboarding-main-icon">
                🎯
              </div>

              <span className="onboarding-label">
                YOUR MAIN GOAL
              </span>

              <h1>
                What should AGRION help you achieve?
              </h1>

              <p>
                Choose what is most important to you right
                now. You can use every AGRION feature later.
              </p>

              <div className="onboarding-goals">

                {goals.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      goal === item.id
                        ? "onboarding-goal selected"
                        : "onboarding-goal"
                    }
                    onClick={() => {
                      setGoal(item.id);
                      setError("");
                    }}
                  >
                    <div className="onboarding-goal-icon">
                      {item.icon}
                    </div>

                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </div>

                    {goal === item.id && (
                      <span className="onboarding-check">
                        ✓
                      </span>
                    )}
                  </button>
                ))}

              </div>

            </div>
          )}

          {error && (
            <div className="onboarding-error">
              ⚠️ {error}
            </div>
          )}

          <button
            className="onboarding-continue"
            type="button"
            onClick={handleNext}
          >
            {step === 4
              ? "Enter AGRION"
              : "Continue"}

            <span>→</span>
          </button>

          <p className="onboarding-security">
            🔐 AGRION asks only for information needed to
            personalize your experience.
          </p>

        </section>
      </main>
    </div>
  );
}

export default Onboarding;