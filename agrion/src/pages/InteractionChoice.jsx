import "./InteractionChoice.css";

function InteractionChoice({ onVoice, onText, onLogin }) {
  return (
    <div className="interaction-page">
      <main className="interaction-container">
        <section className="interaction-card">

          <div className="interaction-logo">
            <div className="interaction-logo-icon">
              🌱
            </div>

            <div>
              <strong>AGRION</strong>
              <span>From Seed to Market</span>
            </div>
          </div>

          <div className="interaction-content">

            <div className="interaction-welcome-icon">
              🌾
            </div>

            <div className="interaction-badge">
              SMART FARMING • BETTER FUTURE
            </div>

            <h1>Welcome to AGRION</h1>

            <p>
              How would you like to continue?
            </p>

            <div className="interaction-options">

              <button
                type="button"
                className="interaction-option"
                onClick={onVoice}
              >
                <div className="interaction-option-icon">
                  🎤
                </div>

                <div className="interaction-option-text">
                  <strong>Continue with Voice</strong>

                  <span>
                    Talk to AGRION naturally
                  </span>
                </div>

                <div className="interaction-arrow">
                  →
                </div>
              </button>

              <button
                type="button"
                className="interaction-option"
                onClick={onText}
              >
                <div className="interaction-option-icon">
                  ⌨️
                </div>

                <div className="interaction-option-text">
                  <strong>Continue with Text</strong>

                  <span>
                    Type and chat with AGRION
                  </span>
                </div>

                <div className="interaction-arrow">
                  →
                </div>
              </button>

            </div>

            <div className="interaction-note">
              🔒 Your interaction preference can be changed later.
            </div>

          </div>

          <div className="interaction-login">
            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={onLogin}
            >
              Sign in
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}

export default InteractionChoice;