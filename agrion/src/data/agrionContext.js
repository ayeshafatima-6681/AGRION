const AGRION_CONTEXT_STORAGE_KEY =
  "agrionContext";

const AGRION_CONTEXT_CHANGED_EVENT =
  "agrionContextChanged";

const DEFAULT_AGRION_CONTEXT = {
  user: {
    name: "",
    role: "",
    language: "en-IN",
    interactionMode: "text",
  },

  farm: {
    location: "",
    farmSize: "",
    soilType: "",
    waterSource: "",
    irrigationMethod: "",
    farmingExperience: "",
    farmingGoal: "",
  },

  crop: {
    name: "",
    variety: "",
    stage: "",
    season: "",
    plantingDate: "",
    expectedHarvestDate: "",
  },

  weather: {
    temperature: null,
    humidity: null,
    rainfall: null,
    windSpeed: null,
    forecast: [],
    lastUpdated: "",
  },

  history: {
    previousQuestions: [],
    completedTasks: [],
    missedTasks: [],
    cropActivities: [],
    previousProblems: [],
  },
};

export const getDefaultAgrionContext = () => {
  return JSON.parse(
    JSON.stringify(DEFAULT_AGRION_CONTEXT)
  );
};

export const getAgrionContext = () => {
  try {
    const storedContext =
      localStorage.getItem(
        AGRION_CONTEXT_STORAGE_KEY
      );

    if (!storedContext) {
      return getDefaultAgrionContext();
    }

    const parsedContext = JSON.parse(
      storedContext
    );

    const defaultContext =
      getDefaultAgrionContext();

    return {
      ...defaultContext,
      ...parsedContext,

      user: {
        ...defaultContext.user,
        ...(parsedContext.user || {}),
      },

      farm: {
        ...defaultContext.farm,
        ...(parsedContext.farm || {}),
      },

      crop: {
        ...defaultContext.crop,
        ...(parsedContext.crop || {}),
      },

      weather: {
        ...defaultContext.weather,
        ...(parsedContext.weather || {}),
      },

      history: {
        ...defaultContext.history,
        ...(parsedContext.history || {}),
      },
    };
  } catch (error) {
    console.error(
      "Could not load AGRION context:",
      error
    );

    return getDefaultAgrionContext();
  }
};

export const saveAgrionContext = (context) => {
  try {
    localStorage.setItem(
      AGRION_CONTEXT_STORAGE_KEY,
      JSON.stringify(context)
    );

    window.dispatchEvent(
      new CustomEvent(
        AGRION_CONTEXT_CHANGED_EVENT
      )
    );

    return true;
  } catch (error) {
    console.error(
      "Could not save AGRION context:",
      error
    );

    return false;
  }
};

export const updateAgrionContext = (
  updates
) => {
  const currentContext =
    getAgrionContext();

  const updatedContext = {
    ...currentContext,
    ...updates,

    user: {
      ...currentContext.user,
      ...(updates.user || {}),
    },

    farm: {
      ...currentContext.farm,
      ...(updates.farm || {}),
    },

    crop: {
      ...currentContext.crop,
      ...(updates.crop || {}),
    },

    weather: {
      ...currentContext.weather,
      ...(updates.weather || {}),
    },

    history: {
      ...currentContext.history,
      ...(updates.history || {}),
    },
  };

  saveAgrionContext(updatedContext);

  return updatedContext;
};

export const addAgrionQuestionToHistory = (
  question
) => {
  if (!question?.trim()) {
    return getAgrionContext();
  }

  const context = getAgrionContext();

  const updatedHistory = [
    ...context.history.previousQuestions,
    {
      question: question.trim(),
      date: new Date().toISOString(),
    },
  ];

  return updateAgrionContext({
    history: {
      previousQuestions:
        updatedHistory.slice(-20),
    },
  });
};

export const setAgrionCropContext = (
  cropData
) => {
  return updateAgrionContext({
    crop: {
      ...cropData,
    },
  });
};

export const setAgrionFarmContext = (
  farmData
) => {
  return updateAgrionContext({
    farm: {
      ...farmData,
    },
  });
};

export const setAgrionUserContext = (
  userData
) => {
  return updateAgrionContext({
    user: {
      ...userData,
    },
  });
};

export const setAgrionWeatherContext = (
  weatherData
) => {
  return updateAgrionContext({
    weather: {
      ...weatherData,
      lastUpdated:
        new Date().toISOString(),
    },
  });
};

export const clearAgrionContext = () => {
  localStorage.removeItem(
    AGRION_CONTEXT_STORAGE_KEY
  );

  window.dispatchEvent(
    new CustomEvent(
      AGRION_CONTEXT_CHANGED_EVENT
    )
  );

  return getDefaultAgrionContext();
};

export {
  AGRION_CONTEXT_STORAGE_KEY,
  AGRION_CONTEXT_CHANGED_EVENT,
};

export default DEFAULT_AGRION_CONTEXT;