import "./CropStageDetail.css";

const stageInformation = {
  "Seed Selection": {
    goal: "Start with suitable, quality planting material.",
    learn: [
      "Understand why seed or planting material quality matters.",
      "Choose varieties suitable for your crop, region and growing conditions.",
      "Check the source and physical quality before planting."
    ],
    monitor: [
      "Seed or planting material quality",
      "Variety suitability",
      "Source and authenticity"
    ],
    questions: [
      "Which variety is suitable for my area?",
      "How should I select good planting material?",
      "What should I check before buying seed?"
    ]
  },

  "Land Preparation": {
    goal: "Prepare the field for healthy crop establishment.",
    learn: [
      "Understand the importance of proper field preparation.",
      "Learn how soil condition affects crop establishment.",
      "Understand why drainage and suitable field conditions matter."
    ],
    monitor: [
      "Soil condition",
      "Field preparation",
      "Drainage and water movement"
    ],
    questions: [
      "How should I prepare my field?",
      "What soil condition is suitable?",
      "How can I improve field drainage?"
    ]
  },

  "Sowing / Planting": {
    goal: "Establish the crop properly from the beginning.",
    learn: [
      "Understand suitable sowing or planting methods.",
      "Learn why planting time matters.",
      "Understand the importance of suitable spacing and depth."
    ],
    monitor: [
      "Plant establishment",
      "Plant spacing",
      "Early crop growth"
    ],
    questions: [
      "When should I plant my crop?",
      "What planting method is suitable?",
      "How can I get uniform crop establishment?"
    ]
  },

  "Water Management": {
    goal: "Manage water according to crop, soil and weather conditions.",
    learn: [
      "Understand that water requirements change during crop growth.",
      "Learn why both excess and insufficient water can affect crops.",
      "Understand the importance of efficient irrigation and drainage."
    ],
    monitor: [
      "Soil moisture",
      "Field water condition",
      "Drainage",
      "Signs of water stress"
    ],
    questions: [
      "How much water does my crop need?",
      "When does my crop need more water?",
      "How can I avoid unnecessary water use?"
    ]
  },

  Nutrients: {
    goal: "Support healthy crop growth through balanced nutrition.",
    learn: [
      "Understand the role of essential plant nutrients.",
      "Learn why nutrient requirements vary by crop and soil.",
      "Understand why soil testing can help guide nutrient decisions."
    ],
    monitor: [
      "Plant growth",
      "Leaf appearance",
      "Soil condition",
      "Possible nutrient deficiency symptoms"
    ],
    questions: [
      "What nutrients does my crop need?",
      "When should I test my soil?",
      "How can I identify possible nutrient problems?"
    ]
  },

  "Weed, Pest & Disease": {
    goal: "Monitor the crop and respond safely to weeds, pests and diseases.",
    learn: [
      "Learn how to regularly inspect the crop.",
      "Understand the difference between weeds, pests and diseases.",
      "Learn why correct identification should come before treatment."
    ],
    monitor: [
      "Leaves and stems",
      "Pest activity",
      "Disease symptoms",
      "Weed growth"
    ],
    questions: [
      "What is affecting my crop?",
      "How can I identify a crop disease?",
      "What should I do if I see pests?"
    ]
  },

  "Crop Growth": {
    goal: "Monitor the crop through its important growth stages.",
    learn: [
      "Understand how the crop changes as it develops.",
      "Learn what farmers should observe during crop growth.",
      "Understand why regular field observation is important."
    ],
    monitor: [
      "Plant development",
      "Crop uniformity",
      "Pest and disease symptoms",
      "Water and nutrient condition"
    ],
    questions: [
      "Is my crop growing normally?",
      "What should I check during crop growth?",
      "When should I inspect my field?"
    ]
  },

  Harvest: {
    goal: "Harvest the crop at the appropriate stage.",
    learn: [
      "Understand signs that indicate crop maturity.",
      "Learn why harvest timing affects quality and losses.",
      "Understand basic harvesting and post-harvest handling."
    ],
    monitor: [
      "Crop maturity",
      "Produce condition",
      "Weather conditions",
      "Harvest readiness"
    ],
    questions: [
      "How do I know when my crop is ready to harvest?",
      "What should I check before harvesting?",
      "How can I reduce harvest losses?"
    ]
  },

  Storage: {
    goal: "Protect harvested produce and maintain quality.",
    learn: [
      "Understand why proper drying and storage matter.",
      "Learn about protecting produce from moisture and pests.",
      "Understand the importance of clean and suitable storage conditions."
    ],
    monitor: [
      "Moisture",
      "Storage cleanliness",
      "Pest activity",
      "Produce quality"
    ],
    questions: [
      "How should I store my harvest?",
      "How can I protect stored produce?",
      "Why is moisture important during storage?"
    ]
  },

  Market: {
    goal: "Understand the available routes for selling produce.",
    learn: [
      "Explore different market channels.",
      "Understand how location, quality and timing can affect selling options.",
      "Learn how farmers can compare different buyers."
    ],
    monitor: [
      "Local market conditions",
      "Buyer requirements",
      "Produce quality",
      "Transportation considerations"
    ],
    questions: [
      "Where can I sell my crop?",
      "How can I compare buyers?",
      "What should I check before selling?"
    ]
  },

  Selling: {
    goal: "Make an informed decision when selling the harvest.",
    learn: [
      "Understand different selling channels.",
      "Learn what information to compare before accepting an offer.",
      "Understand the importance of considering costs and net returns."
    ],
    monitor: [
      "Offered price",
      "Quantity and quality",
      "Transport costs",
      "Buyer terms"
    ],
    questions: [
      "How should I compare two buyers?",
      "What costs should I consider?",
      "How can I calculate my approximate return?"
    ]
  }
};

