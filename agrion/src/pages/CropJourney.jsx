import { useEffect, useState } from "react";
import "./CropJourney.css";
import CropStageDetail from "./CropStageDetail";

import { getStoredLanguage } from "../data/languages";
import { getTranslations } from "../data/translations";

function CropJourney({ crop, onBack, onAsk }) {
  const [selectedStage, setSelectedStage] = useState(null);

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

  const cropData = {
    Wheat: {
      icon: "🌾",
      description:
        "Follow the important stages of growing wheat from seed selection to harvest and market.",
    },

    Maize: {
      icon: "🌽",
      description:
        "Learn the important steps for growing maize from planting to harvest and selling.",
    },

    Tomato: {
      icon: "🍅",
      description:
        "Understand tomato cultivation, crop care, harvesting and selling step by step.",
    },

    Potato: {
      icon: "🥔",
      description:
        "Learn how to grow potatoes, manage the crop and prepare your harvest for market.",
    },

    Onion: {
      icon: "🧅",
      description:
        "Follow the onion farming journey from seed or planting material to harvest and storage.",
    },

    Chilli: {
      icon: "🌶️",
      description:
        "Learn the important stages of chilli cultivation, crop care, harvest and selling.",
    },

    Cotton: {
      icon: "🌿",
      description:
        "Explore the cotton farming journey from seed selection through crop growth and harvest.",
    },
  };

  const data = cropData[crop] || {
    icon: "🌱",
    description:
      "Follow your crop journey from seed to harvest and market.",
  };

  const stages = [
    {
      number: 1,
      icon: "🌱",
      title: "Seed Selection",
      description:
        `Choose healthy, suitable ${crop.toLowerCase()} planting material for your region and farming conditions.`,
    },
    {
      number: 2,
      icon: "🌍",
      title: "Land Preparation",
      description:
        "Prepare the soil and field properly before planting to give the crop a healthy start.",
    },
    {
      number: 3,
      icon: "🌱",
      title: "Sowing / Planting",
      description:
        "Plant the crop using an appropriate method, spacing and timing.",
    },
    {
      number: 4,
      icon: "💧",
      title: "Water Management",
      description:
        "Manage irrigation carefully according to the crop, soil and weather conditions.",
    },
    {
      number: 5,
      icon: "🧪",
      title: "Nutrients",
      description:
        "Monitor soil fertility and provide nutrients based on crop requirements and proper guidance.",
    },
    {
      number: 6,
      icon: "🐛",
      title: "Weed, Pest & Disease",
      description:
        "Regularly monitor the crop and respond safely to weeds, pests and diseases.",
    },
    {
      number: 7,
      icon: "🌿",
      title: "Crop Growth",
      description:
        "Monitor plant development and maintain healthy crop conditions throughout the growing period.",
    },
    {
      number: 8,
      icon: "🌾",
      title: "Harvest",
      description:
        "Identify the appropriate harvest stage and harvest the crop carefully to reduce losses.",
    },
    {
      number: 9,
      icon: "🏠",
      title: "Storage",
      description:
        "Handle, dry and store harvested produce properly to protect quality and reduce losses.",
    },
    {
      number: 10,
      icon: "📊",
      title: "Market",
      description:
        "Understand available market options, current conditions and potential buyers.",
    },
    {
      number: 11,
      icon: "🤝",
      title: "Selling",
      description:
        "Compare selling options and choose a suitable way to connect with buyers.",
    },
  ];

  const translatedStageTitles = [
    t.seedSelection,
    t.landPreparation,
    t.sowingPlanting,
    t.waterManagement,
    t.nutrients,
    t.weedPestDisease,
    t.cropGrowth,
    t.harvest,
    t.storage,
    t.market,
    t.selling,
  ];

  const translatedStageDescriptions = [
    t.seedSelectionText,
    t.landPreparationText,
    t.sowingPlantingText,
    t.waterManagementText,
    t.nutrientsText,
    t.weedPestDiseaseText,
    t.cropGrowthText,
    t.harvestText,
    t.storageText,
    t.marketText,
    t.sellingText,
  ];

  const translatedStages = stages.map((stage, index) => ({
    ...stage,
    title:
      translatedStageTitles[index] ||
      stage.title,
    description:
      translatedStageDescriptions[index] ||
      stage.description,
  }));

  if (selectedStage) {
    return (
      <CropStageDetail
        crop={crop}
        stage={selectedStage}
        onBack={() => setSelectedStage(null)}
        onAsk={onAsk}
      />
    );
  }

  return (
    <div className="crop-journey-page">

      {/* NAVBAR */}

      <nav className="crop-journey-navbar">

        <button
          className="crop-journey-back"
          onClick={onBack}
        >
          ← {t.cropSelection || "Crop Selection"}
        </button>

        <div className="crop-journey-logo">
          🌱 <strong>AGRION</strong>
        </div>

        <button className="crop-journey-language">
          {t.appLanguage || "English"}
        </button>

      </nav>

      {/* HERO */}

      <section className="crop-journey-hero">

        <div className="crop-journey-hero-icon">
          {data.icon}
        </div>

        <p className="crop-journey-label">
          {t.cropJourney || "CROP JOURNEY"}
        </p>

        <h1>{crop}</h1>

        <p>
          {t.fromSeedToMarket}
        </p>

        <div className="crop-journey-hero-line"></div>

      </section>

      {/* INTRO */}

      <section className="crop-journey-intro">

        <p className="crop-journey-intro-label">
          {t.yourFarmingJourney || "YOUR"}{" "}
          {crop.toUpperCase()}{" "}
          {t.journey || "JOURNEY"}
        </p>

        <h2>
          {t.fromSeedMarket}
        </h2>

        <p>
          {data.description}
        </p>

        <div className="crop-journey-stats">

          <div>
            <strong>11</strong>
            <span>
              {t.stages || "Stages"}
            </span>
          </div>

          <div>
            <strong>
              {t.seed} → {t.harvest}
            </strong>
            <span>
              {t.growingJourney || "Growing Journey"}
            </span>
          </div>

          <div>
            <strong>
              {t.harvest} → {t.market}
            </strong>
            <span>
              {t.sellingJourney || "Selling Journey"}
            </span>
          </div>

        </div>

      </section>

      {/* STAGES */}

      <section className="crop-journey-container">

        {translatedStages.map((stage) => (

          <div
            className="crop-journey-stage"
            key={stage.number}
          >

            <div className="crop-stage-number">
              {stage.number}
            </div>

            <div className="crop-stage-icon">
              {stage.icon}
            </div>

            <div className="crop-stage-content">

              <h3>
                {stage.title}
              </h3>

              <p>
                {stage.description}
              </p>

              <button
                onClick={() => setSelectedStage(stage)}
              >
                {t.exploreThisStage || "Explore this stage"} →
              </button>

            </div>

          </div>

        ))}

      </section>

      {/* CTA */}

      <section className="crop-journey-cta">

        <div>

          <p>
            {t.haveAQuestion || "HAVE A QUESTION?"}
          </p>

          <h2>
            {t.notSureNext || "Not sure what to do next?"}
          </h2>

          <span>
            {t.askAgrionForCrop ||
              "Ask AGRION and get help with your"}{" "}
            {crop.toLowerCase()}{" "}
            {t.crop || "crop"}.
          </span>

        </div>

        <button onClick={onAsk}>
          💬 {t.askAgrion}
        </button>

      </section>

      {/* FOOTER */}

      <footer className="crop-journey-footer">

        <strong>
          🌱 AGRION
        </strong>

        <p>
          {t.fromSeedToMarket}
        </p>

        <small>
          {t.helpingFarmers ||
            "Helping farmers grow smarter and sell better."}
        </small>

      </footer>

    </div>
  );
}

export default CropJourney;