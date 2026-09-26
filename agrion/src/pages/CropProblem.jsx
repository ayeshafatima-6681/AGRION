import { useRef, useState } from "react";
import "./CropProblem.css";

function CropProblem({ onBack, onAsk }) {
  const fileInputRef = useRef(null);

  const [selectedCrop, setSelectedCrop] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const crops = [
    { name: "Rice", icon: "🌾" },
    { name: "Wheat", icon: "🌾" },
    { name: "Maize", icon: "🌽" },
    { name: "Tomato", icon: "🍅" },
    { name: "Potato", icon: "🥔" },
    { name: "Onion", icon: "🧅" },
    { name: "Chilli", icon: "🌶️" },
    { name: "Cotton", icon: "🌿" },
  ];

  const stages = [
    "Seedling",
    "Vegetative growth",
    "Flowering",
    "Fruit / grain development",
    "Near harvest",
  ];

  const quickProblems = [
    "Leaves are turning yellow",
    "There are spots on the leaves",
    "Leaves are curling",
    "Plant is not growing well",
    "There are insects on the plant",
    "The plant is wilting",
  ];

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file.");
      return;
    }

    if (image) {
      URL.revokeObjectURL(image);
    }

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setImageName(file.name);
    setAnalysisResult(null);
  };

  const handleRemoveImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setImage(null);
    setImageName("");
    setAnalysisResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleQuickProblem = (problem) => {
    setDescription((current) => {
      if (!current.trim()) {
        return problem;
      }

      return `${current.trim()} ${problem}`;
    });

    setAnalysisResult(null);
  };

  const handleAnalyze = () => {
    if (!selectedCrop && !description.trim() && !image) {
      return;
    }

    const text = description.toLowerCase();

    let possibleIssue = "General crop stress";
    let explanation =
      "The symptoms may have several possible causes. More information is needed before identifying the exact problem.";

    let nextSteps = [
      "Observe the affected plants closely.",
      "Check whether the symptoms are spreading.",
      "Compare affected plants with healthy plants nearby.",
    ];

    if (
      text.includes("yellow") ||
      text.includes("yellowing") ||
      text.includes("pale")
    ) {
      possibleIssue = "Possible nutrient or water-related stress";
      explanation =
        "Yellowing leaves can have different causes, including nutrient imbalance, water stress, root problems, or natural leaf ageing.";
      nextSteps = [
        "Check the soil moisture around the affected plants.",
        "Look at whether older or newer leaves are affected.",
        "Check for additional signs such as spots, pests, or damaged roots.",
      ];
    } else if (
      text.includes("spot") ||
      text.includes("spots") ||
      text.includes("brown") ||
      text.includes("black")
    ) {
      possibleIssue = "Possible leaf disease or environmental damage";
      explanation =
        "Leaf spots can be associated with disease, insect damage, nutrient problems, or environmental stress.";
      nextSteps = [
        "Inspect whether the spots are increasing or spreading.",
        "Check both the upper and lower surfaces of the leaves.",
        "Avoid treating the crop based only on a photo; verify the cause first.",
      ];
    } else if (
      text.includes("insect") ||
      text.includes("bug") ||
      text.includes("pest") ||
      text.includes("worm")
    ) {
      possibleIssue = "Possible pest activity";
      explanation =
        "The description may indicate insect or pest activity, but the exact pest should be identified before treatment.";
      nextSteps = [
        "Check the underside of leaves and young shoots.",
        "Look for eggs, webbing, holes, or sticky residue.",
        "Take a clear close-up photo of the insect or damage.",
      ];
    } else if (
      text.includes("curl") ||
      text.includes("curling") ||
      text.includes("twist")
    ) {
      possibleIssue = "Possible pest, water, or environmental stress";
      explanation =
        "Leaf curling can occur for several reasons, including pests, water stress, heat, or other crop stresses.";
      nextSteps = [
        "Check soil moisture.",
        "Inspect the underside of curled leaves for pests.",
        "Check whether new growth is also affected.",
      ];
    } else if (
      text.includes("wilt") ||
      text.includes("wilting") ||
      text.includes("droop")
    ) {
      possibleIssue = "Possible water or root-related stress";
      explanation =
        "Wilting can result from insufficient water, excessive water, root damage, heat stress, or disease.";
      nextSteps = [
        "Check the soil moisture before adding more water.",
        "Inspect the plant base and nearby soil.",
        "Look for root damage or unusual smell if the plant can be safely inspected.",
      ];
    } else if (
      text.includes("not growing") ||
      text.includes("slow growth") ||
      text.includes("small")
    ) {
      possibleIssue = "Possible growth or nutrient stress";
      explanation =
        "Poor growth can have multiple causes, including nutrition, water, soil conditions, pests, disease, or unsuitable growing conditions.";
      nextSteps = [
        "Check soil moisture and drainage.",
        "Inspect the plant for pests or disease symptoms.",
        "Review recent weather and farm management activities.",
      ];
    }

    setAnalysisResult({
      possibleIssue,
      explanation,
      nextSteps,
    });
  };

  const handleReset = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setSelectedCrop("");
    setDescription("");
    setImage(null);
    setImageName("");
    setSelectedStage("");
    setAnalysisResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAskAGRION = () => {
    if (onAsk) {
      onAsk();
    }
  };

  const hasInput =
    selectedCrop || description.trim() || image;

  return (
    <div className="crop-problem-page">
      {/* NAVBAR */}
      <header className="problem-navbar">
        <button
          type="button"
          className="problem-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="problem-logo">
          <span>🌱</span>

          <div>
            <strong>AGRION</strong>
            <small>From Seed to Market</small>
          </div>
        </div>

        <div className="problem-navbar-status">
          <span className="problem-status-dot"></span>
          Crop Help
        </div>
      </header>

      {/* MAIN */}
      <main className="problem-main">
        {/* HERO */}
        <section className="problem-hero">
          <div className="problem-hero-icon">🔍</div>

          <span className="problem-label">
            CROP HEALTH ASSISTANT
          </span>

          <h1>
            My crop has a
            <br />
            <span>problem.</span>
          </h1>

          <p>
            Show AGRION what is happening to your crop and get
            guidance on what to check next.
          </p>
        </section>

        {/* FORM CARD */}
        <section className="problem-card">
          {/* STEP 1 */}
          <div className="problem-section">
            <div className="problem-section-heading">
              <span className="problem-step">1</span>

              <div>
                <h2>Select your crop</h2>
                <p>Tell us which crop you are growing.</p>
              </div>
            </div>

            <div className="crop-choice-grid">
              {crops.map((crop) => (
                <button
                  type="button"
                  key={crop.name}
                  className={`crop-choice ${
                    selectedCrop === crop.name ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedCrop(crop.name);
                    setAnalysisResult(null);
                  }}
                >
                  <span className="crop-choice-icon">
                    {crop.icon}
                  </span>

                  <span>{crop.name}</span>

                  {selectedCrop === crop.name && (
                    <span className="crop-selected-mark">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="problem-divider"></div>

          {/* STEP 2 */}
          <div className="problem-section">
            <div className="problem-section-heading">
              <span className="problem-step">2</span>

              <div>
                <h2>Upload a crop photo</h2>
                <p>
                  A clear photo can help identify visible crop
                  problems.
                </p>
              </div>
            </div>

            {!image ? (
              <button
                type="button"
                className="upload-box"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                <div className="upload-icon">📷</div>

                <strong>Upload crop photo</strong>

                <span>
                  Click here to choose a photo from your device
                </span>

                <small>JPG, JPEG or PNG</small>
              </button>
            ) : (
              <div className="image-preview-card">
                <img
                  src={image}
                  alt="Selected crop"
                  className="crop-preview-image"
                />

                <div className="image-preview-info">
                  <strong>Photo selected</strong>

                  <span title={imageName}>
                    {imageName}
                  </span>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                  >
                    Remove photo
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleImageChange}
              hidden
            />
          </div>

          <div className="problem-divider"></div>

          {/* STEP 3 */}
          <div className="problem-section">
            <div className="problem-section-heading">
              <span className="problem-step">3</span>

              <div>
                <h2>Describe the problem</h2>
                <p>
                  Tell AGRION what you are noticing in the field.
                </p>
              </div>
            </div>

            <textarea
              className="problem-description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                setAnalysisResult(null);
              }}
              placeholder="Example: The leaves are turning yellow, there are spots on the leaves, or the plant is not growing well..."
              rows="5"
              aria-label="Describe crop problem"
            />

            <div className="description-hint">
              <span>💡</span>

              <span>
                You can mention when the problem started, which
                part of the plant is affected, and whether the
                problem is spreading.
              </span>
            </div>

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {quickProblems.map((problem) => (
                <button
                  key={problem}
                  type="button"
                  onClick={() => handleQuickProblem(problem)}
                  style={{
                    border: "1px solid #dce8de",
                    background: "#f7fbf7",
                    color: "#3d6647",
                    borderRadius: "999px",
                    padding: "8px 12px",
                    fontFamily: "inherit",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {problem}
                </button>
              ))}
            </div>
          </div>

          <div className="problem-divider"></div>

          {/* STEP 4 */}
          <div className="problem-section">
            <div className="problem-section-heading">
              <span className="problem-step">4</span>

              <div>
                <h2>What stage is your crop in?</h2>
                <p>
                  This helps AGRION understand the situation better.
                </p>
              </div>
            </div>

            <select
              value={selectedStage}
              onChange={(event) => {
                setSelectedStage(event.target.value);
                setAnalysisResult(null);
              }}
              className="problem-description"
              style={{
                minHeight: "auto",
                height: "52px",
                resize: "none",
              }}
              aria-label="Select crop stage"
            >
              <option value="">Select crop stage</option>

              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          {/* ANALYZE */}
          <div className="analyze-area">
            <button
              type="button"
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={!hasInput}
            >
              <span>🤖</span>
              Check My Crop
              <span>→</span>
            </button>

            <p>
              Frontend guidance now • AI crop analysis will be
              connected through the backend later.
            </p>
          </div>
        </section>

        {/* RESULT */}
        {analysisResult && (
          <section
            style={{
              marginTop: "26px",
              padding: "28px 30px",
              background: "#ffffff",
              border: "1px solid #d7e8da",
              borderRadius: "23px",
              boxShadow:
                "0 12px 35px rgba(35, 85, 44, 0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  background: "#eaf6ec",
                  fontSize: "1.2rem",
                }}
              >
                🌱
              </div>

              <div>
                <span
                  style={{
                    color: "#448052",
                    fontSize: "0.64rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                  }}
                >
                  AGRION FIRST CHECK
                </span>

                <h2
                  style={{
                    margin: "5px 0",
                    color: "#285433",
                    fontSize: "1.15rem",
                  }}
                >
                  Possible issue: {analysisResult.possibleIssue}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#74867a",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                  }}
                >
                  {selectedCrop
                    ? `${selectedCrop}${
                        selectedStage
                          ? ` • ${selectedStage}`
                          : ""
                      }`
                    : "Crop not selected"}
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "15px",
                background: "#f7fbf7",
                marginBottom: "16px",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#365a3d",
                  fontSize: "0.82rem",
                  marginBottom: "6px",
                }}
              >
                What this may mean
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#718177",
                  fontSize: "0.76rem",
                  lineHeight: 1.6,
                }}
              >
                {analysisResult.explanation}
              </p>
            </div>

            <strong
              style={{
                display: "block",
                color: "#365a3d",
                fontSize: "0.84rem",
                marginBottom: "10px",
              }}
            >
              What to check next
            </strong>

            <div
              style={{
                display: "grid",
                gap: "8px",
              }}
            >
              {analysisResult.nextSteps.map((step, index) => (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "9px",
                    color: "#718177",
                    fontSize: "0.76rem",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: "21px",
                      height: "21px",
                      flex: "0 0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "#eaf6ec",
                      color: "#31804a",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                    }}
                  >
                    {index + 1}
                  </span>

                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                onClick={handleAskAGRION}
                style={{
                  border: "none",
                  borderRadius: "11px",
                  padding: "11px 16px",
                  background: "#216c37",
                  color: "#ffffff",
                  fontFamily: "inherit",
                  fontSize: "0.76rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Ask AGRION →
              </button>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  border: "1px solid #d8e6da",
                  borderRadius: "11px",
                  padding: "11px 16px",
                  background: "#ffffff",
                  color: "#397049",
                  fontFamily: "inherit",
                  fontSize: "0.76rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Check Another Crop
              </button>
            </div>
          </section>
        )}

        {/* WHAT AGRION WILL HELP WITH */}
        <section className="help-section">
          <div className="help-section-heading">
            <span>🌿</span>

            <div>
              <h2>What AGRION will help you check</h2>

              <p>
                AGRION will look at possible signs and guide you
                toward safe next steps.
              </p>
            </div>
          </div>

          <div className="help-grid">
            <div className="help-item">
              <span>🐛</span>
              <strong>Pests</strong>
              <p>Possible insect or pest damage.</p>
            </div>

            <div className="help-item">
              <span>🦠</span>
              <strong>Diseases</strong>
              <p>Visible signs that may indicate disease.</p>
            </div>

            <div className="help-item">
              <span>💧</span>
              <strong>Water stress</strong>
              <p>
                Possible signs of too little or too much water.
              </p>
            </div>

            <div className="help-item">
              <span>🧪</span>
              <strong>Nutrient issues</strong>
              <p>Possible nutrient-related symptoms.</p>
            </div>
          </div>
        </section>

        {/* ASK AGRION */}
        <section className="problem-ask-card">
          <div className="problem-ask-icon">🤖</div>

          <div className="problem-ask-content">
            <span>NEED MORE HELP?</span>

            <h2>Ask AGRION directly</h2>

            <p>
              Describe your farming problem and ask AGRION
              questions about your crop.
            </p>
          </div>

          <button
            type="button"
            className="problem-ask-button"
            onClick={handleAskAGRION}
          >
            Ask AGRION →
          </button>
        </section>

        {/* SAFETY NOTE */}
        <section className="problem-safety">
          <div className="problem-safety-icon">⚠️</div>

          <div>
            <strong>Important safety note</strong>

            <p>
              A photo-based result should not be treated as a
              confirmed diagnosis. Crop symptoms can have different
              causes. Important treatment, pesticide, fertilizer and
              disease decisions should be verified with a qualified
              agricultural professional or trusted local agricultural
              source.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="problem-footer">
        <strong>🌱 AGRION</strong>

        <p>From Seed to Market</p>

        <small>
          Growing knowledge. Growing possibilities.
        </small>
      </footer>
    </div>
  );
}

export default CropProblem;