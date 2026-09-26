import { useState } from "react";
import "./Market.css";

function Market({ onBack, onAsk }) {
  const [selectedCrop, setSelectedCrop] = useState("Rice");
  const [selectedOption, setSelectedOption] = useState(null);

  const crops = [
    { name: "Rice", icon: "🌾", quantity: "500 kg" },
    { name: "Wheat", icon: "🌾", quantity: "300 kg" },
    { name: "Maize", icon: "🌽", quantity: "400 kg" },
    { name: "Tomato", icon: "🍅", quantity: "250 kg" },
    { name: "Potato", icon: "🥔", quantity: "350 kg" },
    { name: "Onion", icon: "🧅", quantity: "300 kg" },
    { name: "Chilli", icon: "🌶️", quantity: "150 kg" },
    { name: "Cotton", icon: "🌿", quantity: "200 kg" },
  ];

  const sellingOptions = [
    {
      id: "local",
      icon: "🏪",
      title: "Local Market",
      description: "Sell your produce at a nearby agricultural or local market.",
      advantage: "Quick local selling",
    },
    {
      id: "wholesale",
      icon: "🚚",
      title: "Wholesaler",
      description: "Connect with traders or wholesalers who purchase farm produce in larger quantities.",
      advantage: "Good for bulk quantities",
    },
    {
      id: "direct",
      icon: "🤝",
      title: "Direct Customers",
      description: "Explore opportunities to sell directly to customers and reduce unnecessary middle layers.",
      advantage: "Direct connection",
    },
    {
      id: "business",
      icon: "🏬",
      title: "Businesses",
      description: "Explore potential buyers such as restaurants, shops, food businesses and other organisations.",
      advantage: "Potential repeat buyers",
    },
  ];

  const handleSellingOption = (option) => {
    setSelectedOption(option.id);
  };

  const handleCheckMarket = () => {
    alert(
      "Live market prices, nearby buyers and selling opportunities will be connected to AGRION's backend."
    );
  };

  const handleAskAGRION = () => {
    if (onAsk) {
      onAsk();
    }
  };

  const currentCrop = crops.find((crop) => crop.name === selectedCrop);

  return (
    <div className="market-page">
      <header className="market-navbar">
        <button
          type="button"
          className="market-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="market-logo">
          <div className="market-logo-icon">🌱</div>

          <div className="market-logo-text">
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>
        </div>

        <div className="market-navbar-status">
          <span className="market-status-dot"></span>
          Market
        </div>
      </header>

      <main className="market-main">
        {/* HERO */}
        <section className="market-hero">
          <div className="market-hero-content">
            <span className="market-label">🌾 FARM TO MARKET</span>

            <h1>
              I want to
              <br />
              <span>sell my produce.</span>
            </h1>

            <p>
              AGRION helps farmers understand their selling options and prepare
              to connect with suitable buyers.
            </p>

            <div className="market-hero-actions">
              <button
                type="button"
                className="market-primary-button"
                onClick={handleCheckMarket}
              >
                🛒 Check Market Options
              </button>

              <button
                type="button"
                className="market-secondary-button"
                onClick={handleAskAGRION}
              >
                💬 Ask AGRION
              </button>
            </div>
          </div>

          <div className="market-hero-visual">
            <div className="market-visual-circle">
              <span>🌾</span>
            </div>

            <div className="market-floating-card market-floating-top">
              <span>📊</span>
              <div>
                <strong>Compare</strong>
                <small>Selling options</small>
              </div>
            </div>

            <div className="market-floating-card market-floating-bottom">
              <span>🤝</span>
              <div>
                <strong>Connect</strong>
                <small>With buyers</small>
              </div>
            </div>
          </div>
        </section>

        {/* CROP SELECTION */}
        <section className="market-section">
          <div className="market-section-heading">
            <div>
              <span className="market-section-label">STEP 1</span>
              <h2>What do you want to sell?</h2>
              <p>Select the crop you want to take to the market.</p>
            </div>
          </div>

          <div className="market-crop-grid">
            {crops.map((crop) => (
              <button
                type="button"
                key={crop.name}
                className={`market-crop-card ${
                  selectedCrop === crop.name ? "selected" : ""
                }`}
                onClick={() => setSelectedCrop(crop.name)}
              >
                <span className="market-crop-icon">{crop.icon}</span>

                <span className="market-crop-name">{crop.name}</span>

                <span className="market-crop-quantity">
                  {crop.quantity}
                </span>

                {selectedCrop === crop.name && (
                  <span className="market-crop-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* SELECTED CROP */}
        <section className="market-selected-card">
          <div className="market-selected-icon">
            {currentCrop?.icon}
          </div>

          <div className="market-selected-content">
            <span>SELECTED PRODUCE</span>
            <h2>{currentCrop?.name}</h2>
            <p>
              Current quantity entered for planning:{" "}
              <strong>{currentCrop?.quantity}</strong>
            </p>
          </div>

          <button
            type="button"
            className="market-check-button"
            onClick={handleCheckMarket}
          >
            Check Market →
          </button>
        </section>

        {/* SELLING OPTIONS */}
        <section className="market-section">
          <div className="market-section-heading">
            <div>
              <span className="market-section-label">STEP 2</span>
              <h2>Choose how you may want to sell</h2>
              <p>
                Different selling channels can suit different crops,
                quantities and situations.
              </p>
            </div>
          </div>

          <div className="selling-options-grid">
            {sellingOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                className={`selling-option-card ${
                  selectedOption === option.id ? "selected" : ""
                }`}
                onClick={() => handleSellingOption(option)}
              >
                <div className="selling-option-top">
                  <div className="selling-option-icon">
                    {option.icon}
                  </div>

                  {selectedOption === option.id && (
                    <span className="selling-option-check">✓</span>
                  )}
                </div>

                <h3>{option.title}</h3>

                <p>{option.description}</p>

                <span className="selling-option-advantage">
                  {option.advantage}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* MARKET INFORMATION */}
        <section className="market-information">
          <div className="market-information-heading">
            <span>📊</span>

            <div>
              <h2>What AGRION will help you compare</h2>
              <p>
                Future market integration will bring useful information
                together before you decide where to sell.
              </p>
            </div>
          </div>

          <div className="market-information-grid">
            <div className="market-information-item">
              <span>💰</span>
              <div>
                <strong>Market prices</strong>
                <p>Compare available price information.</p>
              </div>
            </div>

            <div className="market-information-item">
              <span>📍</span>
              <div>
                <strong>Nearby markets</strong>
                <p>Discover relevant market locations.</p>
              </div>
            </div>

            <div className="market-information-item">
              <span>🤝</span>
              <div>
                <strong>Potential buyers</strong>
                <p>Find suitable buyer opportunities.</p>
              </div>
            </div>

            <div className="market-information-item">
              <span>🚚</span>
              <div>
                <strong>Quantity & logistics</strong>
                <p>Consider quantity, transport and selling needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SELLING JOURNEY */}
        <section className="market-section">
          <div className="market-section-heading">
            <div>
              <span className="market-section-label">YOUR SELLING JOURNEY</span>
              <h2>From harvest to buyer</h2>
              <p>A simple path to help you think about selling your produce.</p>
            </div>
          </div>

          <div className="selling-journey">
            <div className="selling-journey-line"></div>

            <div className="selling-journey-step active">
              <div className="selling-journey-icon">🌾</div>
              <strong>Harvest</strong>
              <span>Prepare produce</span>
            </div>

            <div className="selling-journey-step">
              <div className="selling-journey-icon">📦</div>
              <strong>Prepare</strong>
              <span>Sort & handle</span>
            </div>

            <div className="selling-journey-step">
              <div className="selling-journey-icon">📊</div>
              <strong>Compare</strong>
              <span>Check options</span>
            </div>

            <div className="selling-journey-step">
              <div className="selling-journey-icon">🤝</div>
              <strong>Connect</strong>
              <span>Find buyer</span>
            </div>

            <div className="selling-journey-step">
              <div className="selling-journey-icon">🛒</div>
              <strong>Sell</strong>
              <span>Complete sale</span>
            </div>
          </div>
        </section>

        {/* ASK AGRION */}
        <section className="market-ask-card">
          <div className="market-ask-icon">🤖</div>

          <div className="market-ask-content">
            <span>NEED HELP DECIDING?</span>

            <h2>Ask AGRION about selling</h2>

            <p>
              Ask about markets, buyers, pricing, quantities or ways to sell
              your produce.
            </p>
          </div>

          <button
            type="button"
            className="market-ask-button"
            onClick={handleAskAGRION}
          >
            Ask AGRION →
          </button>
        </section>

        {/* SAFETY */}
        <section className="market-safety">
          <div className="market-safety-icon">⚠️</div>

          <div>
            <strong>Important market note</strong>

            <p>
              Market prices, buyer availability, transport costs and selling
              conditions can change. AGRION should provide current information
              from trusted sources when the backend is connected. Always
              verify important financial or contractual decisions before
              completing a sale.
            </p>
          </div>
        </section>
      </main>

      <footer className="market-footer">
        <strong>🌱 AGRION</strong>
        <p>From Seed to Market</p>
        <small>Growing knowledge. Growing possibilities.</small>
      </footer>
    </div>
  );
}

export default Market;