function CropStageDetail({ crop, stage, onBack, onAsk }) {
  const information =
    stageInformation[stage.title] || stageInformation["Crop Growth"];

  return (
    <div className="stage-detail-page">
      {/* NAVBAR */}
      <header className="stage-detail-navbar">
        <button
          onClick={onBack}
          className="stage-back-button"
        >
          ← Back to {crop} Journey
        </button>

        <div className="stage-detail-logo">
          🌱 <strong>AGRION</strong>
        </div>

        <div className="stage-step">
          Stage {stage.number}
        </div>
      </header>

      {/* HERO */}
      <section className="stage-detail-hero">
        <div className="stage-big-icon">
          {stage.icon}
        </div>

        <p className="stage-label">
          {crop.toUpperCase()} CROP JOURNEY • STAGE {stage.number}
        </p>

        <h1>{stage.title}</h1>

        <p className="stage-description">
          {stage.description}
        </p>
      </section>

      {/* MAIN CONTENT */}
      <main className="stage-detail-content">

        {/* GOAL */}
        <section className="detail-card goal-card">
          <div className="card-icon">
            🎯
          </div>

          <div>
            <p className="card-label">
              STAGE GOAL
            </p>

            <h2>
              {information.goal}
            </h2>
          </div>
        </section>

        {/* WHAT TO LEARN */}
        <section className="detail-section">
          <div className="section-title">
            <span>📚</span>

            <div>
              <p>LEARN</p>

              <h2>
                What you should know
              </h2>
            </div>
          </div>

          <div className="learning-list">
            {information.learn.map((item, index) => (
              <div
                className="learning-item"
                key={index}
              >
                <span>✓</span>

                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT TO MONITOR */}
        <section className="detail-section">
          <div className="section-title">
            <span>👀</span>

            <div>
              <p>FIELD CHECK</p>

              <h2>
                What to monitor
              </h2>
            </div>
          </div>

          <div className="monitor-grid">
            {information.monitor.map((item, index) => (
              <div
                className="monitor-card"
                key={index}
              >
                <span>🔎</span>

                <strong>
                  {item}
                </strong>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="detail-section">
          <div className="section-title">
            <span>💬</span>

            <div>
              <p>COMMON QUESTIONS</p>

              <h2>
                Farmers may ask
              </h2>
            </div>
          </div>

          <div className="question-list">
            {information.questions.map((question, index) => (
              <button
                key={index}
                className="question-button"
                onClick={() => onAsk?.(question)}
              >
                <span>{question}</span>

                <strong>→</strong>
              </button>
            ))}
          </div>
        </section>

        {/* SAFETY NOTE */}
        <section className="safety-note">
          <div>⚠️</div>

          <div>
            <strong>
              AGRION Safety Note
            </strong>

            <p>
              Farming recommendations can depend on crop variety,
              soil, climate, season and local conditions. AGRION should
              provide location-appropriate guidance and encourage
              professional or local agricultural support when needed.
            </p>
          </div>
        </section>

        {/* ASK AGRION */}
        <section className="ask-stage-card">
          <div className="ask-stage-icon">
            🤖
          </div>

          <div>
            <p>NEED HELP?</p>

            <h2>
              Ask AGRION
            </h2>

            <span>
              Have a question about{" "}
              {stage.title.toLowerCase()}?
            </span>
          </div>

          <button onClick={() => onAsk?.()}>
            Ask AGRION →
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="stage-detail-footer">
        <strong>
          🌱 AGRION
        </strong>

        <p>
          From Seed to Market
        </p>

        <small>
          Growing knowledge. Growing possibilities.
        </small>
      </footer>
    </div>
  );
}

export default CropStageDetail;