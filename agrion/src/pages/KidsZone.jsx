import { useState } from "react";
import "./KidsZone.css";

function KidsZone({ onBack, onAsk }) {
  const [activeStep, setActiveStep] = useState(0);

  const journey = [
    {
      number: 1,
      icon: "🌱",
      title: "A Seed",
      shortTitle: "Plant",
      color: "green",
      description:
        "Every farming journey begins with a tiny seed. Farmers choose suitable seeds and plant them in prepared soil.",
      fact: "A tiny seed can grow into a plant that gives us food!",
    },
    {
      number: 2,
      icon: "🚜",
      title: "The Farm",
      shortTitle: "Farm",
      color: "brown",
      description:
        "Farmers prepare the land so plants have the right place to grow. Soil, sunlight and air all help plants.",
      fact: "Healthy soil is an important part of a healthy farm.",
    },
    {
      number: 3,
      icon: "💧",
      title: "Water",
      shortTitle: "Water",
      color: "blue",
      description:
        "Plants need water to grow. Farmers carefully manage water so crops get what they need.",
      fact: "Water helps plants move nutrients and stay healthy.",
    },
    {
      number: 4,
      icon: "🌿",
      title: "Growing",
      shortTitle: "Grow",
      color: "green",
      description:
        "With sunlight, water, nutrients and care, the little plant grows bigger and stronger.",
      fact: "Plants use sunlight to make their own food through photosynthesis.",
    },
    {
      number: 5,
      icon: "🌾",
      title: "Harvest",
      shortTitle: "Harvest",
      color: "gold",
      description:
        "When the crop is ready, farmers harvest it. This is an exciting moment after months of care.",
      fact: "Different crops are harvested at different times.",
    },
    {
      number: 6,
      icon: "🏭",
      title: "Processing",
      shortTitle: "Process",
      color: "purple",
      description:
        "Some crops are cleaned, sorted, processed or packed before they reach shops and homes.",
      fact: "Rice, flour and many other foods can go through processing.",
    },
    {
      number: 7,
      icon: "🚚",
      title: "Transport",
      shortTitle: "Travel",
      color: "orange",
      description:
        "Food travels from farms and processing centres to markets, shops and other places.",
      fact: "Transportation helps food travel from where it is grown to where people live.",
    },
    {
      number: 8,
      icon: "🛒",
      title: "The Shop",
      shortTitle: "Shop",
      color: "blue",
      description:
        "Food can reach local markets, shops and other places where people can buy it.",
      fact: "The food you see in a shop may have travelled a long journey.",
    },
    {
      number: 9,
      icon: "🍽️",
      title: "Our Plate",
      shortTitle: "Eat",
      color: "red",
      description:
        "Finally, food reaches our homes and plates. Farmers help make this journey possible.",
      fact: "The food on our plate connects us to farmers and nature.",
    },
    {
      number: 10,
      icon: "❤️",
      title: "Don't Waste Food",
      shortTitle: "Care",
      color: "green",
      description:
        "Food takes water, land, energy, time and hard work to produce. We should take only what we need.",
      fact: "One simple way to help is to take smaller portions and finish the food we take.",
    },
  ];

  const currentStep = journey[activeStep];

  const handleNext = () => {
    setActiveStep((current) =>
      current < journey.length - 1 ? current + 1 : 0
    );
  };

  const handlePrevious = () => {
    setActiveStep((current) =>
      current > 0 ? current - 1 : journey.length - 1
    );
  };

  const handleAskAGRION = () => {
    if (onAsk) {
      onAsk();
    }
  };

  return (
    <div className="kids-page">
      {/* NAVBAR */}
      <header className="kids-navbar">
        <button
          type="button"
          className="kids-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="kids-logo">
          <div className="kids-logo-icon">🌱</div>

          <div className="kids-logo-text">
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>
        </div>

        <div className="kids-zone-badge">
          🧒 Kids Zone
        </div>
      </header>

      <main className="kids-main">
        {/* HERO */}
        <section className="kids-hero">
          <div className="kids-hero-content">
            <span className="kids-hero-label">
              🌈 AGRION KIDS ZONE
            </span>

            <h1>
              Where does our
              <br />
              <span>food come from?</span>
            </h1>

            <p>
              Come on an adventure and discover how a tiny seed can become
              food on our plate!
            </p>

            <button
              type="button"
              className="kids-start-button"
              onClick={() =>
                document
                  .getElementById("kids-journey")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              🚀 Start the Adventure
            </button>
          </div>

          <div className="kids-hero-scene">
            <div className="kids-sun">☀️</div>
            <div className="kids-cloud cloud-one">☁️</div>
            <div className="kids-cloud cloud-two">☁️</div>

            <div className="kids-farm-ground">
              <span>🌱</span>
              <span>🌿</span>
              <span>🌱</span>
              <span>🌾</span>
              <span>🌱</span>
            </div>

            <div className="kids-farmer">🧑‍🌾</div>

            <div className="kids-hero-sign">
              <span>OUR FOOD</span>
              <strong>🌱 → 🍽️</strong>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="kids-intro">
          <div className="kids-intro-icon">🔎</div>

          <div>
            <span>LET'S DISCOVER</span>
            <h2>Food has a story!</h2>
            <p>
              Before food reaches our plate, many people and many steps are
              involved. Let's follow the journey together.
            </p>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="kids-journey" className="kids-journey">
          <div className="kids-section-heading">
            <span>🌱 THE BIG JOURNEY</span>
            <h2>From seed to plate</h2>
            <p>
              Tap a step to discover what happens along the way.
            </p>
          </div>

          {/* JOURNEY NAVIGATION */}
          <div className="kids-step-navigation">
            {journey.map((step, index) => (
              <button
                type="button"
                key={step.number}
                className={
                  activeStep === index
                    ? "kids-step-button active"
                    : "kids-step-button"
                }
                onClick={() => setActiveStep(index)}
                aria-label={`Step ${step.number}: ${step.title}`}
              >
                <span>{step.icon}</span>
                <small>{step.number}</small>
              </button>
            ))}
          </div>

          {/* CURRENT STEP */}
          <article
            className={`kids-story-card ${currentStep.color}`}
          >
            <div className="kids-story-illustration">
              <div className="kids-story-circle">
                {currentStep.icon}
              </div>

              <span className="kids-story-number">
                STEP {currentStep.number}
              </span>
            </div>

            <div className="kids-story-content">
              <span className="kids-story-label">
                {currentStep.shortTitle}
              </span>

              <h3>{currentStep.title}</h3>

              <p>{currentStep.description}</p>

              <div className="kids-fun-fact">
                <span>💡</span>
                <div>
                  <strong>Fun fact</strong>
                  <p>{currentStep.fact}</p>
                </div>
              </div>

              <div className="kids-story-controls">
                <button
                  type="button"
                  onClick={handlePrevious}
                >
                  ← Previous
                </button>

                <span>
                  {currentStep.number} / {journey.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                >
                  {activeStep === journey.length - 1
                    ? "Start Again ↻"
                    : "Next →"}
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* VISUAL FLOW */}
        <section className="kids-flow">
          <div className="kids-section-heading">
            <span>🗺️ SEE THE WHOLE JOURNEY</span>
            <h2>Every step is connected</h2>
          </div>

          <div className="kids-flow-grid">
            {journey.map((step, index) => (
              <button
                type="button"
                key={step.number}
                className={
                  activeStep === index
                    ? "kids-flow-card active"
                    : "kids-flow-card"
                }
                onClick={() => {
                  setActiveStep(index);
                  document
                    .getElementById("kids-journey")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>{step.icon}</span>
                <strong>{step.title}</strong>
                <small>Step {step.number}</small>
              </button>
            ))}
          </div>
        </section>

        {/* FARMERS MESSAGE */}
        <section className="kids-farmer-message">
          <div className="kids-farmer-message-art">
            👩‍🌾🌾
          </div>

          <div>
            <span>THANK YOU, FARMERS</span>

            <h2>
              Every meal has a farmer behind it.
            </h2>

            <p>
              Farmers work with soil, water, plants, animals, weather and
              nature to help produce the food we eat.
            </p>
          </div>
        </section>

        {/* FOOD WASTE */}
        <section className="kids-waste">
          <div className="kids-waste-art">
            🍚
            <span>❤️</span>
          </div>

          <div>
            <span>ONE IMPORTANT LESSON</span>

            <h2>Let's not waste food.</h2>

            <p>
              Food is precious. It takes farmers, water, land, energy and
              many people to bring food to us.
            </p>

            <div className="kids-good-habits">
              <div>
                <span>🥄</span>
                <strong>Take what you need</strong>
              </div>

              <div>
                <span>🍽️</span>
                <strong>Finish what you take</strong>
              </div>

              <div>
                <span>🤝</span>
                <strong>Share when you can</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ASK AGRION */}
        <section className="kids-ask">
          <div className="kids-ask-icon">🤖</div>

          <div>
            <span>CURIOUS?</span>
            <h2>Ask AGRION!</h2>
            <p>
              Have a question about plants, farms, food or nature?
            </p>
          </div>

          <button type="button" onClick={handleAskAGRION}>
            Ask AGRION →
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="kids-footer">
        <strong>🌱 AGRION</strong>
        <p>From Seed to Market</p>
        <small>
          Learn about farming. Love food. Respect farmers. ❤️
        </small>
      </footer>
    </div>
  );
}

export default KidsZone;