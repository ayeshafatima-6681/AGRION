import { getAgrionContext } from "./agrionContext";

const PROACTIVE_STORAGE_KEY =
  "agrionProactiveSuggestion";

const PROACTIVE_HISTORY_KEY =
  "agrionProactiveHistory";

const PROACTIVE_COOLDOWN = 24 * 60 * 60 * 1000;

// --------------------------------------------------
// Get all possible proactive suggestions
// --------------------------------------------------

export const getProactiveAgrionSuggestions = () => {
  const context = getAgrionContext();

  const suggestions = [];

  const farm = context.farm || {};
  const crop = context.crop || {};
  const weather = context.weather || {};
  const history = context.history || {};

  // 1. Farm profile
  if (
    !farm.location ||
    !farm.farmSize ||
    !farm.waterSource
  ) {
    suggestions.push({
      id: "complete-farm",
      title: "Complete your farm profile",
      message:
        "Adding your farm details will help AGRION give you more personalized guidance.",
      action: "Complete My Farm",
      priority: 100,
    });
  }

  // 2. Crop selection
  if (!crop.name) {
    suggestions.push({
      id: "choose-crop",
      title: "Start your crop journey",
      message:
        "Choose a crop so AGRION can guide you from seed to market.",
      action: "Choose a Crop",
      priority: 90,
    });
  }

  // 3. Crop stage
  if (crop.name && crop.stage) {
    suggestions.push({
      id: "crop-stage",
      title: "Review your crop journey",
      message:
        `Your ${crop.name} is currently at the ${crop.stage} stage. Check what you should focus on now.`,
      action: "Review Crop Journey",
      priority: 80,
    });
  }

  // 4. Farming goal
  if (farm.farmingGoal) {
    suggestions.push({
      id: "farming-goal",
      title: "Keep moving toward your farming goal",
      message:
        "AGRION can help you continue working toward the goal you selected for your farm.",
      action: "Review My Farm",
      priority: 70,
    });
  }

  // 5. Weather
  if (
    weather.lastUpdated &&
    weather.temperature !== null
  ) {
    suggestions.push({
      id: "weather",
      title: "Check your latest weather information",
      message:
        "Current weather information may help you plan your next farming activity.",
      action: "Check Weather",
      priority: 60,
    });
  }

  // 6. Previous AGRION questions
  if (
    Array.isArray(history.previousQuestions) &&
    history.previousQuestions.length > 0
  ) {
    suggestions.push({
      id: "continue-agrion",
      title: "Continue with AGRION",
      message:
        "You have already started asking AGRION questions. Continue your farming journey whenever you need help.",
      action: "Ask AGRION",
      priority: 50,
    });
  }

  return suggestions;
};

// --------------------------------------------------
// Proactive history
// --------------------------------------------------

const getProactiveHistory = () => {
  try {
    const stored =
      localStorage.getItem(
        PROACTIVE_HISTORY_KEY
      );

    if (!stored) {
      return {};
    }

    const parsed = JSON.parse(stored);

    return parsed && typeof parsed === "object"
      ? parsed
      : {};
  } catch (error) {
    console.error(
      "Could not load proactive AGRION history:",
      error
    );

    return {};
  }
};

const saveProactiveHistory = (history) => {
  try {
    localStorage.setItem(
      PROACTIVE_HISTORY_KEY,
      JSON.stringify(history)
    );
  } catch (error) {
    console.error(
      "Could not save proactive AGRION history:",
      error
    );
  }
};

// --------------------------------------------------
// Check whether suggestion is still in cooldown
// --------------------------------------------------

const isSuggestionInCooldown = (
  suggestionId
) => {
  const history = getProactiveHistory();

  const lastShown =
    history[suggestionId];

  if (!lastShown) {
    return false;
  }

  return (
    Date.now() - lastShown <
    PROACTIVE_COOLDOWN
  );
};

// --------------------------------------------------
// Remember suggestion
// --------------------------------------------------

const rememberSuggestion = (
  suggestionId
) => {
  const history =
    getProactiveHistory();

  history[suggestionId] = Date.now();

  saveProactiveHistory(history);
};

// --------------------------------------------------
// Save current suggestion
// --------------------------------------------------

export const saveProactiveSuggestion = (
  suggestion
) => {
  try {
    if (!suggestion) {
      localStorage.removeItem(
        PROACTIVE_STORAGE_KEY
      );
    } else {
      localStorage.setItem(
        PROACTIVE_STORAGE_KEY,
        JSON.stringify(suggestion)
      );
    }

    window.dispatchEvent(
      new CustomEvent(
        "agrionProactiveSuggestionChanged"
      )
    );
  } catch (error) {
    console.error(
      "Could not save proactive AGRION suggestion:",
      error
    );
  }
};

// --------------------------------------------------
// Get saved suggestion
// --------------------------------------------------

export const getSavedProactiveSuggestion =
  () => {
    try {
      const stored =
        localStorage.getItem(
          PROACTIVE_STORAGE_KEY
        );

      if (!stored) {
        return null;
      }

      return JSON.parse(stored);
    } catch (error) {
      console.error(
        "Could not load proactive AGRION suggestion:",
        error
      );

      return null;
    }
  };

// --------------------------------------------------
// Generate a new suggestion
// --------------------------------------------------

export const generateProactiveSuggestion =
  () => {
    const suggestions =
      getProactiveAgrionSuggestions();

    const availableSuggestions =
      suggestions.filter(
        (suggestion) =>
          !isSuggestionInCooldown(
            suggestion.id
          )
      );

    if (
      availableSuggestions.length === 0
    ) {
      saveProactiveSuggestion(null);
      return null;
    }

    availableSuggestions.sort(
      (a, b) =>
        b.priority - a.priority
    );

    const suggestion =
      availableSuggestions[0];

    rememberSuggestion(
      suggestion.id
    );

    saveProactiveSuggestion(
      suggestion
    );

    return suggestion;
  };

// --------------------------------------------------
// Clear current suggestion
// --------------------------------------------------

export const clearProactiveSuggestion =
  () => {
    localStorage.removeItem(
      PROACTIVE_STORAGE_KEY
    );

    window.dispatchEvent(
      new CustomEvent(
        "agrionProactiveSuggestionChanged"
      )
    );
  };

// --------------------------------------------------
// Clear proactive history
// Useful for testing
// --------------------------------------------------

export const clearProactiveHistory = () => {
  localStorage.removeItem(
    PROACTIVE_HISTORY_KEY
  );

  localStorage.removeItem(
    PROACTIVE_STORAGE_KEY
  );

  window.dispatchEvent(
    new CustomEvent(
      "agrionProactiveSuggestionChanged"
    )
  );
};

// --------------------------------------------------
// Highest priority suggestion
// --------------------------------------------------

export const getHighestPriorityProactiveSuggestion =
  () => {
    const suggestions =
      getProactiveAgrionSuggestions();

    if (!suggestions.length) {
      return null;
    }

    return [...suggestions].sort(
      (a, b) =>
        b.priority - a.priority
    )[0];
  };

export {
  PROACTIVE_STORAGE_KEY,
  PROACTIVE_HISTORY_KEY,
};

export default {
  getProactiveAgrionSuggestions,
  saveProactiveSuggestion,
  getSavedProactiveSuggestion,
  generateProactiveSuggestion,
  clearProactiveSuggestion,
  clearProactiveHistory,
  getHighestPriorityProactiveSuggestion,
};