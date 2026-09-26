import { useState } from "react";
import "./OrganicFarming.css";

function OrganicFarming({ onBack, onAsk }) {
  const [activeTopic, setActiveTopic] = useState("All");

  const topics = [
    {
      id: 1,
      icon: "🌱",
      category: "Basics",
      title: "What Is Organic Farming?",
      description:
        "Learn the basic idea behind organic farming and how it focuses on working with natural systems.",
    },
    {
      id: 2,
      icon: "🌍",
      category: "Soil",
      title: "Healthy Soil",
      description:
        "Understand why soil health matters and how organic practices can support soil life and structure.",
    },
    {
      id: 3,
      icon: "♻️",
      category: "Soil",
      title: "Compost & Natural Nutrients",
      description:
        "Discover composting and other approaches used to return organic matter and nutrients to the soil.",
    },
    {
      id: 4,
      icon: "🐝",
      category: "Nature",
      title: "Biodiversity",
      description:
        "Learn how plants, insects, microorganisms and other living things can be part of a healthy farm ecosystem.",
    },
    {
      id: 5,
      icon: "🐛",
      category: "Crop Care",
      title: "Natural Pest Management",
      description:
        "Explore monitoring, prevention and non-chemical approaches that may help manage crop problems.",
    },
    {
      id: 6,
      icon: "💧",
      category: "Water",
      title: "Water Management",
      description:
        "Learn why careful water management is important for sustainable farming and healthy crops.",
    },
    {
      id: 7,
      icon: "🌾",
      category: "Crop Care",
      title: "Crop Rotation",
      description:
        "Understand how changing crops over seasons can be used as part of a broader soil and crop management strategy.",
    },
    {
      id: 8,
      icon: "🧺",
      category: "Harvest",
      title: "Harvest & Storage",
      description:
        "Learn why careful harvesting, handling and storage are important for protecting produce quality.",
    },
  ];

  const categories = [
    "All",
    "Basics",
    "Soil",
    "Nature",
    "Crop Care",
    "Water",
    "Harvest",
  ];

  const filteredTopics =
    activeTopic === "All"
      ? topics
      : topics.filter((topic) => topic.category === activeTopic);

  const handleAsk = () => {
    if (onAsk) {
      onAsk();
    }
  };

  return (
    <div className="organic-page">
      {/* NAVBAR */}
      <header className="organic-navbar">
        <button
          type="button"
          className="organic-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="organic-logo">
          <div className="organic-logo-icon">🌱</div>

          <div>
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>
        </div>

        <div className="organic-badge">
          🌿 Organic Farming
        </div>
      </header>

      <main className="organic-main">
        {/* HERO */}
        <section className="organic-hero">
          <div className="organic-hero-content">
            <span className="organic-eyebrow">
              🌿 SUSTAINABLE AGRICULTURE
            </span>

            <h1>
              Grow with
              <br />
              <span>nature.</span>
            </h1>

            <p>
              Discover the principles behind organic farming and learn how
              farmers can work with soil, plants, water and nature.
            </p>

            <div className="organic-hero-actions">
              <button
                type="button"
                className="organic-primary-btn"
                onClick={() =>
                  document
                    .getElementById("organic-topics")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Organic Farming →
              </button>

              <button
                type="button"
                className="organic-secondary-btn"
                onClick={handleAsk}
              >
                🤖 Ask AGRION
              </button>
            </div>
          </div>

          <div className="organic-hero-visual">
            <div className="organic-sun">☀️</div>

            <div className="organic-cloud organic-cloud-one">
              ☁️
            </div>

            <div className="organic-cloud organic-cloud-two">
              ☁️
            </div>

            <div className="organic-field">
              <span>🌱</span>
              <span>🌿</span>
              <span>🌱</span>
              <span>🌾</span>
              <span>🌿</span>
            </div>

            <div className="organic-tree">🌳</div>

            <div className="organic-farmer">🧑‍🌾</div>

            <div className="organic-basket">
              🧺
            </div>
          </div>
        </section>

        {/* INTRO VALUES */}
        <section className="organic-values">

  <button
    type="button"
    onClick={() => {
      localStorage.setItem(
        "agrionAskPrefill",
        "How can I work with nature in organic farming?"
      );

      handleAsk();
    }}
  >
    <span>🌍</span>

    <strong>Work with nature</strong>

    <p>
      Support healthy farm ecosystems.
    </p>
  </button>

  <button
    type="button"
    onClick={() => {
      localStorage.setItem(
        "agrionAskPrefill",
        "How can I care for soil in organic farming?"
      );

      handleAsk();
    }}
  >
    <span>🌱</span>

    <strong>Care for soil</strong>

    <p>
      Build and protect soil health.
    </p>
  </button>

  <button
    type="button"
    onClick={() => {
      localStorage.setItem(
        "agrionAskPrefill",
        "How can I support biodiversity in organic farming?"
      );

      handleAsk();
    }}
  >
    <span>🐝</span>

    <strong>Support biodiversity</strong>

    <p>
      Make space for useful life.
    </p>
  </button>

  <button
    type="button"
    onClick={() => {
      localStorage.setItem(
        "agrionAskPrefill",
        "How can I reduce waste in organic farming?"
      );

      handleAsk();
    }}
  >
    <span>♻️</span>

    <strong>Reduce waste</strong>

    <p>
      Reuse organic materials where appropriate.
    </p>
  </button>

</section>

        {/* WHAT IS ORGANIC */}
        <section className="organic-explainer">
          <div className="organic-explainer-art">
            <div>🌱</div>
            <span>🌍</span>
            <span>💧</span>
            <span>🐝</span>
          </div>

          <div className="organic-explainer-content">
            <span>START HERE</span>

            <h2>What does organic farming mean?</h2>

            <p>
              Organic farming is an approach to agriculture that emphasizes
              natural processes, soil health, biodiversity and careful use of
              farm resources.
            </p>

            <p>
              Organic standards differ by country and certification system,
              so farmers should always check the requirements that apply to
              their farm and market.
            </p>

            <div className="organic-highlights">
              <div>
                <span>01</span>
                <strong>Healthy soil</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Natural processes</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Biodiversity</strong>
              </div>
            </div>
          </div>
        </section>

        {/* TOPICS */}
        <section id="organic-topics" className="organic-topics">
          <div className="organic-heading">
            <span>📚 LEARNING LIBRARY</span>

            <h2>Explore organic farming</h2>

            <p>
              Learn the important ideas step by step.
            </p>
          </div>

          <div className="organic-categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  activeTopic === category ? "active" : ""
                }
                onClick={() => setActiveTopic(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="organic-topic-grid">
            {filteredTopics.map((topic) => (
              <article className="organic-topic-card" key={topic.id}>
                <div className="organic-topic-icon">
                  {topic.icon}
                </div>

                <span>{topic.category}</span>

                <h3>{topic.title}</h3>

                <p>{topic.description}</p>

                <button
  type="button"
  onClick={() => {
    localStorage.setItem(
      "agrionAskPrefill",
      `Tell me about ${topic.title} in organic farming.`
    );

    handleAsk();
  }}
>
  Ask AGRION →
</button>
              </article>
            ))}
          </div>
        </section>

        
           
              
             {/* FARM CYCLE */}
<section className="organic-cycle">
  <div className="organic-heading">
    <span>🔄 THE FARM CYCLE</span>

    <h2>Everything is connected</h2>

    <p>
      Organic farming looks at the farm as an interconnected system.
    </p>
  </div>

  <div className="organic-cycle-flow">

    <button
      type="button"
      onClick={() => {
        localStorage.setItem(
          "agrionAskPrefill",
          "How can I manage healthy plants in organic farming?"
        );

        handleAsk();
      }}
    >
      <span>🌱</span>
      <strong>Plants</strong>
    </button>

    <b>→</b>

    <button
      type="button"
      onClick={() => {
        localStorage.setItem(
          "agrionAskPrefill",
          "How can I manage organic matter and compost in organic farming?"
        );

        handleAsk();
      }}
    >
      <span>🍂</span>
      <strong>Organic matter</strong>
    </button>

    <b>→</b>

    <button
      type="button"
      onClick={() => {
        localStorage.setItem(
          "agrionAskPrefill",
          "How can I maintain healthy soil in organic farming?"
        );

        handleAsk();
      }}
    >
      <span>🌍</span>
      <strong>Soil</strong>
    </button>

    <b>→</b>

    <button
      type="button"
      onClick={() => {
        localStorage.setItem(
          "agrionAskPrefill",
          "How can I support healthy crops in organic farming?"
        );

        handleAsk();
      }}
    >
      <span>🌾</span>
      <strong>Healthy crops</strong>
    </button>

    <b>→</b>

    <button
      type="button"
      onClick={() => {
        localStorage.setItem(
          "agrionAskPrefill",
          "Explain the complete organic farming cycle from plants to soil and back again."
        );

        handleAsk();
      }}
    >
      <span>♻️</span>
      <strong>Cycle again</strong>
    </button>

  </div>
</section>

        {/* BENEFITS */}
        <section className="organic-benefits">
          <div className="organic-heading">
            <span>🌿 THINK HOLISTICALLY</span>

            <h2>Potential benefits and challenges</h2>

            <p>
              Organic farming can offer opportunities, but it also requires
              knowledge, planning and suitable practices.
            </p>
          </div>

          <div className="organic-benefit-grid">
            <div className="organic-benefit-card">
              <div className="organic-benefit-icon">🌱</div>

              <h3>Potential benefits</h3>

              <ul>
                <li>Focus on soil health</li>
                <li>Encourages biodiversity</li>
                <li>Can support resource recycling</li>
                <li>Can reduce reliance on some synthetic inputs</li>
              </ul>
            </div>

            <div className="organic-benefit-card challenge">
              <div className="organic-benefit-icon">🧠</div>

              <h3>Things to plan for</h3>

              <ul>
                <li>Requires good crop monitoring</li>
                <li>Natural inputs need proper management</li>
                <li>Pest and disease prevention is important</li>
                <li>Certification rules may apply to organic sales</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FARMER MESSAGE */}
        <section className="organic-farmer-message">
          <div className="organic-farmer-art">
            👩‍🌾🌿
          </div>

          <div>
            <span>ORGANIC FARMING IS A JOURNEY</span>

            <h2>
              Good farming starts with understanding the land.
            </h2>

            <p>
              Every farm is different. Soil, climate, crop, water availability
              and local conditions all matter when choosing farming practices.
            </p>
          </div>
        </section>

        {/* ASK AGRION */}
        <section className="organic-ask">
          <div className="organic-ask-icon">🤖</div>

          <div>
            <span>HAVE A FARMING QUESTION?</span>

            <h2>Ask AGRION</h2>

            <p>
              Ask about soil, compost, organic practices, crop care or
              sustainable farming.
            </p>
          </div>

          <button type="button" onClick={handleAsk}>
            Ask AGRION →
          </button>
        </section>

        {/* SAFETY */}
        <section className="organic-safety">
          <span>⚠️</span>

          <div>
            <strong>Important</strong>

            <p>
              Organic does not automatically mean risk-free. Before applying
              any fertilizer, pesticide, biological product or treatment,
              verify the product, dosage, local regulations and crop-specific
              guidance with a qualified agricultural professional or trusted
              agricultural source.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="organic-footer">
        <strong>🌱 AGRION</strong>

        <p>From Seed to Market</p>

        <small>
          Better farming begins with better understanding. 🌿
        </small>
      </footer>
    </div>
  );
}

export default OrganicFarming;