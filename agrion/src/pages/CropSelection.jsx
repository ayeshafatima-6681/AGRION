import { useState } from "react";
import "./CropSelection.css";

function CropSelection({ onBack, onSelectCrop }) {
  const [search, setSearch] = useState("");

  const crops = [
    {
      name: "Rice",
      emoji: "🌾",
      description: "Learn how to grow rice step by step.",
    },
    {
      name: "Wheat",
      emoji: "🌾",
      description: "Explore the complete wheat crop journey.",
    },
    {
      name: "Maize",
      emoji: "🌽",
      description: "Get guidance from seed to harvest.",
    },
    {
      name: "Tomato",
      emoji: "🍅",
      description: "Learn tomato growing and crop care.",
    },
    {
      name: "Potato",
      emoji: "🥔",
      description: "Understand potato cultivation step by step.",
    },
    {
      name: "Onion",
      emoji: "🧅",
      description: "Learn about onion farming and harvesting.",
    },
    {
      name: "Chilli",
      emoji: "🌶️",
      description: "Get guidance for growing chilli crops.",
    },
    {
      name: "Cotton",
      emoji: "🌿",
      description: "Explore the cotton farming journey.",
    },
  ];

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="crop-page">

      {/* TOP BAR */}
      <header className="crop-navbar">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="crop-logo">
          🌱 <strong>AGRION</strong>
        </div>

        <button className="language-btn">
          🌐 English
        </button>
      </header>

      {/* HEADER */}
      <section className="crop-header">
        <div className="crop-header-icon">🌱</div>

        <p className="small-heading">STEP 1</p>

        <h1>What do you want to grow?</h1>

        <p>
          Choose a crop and AGRION will guide you
          from seed to market.
        </p>
      </section>

      {/* SEARCH */}
      <div className="crop-search">
        <span>🔍</span>

        <input
          type="text"
          placeholder="Search for a crop..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CROPS */}
      <section className="crops-section">
        <div className="crops-grid">

          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <div className="crop-card" key={crop.name}>

                <div className="crop-emoji">
                  {crop.emoji}
                </div>

                <h2>{crop.name}</h2>

                <p>{crop.description}</p>

                <button
                  className="select-crop-button"
                  onClick={() => onSelectCrop(crop.name)}
                >
                  Select Crop →
                </button>

              </div>
            ))
          ) : (
            <div className="no-crops">
              <div>🌱</div>
              <h3>No crop found</h3>
              <p>Try searching for another crop.</p>
            </div>
          )}

        </div>
      </section>

      {/* BOTTOM MESSAGE */}
      <section className="crop-bottom">
        <div className="crop-bottom-icon">🌾</div>

        <div>
          <h3>Your journey starts here.</h3>

          <p>
            Choose your crop and AGRION will help you
            understand every important stage.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          🌱 AGRION
        </div>

        <p>From Seed to Market</p>
      </footer>

    </div>
  );
}

export default CropSelection;