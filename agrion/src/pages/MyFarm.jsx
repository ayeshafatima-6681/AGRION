import { useEffect, useState } from "react";
import "./MyFarm.css";

function MyFarm({
  crop,
  onBack,
  onContinue,
  onCheckCrop,
  onSelectCrop,
  onAsk,
}) {
  const activeCrop = crop || "Rice";

  const [showFarmForm, setShowFarmForm] = useState(false);

  const [farm, setFarm] = useState(() => {
    const savedFarm = localStorage.getItem("agrionFarm");

    if (savedFarm) {
      return JSON.parse(savedFarm);
    }

    return {
      name: "My Farm",
      location: "Add your location",
      size: "Not added",
      crop: activeCrop,
      plantingDate: "Not added",
      stage: "Seed Selection",
      stageNumber: 1,
    };
  });

  const [form, setForm] = useState({
    name: "",
    location: "",
    size: "",
    plantingDate: "",
  });

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("agrionFarmNotes") || "";
  });

  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("agrionFarm", JSON.stringify(farm));
  }, [farm]);

  useEffect(() => {
    if (crop && crop !== farm.crop) {
      setFarm((previousFarm) => ({
        ...previousFarm,
        crop,
      }));
    }
  }, [crop]);

  const saveFarm = () => {
    if (!form.name.trim()) {
      return;
    }

    const sizeValue = form.size.trim()
      ? `${form.size.trim()} acres`
      : "Size not added";

    const plantingDateValue = form.plantingDate
      ? new Date(form.plantingDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : farm.plantingDate;

    const updatedFarm = {
      ...farm,
      name: form.name.trim(),
      location:
        form.location.trim() || "Location not added",
      size: sizeValue,
      crop: activeCrop || farm.crop,
      plantingDate: plantingDateValue,
    };

    setFarm(updatedFarm);

    setForm({
      name: "",
      location: "",
      size: "",
      plantingDate: "",
    });

    setShowFarmForm(false);
  };

  const openEditForm = () => {
    setForm({
      name: farm.name === "My Farm" ? "" : farm.name,
      location:
        farm.location === "Add your location" ||
        farm.location === "Location not added"
          ? ""
          : farm.location,
      size:
        farm.size === "Not added" ||
        farm.size === "Size not added"
          ? ""
          : farm.size.replace(" acres", ""),
      plantingDate: "",
    });

    setShowFarmForm(true);
  };

  const openNotes = () => {
    document
      .querySelector(".myfarm-notes-textarea")
      ?.focus();
  };

  const saveNotes = () => {
    localStorage.setItem("agrionFarmNotes", notes);

    setNotesSaved(true);

    setTimeout(() => {
      setNotesSaved(false);
    }, 2500);
  };

  /*
   * Sends a useful topic to Ask AGRION while preserving
   * the existing Ask AGRION page.
   */
  const askAGRION = (question) => {
    localStorage.setItem("agrionAskPrefill", question);

    if (onAsk) {
      onAsk();
    }
  };

  /*
   * Farm summary cards.
   * These don't remove any information; they simply give
   * the user a useful action when clicking the card.
   */
  const handleFarmSummaryClick = () => {
    openEditForm();
  };

  const handleCropSummaryClick = () => {
    if (onContinue) {
      onContinue();
    }
  };

  const handleSizeSummaryClick = () => {
    openEditForm();
  };

  const handleLocationSummaryClick = () => {
    openEditForm();
  };

  const cropStages = [
    {
      icon: "🌱",
      title: "Seed",
      subtitle: "Selection",
    },
    {
      icon: "🌾",
      title: "Grow",
      subtitle: "Growth",
    },
    {
      icon: "💧",
      title: "Manage",
      subtitle: "Care",
    },
    {
      icon: "🌾",
      title: "Harvest",
      subtitle: "Harvest",
    },
    {
      icon: "🛒",
      title: "Market",
      subtitle: "Selling",
    },
  ];

  const currentStage = Math.min(
    Math.max(Number(farm.stageNumber) || 1, 1),
    5
  );

  const progress =
    currentStage === 1
      ? 10
      : currentStage === 2
      ? 30
      : currentStage === 3
      ? 55
      : currentStage === 4
      ? 78
      : 100;

  /*
   * Every farming journey stage now works.
   * The existing Crop Journey is the destination because
   * it already contains the detailed journey.
   */
  const handleJourneyStage = (stageNumber) => {
    if (stageNumber === 5) {
      askAGRION(
        `How can I prepare my ${farm.crop} crop for harvest, market and selling?`
      );
      return;
    }

    if (onContinue) {
      onContinue();
    }
  };

  /*
   * Whole management cards now work, not only the tiny
   * "Add observation" text.
   */
  const handleManagementCard = (type) => {
    if (type === "pests") {
      if (onCheckCrop) {
        onCheckCrop();
      }
      return;
    }

    if (type === "water") {
      askAGRION(
        `What should I check about water and irrigation for my ${farm.crop} crop?`
      );
      return;
    }

    if (type === "nutrients") {
      askAGRION(
        `What should I check about nutrients and fertilizer for my ${farm.crop} crop?`
      );
      return;
    }

    if (type === "field") {
      askAGRION(
        `What field conditions should I monitor for my ${farm.crop} crop?`
      );
    }
  };

  const handleFinanceCard = (type) => {
    if (type === "expenses") {
      askAGRION(
        `How should I record expenses for my ${farm.crop} farm?`
      );
      return;
    }

    if (type === "income") {
      askAGRION(
        `How can I calculate expected income and selling price for my ${farm.crop} crop?`
      );
    }
  };

  return (
    <div className="my-farm-page">

      {/* NAVBAR */}
      <header className="myfarm-navbar">

        <button
          type="button"
          className="myfarm-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="myfarm-logo">

          <div className="myfarm-logo-icon">
            🌱
          </div>

          <div className="myfarm-logo-text">
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>

        </div>

        <button
          type="button"
          className="myfarm-back-button"
          onClick={() =>
            askAGRION(
              "Help me understand my farm information and farming language preferences."
            )
          }
        >
          🌐 English
        </button>

      </header>

      <main className="myfarm-main">

        {/* HERO */}
        <section className="myfarm-hero">

          <div className="myfarm-hero-content">

            <div className="myfarm-label">
              🚜 MY FARM
            </div>

            <h1>
              Your farm,
              <br />
              <span>your journey.</span>
            </h1>

            <p>
              Keep your farm, crop and important farming
              information organised in one place.
            </p>

            <div className="myfarm-hero-actions">

              <button
                type="button"
                className="myfarm-primary-button"
                onClick={openEditForm}
              >
                ✏️ Add / Edit Farm
              </button>

              <button
                type="button"
                className="myfarm-secondary-button"
                onClick={onContinue}
              >
                🌱 Continue Crop Journey →
              </button>

            </div>

          </div>

        </section>

        {/* SUMMARY */}
        <section className="myfarm-summary-grid">

          <button
            type="button"
            className="myfarm-summary-card"
            onClick={handleFarmSummaryClick}
          >
            <div className="myfarm-summary-icon">
              🚜
            </div>

            <span>Farm</span>

            <strong>
              {farm.name}
            </strong>

            <small>
              Your farm
            </small>
          </button>

          <button
            type="button"
            className="myfarm-summary-card"
            onClick={handleCropSummaryClick}
          >
            <div className="myfarm-summary-icon">
              🌱
            </div>

            <span>Current Crop</span>

            <strong>
              {farm.crop}
            </strong>

            <small>
              Growing now
            </small>
          </button>

          <button
            type="button"
            className="myfarm-summary-card"
            onClick={handleSizeSummaryClick}
          >
            <div className="myfarm-summary-icon">
              📏
            </div>

            <span>Farm Size</span>

            <strong>
              {farm.size}
            </strong>

            <small>
              Land area
            </small>
          </button>

          <button
            type="button"
            className="myfarm-summary-card"
            onClick={handleLocationSummaryClick}
          >
            <div className="myfarm-summary-icon">
              📍
            </div>

            <span>Location</span>

            <strong>
              {farm.location}
            </strong>

            <small>
              Farm location
            </small>
          </button>

        </section>

        {/* FARM INFORMATION */}
        <section className="myfarm-section">

          <div className="myfarm-section-heading">

            <div>
              <h2>
                Farm information
              </h2>

              <p>
                The basic information AGRION uses to understand your farm.
              </p>
            </div>

            <button
              type="button"
              className="myfarm-section-link"
              onClick={openEditForm}
            >
              Edit details →
            </button>

          </div>

          <div className="myfarm-info-grid">

            <button
              type="button"
              className="myfarm-info-card large"
              onClick={openEditForm}
            >
              <div className="myfarm-info-top">

                <div className="myfarm-info-icon">
                  🚜
                </div>

                <div>
                  <h3>
                    Farm
                  </h3>

                  <p>
                    Your farm profile
                  </p>
                </div>

              </div>

              <div className="myfarm-info-value">
                {farm.name}
              </div>

              <div className="myfarm-info-muted">
                📍 {farm.location}
              </div>

            </button>

            <button
              type="button"
              className="myfarm-info-card"
              onClick={openEditForm}
            >
              <div className="myfarm-info-top">

                <div className="myfarm-info-icon">
                  📏
                </div>

                <div>
                  <h3>
                    Farm Size
                  </h3>

                  <p>
                    Available land
                  </p>
                </div>

              </div>

              <div className="myfarm-info-value">
                {farm.size}
              </div>

            </button>

            <button
              type="button"
              className="myfarm-info-card"
              onClick={openEditForm}
            >
              <div className="myfarm-info-top">

                <div className="myfarm-info-icon">
                  📅
                </div>

                <div>
                  <h3>
                    Planting
                  </h3>

                  <p>
                    Crop start date
                  </p>
                </div>

              </div>

              <div className="myfarm-info-value">
                {farm.plantingDate}
              </div>

            </button>

          </div>

        </section>

        {/* FARM FORM */}
        {showFarmForm && (

          <section className="myfarm-section">

            <div className="myfarm-info-card">

              <div className="myfarm-section-heading">

                <div>
                  <h2>
                    Add your farm information
                  </h2>

                  <p>
                    This information stays on this browser for now.
                  </p>
                </div>

                <button
                  type="button"
                  className="myfarm-section-link"
                  onClick={() => setShowFarmForm(false)}
                >
                  ✕ Close
                </button>

              </div>

              <div className="myfarm-form-grid">

                <label>
                  Farm Name

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="Example: Green Valley Farm"
                  />
                </label>

                <label>
                  Location

                  <input
                    type="text"
                    value={form.location}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        location: event.target.value,
                      })
                    }
                    placeholder="Village, district or city"
                  />
                </label>

                <label>
                  Farm Size

                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={form.size}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        size: event.target.value,
                      })
                    }
                    placeholder="Size in acres"
                  />
                </label>

                <label>
                  Planting Date

                  <input
                    type="date"
                    value={form.plantingDate}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        plantingDate: event.target.value,
                      })
                    }
                  />
                </label>

              </div>

              <div className="myfarm-form-actions">

                <button
                  type="button"
                  className="myfarm-cancel-button"
                  onClick={() => setShowFarmForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="myfarm-save-button"
                  onClick={saveFarm}
                >
                  ✓ Save Farm
                </button>

              </div>

            </div>

          </section>

        )}

        {/* CURRENT CROP */}
        <section className="myfarm-section">

          <div className="myfarm-section-heading">

            <div>

              <h2>
                Current crop
              </h2>

              <p>
                Follow your {farm.crop.toLowerCase()} crop from seed to market.
              </p>

            </div>

            <button
              type="button"
              className="myfarm-section-link"
              onClick={onSelectCrop}
            >
              Change crop →
            </button>

          </div>

          <div className="myfarm-crops-grid">

            <button
              type="button"
              className="myfarm-crop-card"
              onClick={onContinue}
            >

              <div className="myfarm-crop-header">

                <div className="myfarm-crop-title">

                  <div className="myfarm-crop-icon">
                    🌾
                  </div>

                  <div>

                    <h3>
                      {farm.crop}
                    </h3>

                    <p>
                      Current crop
                    </p>

                  </div>

                </div>

                <span className="myfarm-crop-status">
                  ACTIVE
                </span>

              </div>

              <div className="myfarm-progress-area">

                <div className="myfarm-progress-label">

                  <span>
                    Crop journey
                  </span>

                  <strong>
                    {progress}%
                  </strong>

                </div>

                <div className="myfarm-progress-track">

                  <div
                    className="myfarm-progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="myfarm-crop-meta">

                <div>
                  <span>Stage</span>
                  <strong>
                    {currentStage} of 5
                  </strong>
                </div>

                <div>
                  <span>Current</span>
                  <strong>
                    {farm.stage}
                  </strong>
                </div>

                <div>
                  <span>Started</span>
                  <strong>
                    {farm.plantingDate}
                  </strong>
                </div>

              </div>

            </button>

            <button
              type="button"
              className="myfarm-add-card"
              onClick={onSelectCrop}
            >

              <div className="myfarm-add-content">

                <div className="myfarm-add-icon">
                  +
                </div>

                <strong>
                  Change or select another crop
                </strong>

                <span>
                  Explore a different crop journey
                </span>

              </div>

            </button>

          </div>

        </section>

        {/* FARM JOURNEY */}
        <section className="myfarm-section">

          <div className="myfarm-section-heading">

            <div>

              <h2>
                Your farming journey
              </h2>

              <p>
                AGRION connects every important part of your crop journey.
              </p>

            </div>

          </div>

          <div className="myfarm-journey-card">

            <div className="myfarm-journey-track">

              {cropStages.map((stage, index) => {

                const stageNumber = index + 1;

                return (
                  <button
                    type="button"
                    className={`myfarm-journey-step ${
                      stageNumber <= currentStage
                        ? "active"
                        : ""
                    }`}
                    key={stage.title}
                    onClick={() =>
                      handleJourneyStage(stageNumber)
                    }
                  >

                    <div className="myfarm-journey-icon">
                      {stage.icon}
                    </div>

                    <strong>
                      {stage.title}
                    </strong>

                    <span>
                      {stage.subtitle}
                    </span>

                  </button>
                );

              })}

            </div>

          </div>

        </section>

        {/* FARM MONITORING */}
        <section className="myfarm-section">

          <div className="myfarm-section-heading">

            <div>

              <h2>
                What should you check?
              </h2>

              <p>
                Keep important observations about your field in one place.
              </p>

            </div>

          </div>

          <div className="myfarm-management-grid">

            <button
              type="button"
              className="myfarm-management-card"
              onClick={() => handleManagementCard("water")}
            >

              <div className="myfarm-management-icon">
                💧
              </div>

              <h3>
                Water
              </h3>

              <p>
                Record irrigation and water-related observations.
              </p>

              <span className="myfarm-management-status">
                Add observation →
              </span>

            </button>

            <button
              type="button"
              className="myfarm-management-card"
              onClick={() => handleManagementCard("nutrients")}
            >

              <div className="myfarm-management-icon">
                🧪
              </div>

              <h3>
                Nutrients
              </h3>

              <p>
                Keep track of nutrient-related observations.
              </p>

              <span className="myfarm-management-status">
                Add observation →
              </span>

            </button>

            <button
              type="button"
              className="myfarm-management-card"
              onClick={() => handleManagementCard("pests")}
            >

              <div className="myfarm-management-icon">
                🐛
              </div>

              <h3>
                Pests & Disease
              </h3>

              <p>
                Record unusual symptoms or crop problems.
              </p>

              <span className="myfarm-management-status">
                Check crop →
              </span>

            </button>

            <button
              type="button"
              className="myfarm-management-card"
              onClick={() => handleManagementCard("field")}
            >

              <div className="myfarm-management-icon">
                🌤️
              </div>

              <h3>
                Field Conditions
              </h3>

              <p>
                Keep observations about your field conditions.
              </p>

              <span className="myfarm-management-status">
                Add observation →
              </span>

            </button>

          </div>

        </section>

        {/* NOTES */}
        <section className="myfarm-section">

          <div className="myfarm-section-heading">

            <div>

              <h2>
                📝 Farm observations
              </h2>

              <p>
                Write anything important about your crop or field.
              </p>

            </div>

          </div>

          <div className="myfarm-notes-card">

            <textarea
              className="myfarm-notes-textarea"
              value={notes}
              onChange={(event) => {
                setNotes(event.target.value);
                setNotesSaved(false);
              }}
              placeholder="Example: Checked the field today. Soil feels dry near the eastern side..."
            />

            <div className="myfarm-notes-footer">

              <span>
                {notes.length} characters
              </span>

              <button
                type="button"
                onClick={saveNotes}
              >
                {notesSaved
                  ? "✓ Notes Saved"
                  : "Save Notes"}
              </button>

            </div>

          </div>

        </section>

        {/* FINANCE */}
        <section className="myfarm-section">

          <div className="myfarm-section-heading">

            <div>

              <h2>
                💰 Farm finances
              </h2>

              <p>
                Financial tracking will grow here as you record farm activities.
              </p>

            </div>

          </div>

          <div className="myfarm-finance-grid">

            <button
              type="button"
              className="myfarm-finance-card"
              onClick={() => handleFinanceCard("expenses")}
            >

              <h3>
                Expenses
              </h3>

              <p>
                Track what you spend on your farm.
              </p>

              <div className="myfarm-finance-row">
                <span>Seeds</span>
                <strong>Not added</strong>
              </div>

              <div className="myfarm-finance-row">
                <span>Fertilizer / inputs</span>
                <strong>Not added</strong>
              </div>

              <div className="myfarm-finance-row">
                <span>Labour</span>
                <strong>Not added</strong>
              </div>

              <div className="myfarm-finance-total">
                <span>Total expenses</span>
                <strong>₹ —</strong>
              </div>

            </button>

            <button
              type="button"
              className="myfarm-finance-card"
              onClick={() => handleFinanceCard("income")}
            >

              <h3>
                Income
              </h3>

              <p>
                Record harvest and selling information later.
              </p>

              <div className="myfarm-finance-row">
                <span>Expected harvest</span>
                <strong>Not added</strong>
              </div>

              <div className="myfarm-finance-row">
                <span>Expected price</span>
                <strong>Not added</strong>
              </div>

              <div className="myfarm-finance-row">
                <span>Market / buyer</span>
                <strong>Not added</strong>
              </div>

              <div className="myfarm-finance-total">
                <span>Income</span>
                <strong>₹ —</strong>
              </div>

            </button>

          </div>

        </section>

        {/* ASK AGRION CTA */}
        <section className="myfarm-cta">

          <div className="myfarm-cta-content">

            <div className="myfarm-cta-icon">
              🤖
            </div>

            <div>

              <h2>
                Not sure what to do next?
              </h2>

              <p>
                Ask AGRION about your {farm.crop.toLowerCase()} crop,
                farm observations or next step.
              </p>

            </div>

          </div>

          <button
            type="button"
            className="myfarm-ask-button"
            onClick={() =>
              askAGRION(
                `What should I do next for my ${farm.crop} crop based on my farm information?`
              )
            }
          >
            💬 Ask AGRION
          </button>

        </section>

        {/* REMINDER */}
        <section className="myfarm-section">

          <div className="myfarm-info-card">

            <div className="myfarm-info-top">

              <div className="myfarm-info-icon">
                ⚠️
              </div>

              <div>
                <h3>
                  AGRION Reminder
                </h3>

                <p>
                  Use farm information as support, not as a replacement for local expertise.
                </p>
              </div>

            </div>

            <p style={{ lineHeight: "1.7" }}>
              Farming decisions can depend on local soil,
              weather, crop variety, crop stage and field
              conditions. For important decisions, verify
              information with reliable local agricultural
              guidance or an agricultural professional.
            </p>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="myfarm-footer">

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

export default MyFarm;