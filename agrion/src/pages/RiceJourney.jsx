import { useState } from "react";
import "./RiceJourney.css";
import CropStageDetail from "./CropStageDetail";

function RiceJourney({ onBack, onAsk }) {
  const [selectedStage, setSelectedStage] = useState(null);

  const stages = [
    {
      number: 1,
      icon: "🌱",
      title: "Seed Selection",
      description:
        "Choose suitable, quality rice planting material for your region and farming conditions.",
    },
    {
      number: 2,
      icon: "🌍",
      title: "Land Preparation",
      description:
        "Prepare the soil and field properly before planting to give the rice crop a healthy start.",
    },
    {
      number: 3,
      icon: "🌱",
      title: "Sowing / Planting",
      description:
        "Establish the rice crop using a suitable planting method, spacing and timing.",
    },
    {
      number: 4,
      icon: "💧",
      title: "Water Management",
      description:
        "Manage water carefully according to the rice crop, soil and local weather conditions.",
    },
    {
      number: 5,
      icon: "🧪",
      title: "Nutrients",
      description:
        "Monitor soil fertility and provide nutrients according to crop requirements and proper guidance.",
    },
    {
      number: 6,
      icon: "🐛",
      title: "Weed, Pest & Disease",
      description:
        "Regularly monitor the rice crop and respond safely to weeds, pests and diseases.",
    },
    {
      number: 7,
      icon: "🌿",
      title: "Crop Growth",
      description:
        "Monitor rice plant development and maintain healthy crop conditions throughout the growing period.",
    },
    {
      number: 8,
      icon: "🌾",
      title: "Harvest",
      description:
        "Identify the appropriate harvest stage and harvest rice carefully to reduce losses.",
    },
    {
      number: 9,
      icon: "🏠",
      title: "Storage",
      description:
        "Handle, dry and store harvested rice properly to protect quality and reduce losses.",
    },
    {
      number: 10,
      icon: "📊",
      title: "Market",
      description:
        "Understand available rice market options, current conditions and potential buyers.",
    },
    {
      number: 11,
      icon: "🤝",
      title: "Selling",
      description:
        "Compare selling options and choose a suitable way to connect with rice buyers.",
    },
  ];

  if (selectedStage) {
    return (
      <CropStageDetail
        crop="Rice"
        stage={selectedStage}
        onBack={() => setSelectedStage(null)}
        onAsk={onAsk}
      />
    );
  }

  return (
    <div className="rice-journey-page">
      <nav className="rice-journey-navbar">
        <button className="rice-journey-back" onClick={onBack}>
          ← Crop Selection
        </button>

        <div className="rice-journey-logo">
          🌱 <strong>AGRION</strong>
        </div>

        <button className="rice-journey-language">
          English
        </button>
      </nav>

      <section className="rice-journey-hero">
        <div className="rice-journey-hero-icon">
          🌾
        </div>

        <p className="rice-journey-label">
          CROP JOURNEY
        </p>

        <h1>Rice</h1>

        <p>From seed to market</p>

        <div className="rice-journey-hero-line"></div>
      </section>

      <section className="rice-journey-intro">
        <p className="rice-journey-intro-label">
          YOUR RICE JOURNEY
        </p>

        <h2>From Seed to Market</h2>

        <p>
          Follow the important stages of growing rice,
          managing the crop, harvesting it and preparing
          it for the market.
        </p>

        <div className="rice-journey-stats">
          <div>
            <strong>11</strong>
            <span>Stages</span>
          </div>

          <div>
            <strong>Seed → Harvest</strong>
            <span>Growing Journey</span>
          </div>

          <div>
            <strong>Harvest → Market</strong>
            <span>Selling Journey</span>
          </div>
        </div>
      </section>

      <section className="rice-journey-container">
        {stages.map((stage) => (
          <div
            className="rice-journey-stage"
            key={stage.number}
          >
            <div className="rice-stage-number">
              {stage.number}
            </div>

            <div className="rice-stage-icon">
              {stage.icon}
            </div>

            <div className="rice-stage-content">
              <h3>{stage.title}</h3>

              <p>{stage.description}</p>

              <button
                onClick={() => setSelectedStage(stage)}
              >
                Explore this stage →
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="rice-journey-cta">
        <div>
          <p>HAVE A QUESTION?</p>

          <h2>Not sure what to do next?</h2>

          <span>
            Ask AGRION and get help with your rice crop.
          </span>
        </div>

        <button onClick={onAsk}>
          💬 Ask AGRION
        </button>
      </section>

      <footer className="rice-journey-footer">
        <strong>🌱 AGRION</strong>

        <p>From Seed to Market</p>

        <small>
          Helping farmers grow smarter and sell better.
        </small>
      </footer>
    </div>
  );
}

export default RiceJourney;