import { useState } from "react";
import "./VoiceAssistantButton.css";

function VoiceAssistantButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bottom Talk Button */}
      <div className="agrion-voice-assistant">
        <button
          type="button"
          className="agrion-voice-button"
          onClick={() => setOpen(true)}
        >
          <div className="agrion-voice-icon">🎤</div>

          <div className="agrion-voice-content">
            <strong>Talk to AGRION</strong>
            <span>Tap to speak</span>
          </div>

          <div className="agrion-voice-pulse">
            <span></span>
          </div>
        </button>
      </div>

      {/* Voice Panel */}
      {open && (
        <div className="agrion-voice-overlay">
          <div className="agrion-voice-panel">

            <button
              type="button"
              className="agrion-voice-close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            <div className="agrion-voice-panel-logo">
              🌱
            </div>

            <div className="agrion-voice-panel-title">
              <span>AGRION</span>
              <h2>Voice Assistant</h2>
            </div>

            <div className="agrion-voice-orb">
              <div>🎙️</div>
            </div>

            <h3>Talk to AGRION</h3>

            <p>
              Ask me anything about farming, crops, soil,
              irrigation, pests, markets and more.
            </p>

            <button
              type="button"
              className="agrion-big-mic"
            >
              🎤
            </button>

            <span className="agrion-mic-label">
              Tap to speak
            </span>

          </div>
        </div>
      )}
    </>
  );
}

export default VoiceAssistantButton;