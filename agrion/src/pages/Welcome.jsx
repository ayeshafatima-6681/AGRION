import "./Welcome.css";

function Welcome({ onGetStarted, onLogin }) {
  return (
    <div className="welcome-page">

      {/* Decorative background elements */}
      <div className="welcome-glow welcome-glow-one"></div>
      <div className="welcome-glow welcome-glow-two"></div>

      <main className="welcome-container">

        {/* Brand */}

        <div className="welcome-brand">

          <div className="welcome-logo">
            🌱
          </div>

          <div className="welcome-brand-text">
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>

        </div>

        {/* Main content */}

        <section className="welcome-content">

          <div className="welcome-label">
            🌾 SMART FARMING • BETTER FUTURE
          </div>

          <h1>
            Grow better.
            <br />
            <span>Live better.</span>
          </h1>

          <p>
            AGRION brings farming knowledge, crop guidance,
            farm management, community and markets together
            in one simple platform.
          </p>

          {/* Buttons */}

          <div className="welcome-actions">

            <button
              className="welcome-get-started"
              type="button"
              onClick={onGetStarted}
            >
              🌱 Get Started
              <span>→</span>
            </button>

            <button
              className="welcome-login"
              type="button"
              onClick={onLogin}
            >
              Login
            </button>

          </div>

          <p className="welcome-note">
            Start your farming journey with AGRION.
          </p>

        </section>

        {/* Visual */}

        <section className="welcome-visual">

          <div className="welcome-main-circle">

            <div className="welcome-field">
              🌾
            </div>

          </div>

          <div className="welcome-floating-card welcome-card-one">
            <span>🌱</span>
            <div>
              <strong>Grow Smarter</strong>
              <small>Better farming decisions</small>
            </div>
          </div>

          <div className="welcome-floating-card welcome-card-two">
            <span>💧</span>
            <div>
              <strong>Manage Better</strong>
              <small>Care for every crop</small>
            </div>
          </div>

          <div className="welcome-floating-card welcome-card-three">
            <span>🛒</span>
            <div>
              <strong>Sell Better</strong>
              <small>Connect with markets</small>
            </div>
          </div>

        </section>

        {/* Bottom journey preview */}

        <section className="welcome-journey">

          <div className="welcome-journey-item">
            <span>🌱</span>
            <strong>Seed</strong>
          </div>

          <i>→</i>

          <div className="welcome-journey-item">
            <span>🌾</span>
            <strong>Grow</strong>
          </div>

          <i>→</i>

          <div className="welcome-journey-item">
            <span>💧</span>
            <strong>Manage</strong>
          </div>

          <i>→</i>

          <div className="welcome-journey-item">
            <span>🌾</span>
            <strong>Harvest</strong>
          </div>

          <i>→</i>

          <div className="welcome-journey-item">
            <span>🛒</span>
            <strong>Market</strong>
          </div>

        </section>

        {/* Footer note */}

        <div className="welcome-footer">
          AGRION • From Seed to Market 🌱
        </div>

      </main>

    </div>
  );
}

export default Welcome;