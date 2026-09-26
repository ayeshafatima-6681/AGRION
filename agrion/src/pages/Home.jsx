import { useEffect, useState } from "react";
import "./Home.css";

import {
  getStoredLanguage,
} from "../data/languages";

import {
  getTranslations,
} from "../data/translations";

function Home({
  onGrow,
  onCropProblem,
  onAsk,
  onMyFarm,
  onCommunity,
  onMarket,
  onLearn,
  onKids,
  onOrganic,
  onProfile,
}) {
  const [language, setLanguage] = useState(
    getStoredLanguage()
  );

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLanguage = event.detail?.language;

      if (newLanguage) {
        setLanguage(newLanguage);
      }
    };

    window.addEventListener(
      "agrionLanguageChanged",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener(
        "agrionLanguageChanged",
        handleLanguageChange
      );
    };
  }, []);

  const t = getTranslations(language);

  /*
   * HOME FEATURE CARDS
   */
  const features = [
    {
      icon: "🌱",
      title: t.wantToGrow,
      text: t.wantToGrowText,
      action: t.exploreCrops,
      onClick: onGrow,
      featured: true,
    },
    {
      icon: "🔍",
      title: t.cropHasProblem,
      text: t.cropHasProblemText,
      action: t.checkCrop,
      onClick: onCropProblem,
    },
    {
      icon: "🤖",
      title: t.askAgrion,
      text: t.askAgrionText,
      action: t.askNow,
      onClick: onAsk,
    },
    {
      icon: "🚜",
      title: t.myFarm,
      text: t.myFarmText,
      action: t.openMyFarm,
      onClick: onMyFarm,
    },
    {
      icon: "👥",
      title: t.farmerCommunity,
      text: t.farmerCommunityText,
      action: t.joinCommunity,
      onClick: onCommunity,
    },
    {
      icon: "🛒",
      title: t.wantToSell,
      text: t.wantToSellText,
      action: t.exploreMarkets,
      onClick: onMarket,
    },
    {
      icon: "📚",
      title: t.learn,
      text: t.learnText,
      action: t.startLearning,
      onClick: onLearn,
    },
    {
      icon: "🧒",
      title: t.kidsZone,
      text: t.kidsZoneText,
      action: t.enterKidsZone,
      onClick: onKids,
    },
    {
      icon: "🌿",
      title: t.organicFarming,
      text: t.organicFarmingText,
      action: t.exploreOrganic,
      onClick: onOrganic,
    },
  ];

  /*
   * FARMING JOURNEY NAVIGATION
   *
   * Seed/Grow -> Crop Selection
   * Manage -> My Farm
   * Harvest -> Market
   * Market -> Sell / Market
   */
  const handleJourneyStep = (step) => {
    switch (step) {
      case "seed":
        if (onGrow) {
          onGrow();
        }
        break;

      case "grow":
        if (onGrow) {
          onGrow();
        }
        break;

      case "manage":
        if (onMyFarm) {
          onMyFarm();
        }
        break;

      case "harvest":
        if (onMarket) {
          onMarket();
        }
        break;

      case "market":
        if (onMarket) {
          onMarket();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <header className="home-navbar">

        <button
          className="home-brand"
          type="button"
          onClick={() =>
            window.scrollTo(0, 0)
          }
        >
          <span className="home-logo">
            🌱
          </span>

          <span className="home-brand-text">
            <strong>AGRION</strong>
            <small>{t.tagline}</small>
          </span>
        </button>

        <nav className="home-nav">

          <button
            className="active"
            type="button"
            onClick={() =>
              window.scrollTo(0, 0)
            }
          >
            {t.home}
          </button>

          <button
            type="button"
            onClick={onGrow}
          >
            {t.grow}
          </button>

          <button
            type="button"
            onClick={onAsk}
          >
            {t.askAgrion}
          </button>

          <button
            type="button"
            onClick={onCommunity}
          >
            {t.community}
          </button>

          <button
            type="button"
            onClick={onMyFarm}
          >
            {t.myFarm}
          </button>

        </nav>

        <button
          className="home-profile-button"
          type="button"
          onClick={onProfile}
          aria-label={t.profile}
        >
          👤
        </button>

      </header>

      <main>

        {/* HERO */}
        <section className="home-hero">

          <div className="hero-background-shape hero-shape-one" />
          <div className="hero-background-shape hero-shape-two" />

          <div className="home-hero-content">

            <div className="hero-label">
              <span>🌾</span>
              {t.smartFarming}
              <b>•</b>
              {t.betterFuture}
            </div>

            <h1>
              {t.fromSeed}
              <br />
              <span>{t.toMarket}</span>
            </h1>

            <p>
              {t.homeHeroText}
            </p>

            <div className="hero-buttons">

              <button
                className="hero-primary-button"
                type="button"
                onClick={onGrow}
              >
                <span>🌱</span>
                {t.wantToGrow}
                <b>→</b>
              </button>

              <button
                className="hero-secondary-button"
                type="button"
                onClick={onAsk}
              >
                <span>💬</span>
                {t.talkToAgrion}
              </button>

            </div>

            <div className="hero-trust">

              <span>✓</span>
              {t.simple}

              <span>✓</span>
              {t.farmerFocused}

              <span>✓</span>
              {t.builtForJourney}

            </div>

          </div>

          {/* HERO VISUAL */}
          <div className="home-hero-visual">

            <div className="hero-glow" />

            <div className="hero-sun">☀️</div>
            <div className="hero-cloud cloud-one">☁️</div>
            <div className="hero-cloud cloud-two">☁️</div>

            <div className="hero-field-back" />
            <div className="hero-field-front" />

            <div className="hero-mountain mountain-one" />
            <div className="hero-mountain mountain-two" />

            <div className="hero-house">🏡</div>
            <div className="hero-farmer">👨‍🌾</div>

            <div className="hero-crop-row crop-row-one">
              🌱 🌾 🌱 🌾 🌱
            </div>

            <div className="hero-crop-row crop-row-two">
              🌱 🌾 🌱 🌾 🌱 🌾
            </div>

            <div className="floating-card floating-card-one">

              <span>🌱</span>

              <div>
                <strong>
                  {t.growSmarter}
                </strong>

                <small>
                  {t.betterFarmingDecisions}
                </small>
              </div>

            </div>

            <div className="floating-card floating-card-two">

              <span>💧</span>

              <div>
                <strong>
                  {t.manageBetter}
                </strong>

                <small>
                  {t.careForEveryCrop}
                </small>
              </div>

            </div>

            <div className="floating-card floating-card-three">

              <span>🛒</span>

              <div>
                <strong>
                  {t.sellBetter}
                </strong>

                <small>
                  {t.reachRightMarket}
                </small>
              </div>

            </div>

            <div className="hero-journey-card">

              <div className="journey-mini-icon">
                🌾
              </div>

              <div>
                <small>
                  {t.yourFarmingJourney}
                </small>

                <strong>
                  {t.seedGrowMarket}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* FEATURES */}
        <section className="features-section">

          <div className="section-heading">

            <div>

              <span>
                {t.whatCanAgrionDo}
              </span>

              <h2>
                {t.everythingFarmerNeeds}
                <br />
                <em>{t.inOnePlace}</em>
              </h2>

            </div>

            <p>
              {t.chooseHelp}
            </p>

          </div>

          <div className="feature-grid">

            {features.map((feature, index) => (

              <button
                key={feature.title}
                className={`feature-card ${
                  feature.featured
                    ? "feature-card-featured"
                    : ""
                }`}
                type="button"
                onClick={feature.onClick}
              >

                <div className="feature-card-top">

                  <span className="feature-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="feature-arrow">
                    ↗
                  </span>

                </div>

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

                <span className="feature-action">
                  {feature.action}
                </span>

              </button>

            ))}

          </div>

        </section>

        {/* FARMING JOURNEY */}
        <section className="journey-section">

          <div className="journey-heading">

            <span>
              {t.agrionJourney}
            </span>

            <h2>
              {t.from}{" "}
              <em>{t.seed}</em>{" "}
              {t.to} {t.market}
            </h2>

            <p>
              {t.connectedJourney}
            </p>

          </div>

          <div className="journey-flow">

            <div className="journey-line" />

            {/* SEED */}
            <button
              type="button"
              className="journey-step"
              onClick={() =>
                handleJourneyStep("seed")
              }
              aria-label="Start from seed"
            >
              <div className="journey-icon">
                🌱
              </div>

              <strong>{t.seed}</strong>
              <small>{t.start}</small>
            </button>

            <div className="journey-connector">
              →
            </div>

            {/* GROW */}
            <button
              type="button"
              className="journey-step"
              onClick={() =>
                handleJourneyStep("grow")
              }
              aria-label="Continue growing crop"
            >
              <div className="journey-icon">
                🌾
              </div>

              <strong>{t.grow}</strong>
              <small>{t.build}</small>
            </button>

            <div className="journey-connector">
              →
            </div>

            {/* MANAGE */}
            <button
              type="button"
              className="journey-step"
              onClick={() =>
                handleJourneyStep("manage")
              }
              aria-label="Manage your farm"
            >
              <div className="journey-icon">
                💧
              </div>

              <strong>{t.manage}</strong>
              <small>{t.care}</small>
            </button>

            <div className="journey-connector">
              →
            </div>

            {/* HARVEST */}
            <button
              type="button"
              className="journey-step"
              onClick={() =>
                handleJourneyStep("harvest")
              }
              aria-label="Go to harvest and market"
            >
              <div className="journey-icon">
                🌾
              </div>

              <strong>{t.harvest}</strong>
              <small>{t.produce}</small>
            </button>

            <div className="journey-connector">
              →
            </div>

            {/* MARKET */}
            <button
              type="button"
              className="journey-step"
              onClick={() =>
                handleJourneyStep("market")
              }
              aria-label="Go to market and sell"
            >
              <div className="journey-icon">
                🛒
              </div>

              <strong>{t.market}</strong>
              <small>{t.sell}</small>
            </button>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="footer-brand">

          <span className="footer-logo">
            🌱
          </span>

          <div>
            <strong>AGRION</strong>
            <small>{t.tagline}</small>
          </div>

        </div>

        <p>
          {t.footerText}
        </p>

        <span className="footer-copy">
          {t.footerCopyright}
        </span>

      </footer>

    </div>
  );
}

export default Home;