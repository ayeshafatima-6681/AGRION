import { useEffect, useState } from "react";
import {
  getSavedProactiveSuggestion,
  clearProactiveSuggestion,
} from "../data/proactiveAgrion";

import "./ProactiveAgrionCard.css";

function ProactiveAgrionCard({ onAction }) {
  const [suggestion, setSuggestion] =
    useState(() =>
      getSavedProactiveSuggestion()
    );

  useEffect(() => {
    const handleChange = () => {
      setSuggestion(
        getSavedProactiveSuggestion()
      );
    };

    window.addEventListener(
      "agrionProactiveSuggestionChanged",
      handleChange
    );

    return () => {
      window.removeEventListener(
        "agrionProactiveSuggestionChanged",
        handleChange
      );
    };
  }, []);

  if (!suggestion) {
    return null;
  }

  const handleDismiss = () => {
    clearProactiveSuggestion();
    setSuggestion(null);
  };

  const handleAction = () => {
    if (onAction) {
      onAction(suggestion.action);
    }

    clearProactiveSuggestion();
    setSuggestion(null);
  };

  return (
    <div className="proactive-agrion-card">
      <div className="proactive-agrion-top">
        <div className="proactive-agrion-icon">
          🤖
        </div>

        <div className="proactive-agrion-label">
          <span>PROACTIVE AGRION</span>
          <strong>We noticed something useful.</strong>
        </div>

        <button
          type="button"
          className="proactive-agrion-close"
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>

      <div className="proactive-agrion-content">
        <h3>{suggestion.title}</h3>

        <p>{suggestion.message}</p>
      </div>

      {suggestion.action && (
        <button
          type="button"
          className="proactive-agrion-action"
          onClick={handleAction}
        >
          {suggestion.action} →
        </button>
      )}
    </div>
  );
}

export default ProactiveAgrionCard;