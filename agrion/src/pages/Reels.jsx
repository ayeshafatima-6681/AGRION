import { useState } from "react";
import "./Reels.css";

function Reels({ onBack }) {
  const [activeReel, setActiveReel] = useState(0);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});

  const reels = [
    {
      id: 1,
      farmer: "Ravi Kumar",
      location: "Karnataka",
      crop: "Rice",
      title: "My Rice Crop Journey 🌾",
      description:
        "Sharing an update from my rice field. The crop is progressing well.",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      likes: 248,
      comments: 24,
    },
    {
      id: 2,
      farmer: "Lakshmi",
      location: "Andhra Pradesh",
      crop: "Tomato",
      title: "Tomato Farming Update 🍅",
      description:
        "A quick look at my tomato field and today's farming work.",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      likes: 391,
      comments: 37,
    },
    {
      id: 3,
      farmer: "Manjunath",
      location: "Karnataka",
      crop: "Maize",
      title: "Starting My Maize Journey 🌽",
      description:
        "Today I started my maize crop journey. Follow along from sowing to harvest.",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      likes: 176,
      comments: 18,
    },
  ];

  const currentReel = reels[activeReel];

  const toggleLike = (id) => {
    setLiked((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const toggleSave = (id) => {
    setSaved((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const nextReel = () => {
    setActiveReel((previous) =>
      previous === reels.length - 1 ? 0 : previous + 1
    );
  };

  const previousReel = () => {
    setActiveReel((previous) =>
      previous === 0 ? reels.length - 1 : previous - 1
    );
  };

  return (
    <div className="reels-page">

      {/* Header */}
      <header className="reels-header">

        <button
          className="reels-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="reels-brand">
          <div className="reels-logo">🌱</div>

          <div>
            <h1>AGRION Reels</h1>
            <p>See farming. Share farming. Learn farming.</p>
          </div>
        </div>

        <button className="create-reel-button">
          + Create Reel
        </button>

      </header>

      {/* Main Reel */}
      <main className="reels-main">

        <div className="reel-viewer">

          <video
            key={currentReel.id}
            className="reel-video"
            src={currentReel.video}
            controls
            loop
            playsInline
          />

          <div className="reel-gradient"></div>

          {/* Reel information */}
          <div className="reel-information">

            <div className="reel-farmer">

              <div className="reel-avatar">
                {currentReel.farmer.charAt(0)}
              </div>

              <div>
                <strong>{currentReel.farmer}</strong>
                <span>
                  📍 {currentReel.location}
                </span>
              </div>

              <button className="follow-reel-button">
                Follow
              </button>

            </div>

            <div className="reel-crop">
              🌾 {currentReel.crop}
            </div>

            <h2>{currentReel.title}</h2>

            <p>{currentReel.description}</p>

          </div>

          {/* Actions */}
          <div className="reel-actions">

            <button
              onClick={() => toggleLike(currentReel.id)}
              className={liked[currentReel.id] ? "reel-action active" : "reel-action"}
            >
              <span>
                {liked[currentReel.id] ? "❤️" : "🤍"}
              </span>
              <small>
                {currentReel.likes +
                  (liked[currentReel.id] ? 1 : 0)}
              </small>
            </button>

            <button className="reel-action">
              <span>💬</span>
              <small>{currentReel.comments}</small>
            </button>

            <button
              onClick={() => toggleSave(currentReel.id)}
              className="reel-action"
            >
              <span>
                {saved[currentReel.id] ? "🔖" : "🏷️"}
              </span>
              <small>
                {saved[currentReel.id] ? "Saved" : "Save"}
              </small>
            </button>

            <button className="reel-action">
              <span>↗</span>
              <small>Share</small>
            </button>

          </div>

        </div>

        {/* Navigation */}
        <div className="reel-navigation">

          <button onClick={previousReel}>
            ↑
          </button>

          <div className="reel-indicators">
            {reels.map((reel, index) => (
              <span
                key={reel.id}
                className={
                  index === activeReel ? "active" : ""
                }
                onClick={() => setActiveReel(index)}
              ></span>
            ))}
          </div>

          <button onClick={nextReel}>
            ↓
          </button>

        </div>

      </main>

      {/* Bottom information */}
      <section className="reels-bottom-info">

        <div>
          <span>🌱</span>
          <h3>Learn from Farmers</h3>
          <p>
            Discover real farming experiences, crop journeys,
            practical tips and success stories.
          </p>
        </div>

        <div>
          <span>📖</span>
          <h3>Share Your Journey</h3>
          <p>
            Show your crop journey from seed to harvest and
            inspire other farmers.
          </p>
        </div>

        <div>
          <span>🤝</span>
          <h3>Grow Together</h3>
          <p>
            Learn from the farming community and exchange
            useful ideas.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="reels-footer">
        <strong>AGRION</strong>
        <span>From Seed to Market 🌱</span>
      </footer>

    </div>
  );
}

export default Reels;