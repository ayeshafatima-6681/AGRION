import { useEffect, useState } from "react";

import InteractionChoice from "./pages/InteractionChoice";
import AgrionOnboarding from "./pages/AgrionOnboarding";

import Welcome from "./pages/Welcome";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import AskAgrion from "./pages/AskAgrion";
import Community from "./pages/Community";
import Reels from "./pages/Reels";
import CropProblem from "./pages/CropProblem";
import Market from "./pages/Market";
import Learn from "./pages/Learn";
import KidsZone from "./pages/KidsZone";
import OrganicFarming from "./pages/OrganicFarming";
import MyFarm from "./pages/MyFarm";
import Profile from "./pages/Profile";
import CropSelection from "./pages/CropSelection";
import CropStageDetail from "./pages/CropStageDetail";
import CropJourney from "./pages/CropJourney";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import ProactiveAgrionCard from "./components/ProactiveAgrionCard";

import VoiceAssistantButton from "./components/VoiceAssistantButton";

import {
  generateAgrionRemindersOnce,
} from "./data/notificationReminders";

import {
  generateProactiveSuggestion,
} from "./data/proactiveAgrion";

function App() {
  /*
   * ---------------------------------------------------------
   * INITIAL PAGE
   * ---------------------------------------------------------
   */
  const getInitialPage = () => {
    const loggedIn =
      localStorage.getItem("agrionLoggedIn");

    return loggedIn === "true"
      ? "home"
      : "welcome";
  };

  const [page, setPage] = useState(
    getInitialPage
  );

  /*
   * ---------------------------------------------------------
   * NAVIGATION HISTORY
   *
   * This is the important fix.
   *
   * Example:
   *
   * home
   *   ↓
   * myFarm
   *   ↓
   * cropProblem
   *
   * Back:
   * cropProblem → myFarm
   *
   * Back:
   * myFarm → home
   * ---------------------------------------------------------
   */
  const [pageHistory, setPageHistory] = useState(
    () => [getInitialPage()]
  );

  /*
   * ---------------------------------------------------------
   * GO TO PAGE
   *
   * Use this instead of setPage() when moving forward.
   * ---------------------------------------------------------
   */
  const navigate = (nextPage) => {
    if (!nextPage || nextPage === page) {
      return;
    }

    setPageHistory((currentHistory) => [
      ...currentHistory,
      nextPage,
    ]);

    setPage(nextPage);
  };

  /*
   * ---------------------------------------------------------
   * GO BACK
   *
   * Removes the current page from history and returns
   * to the previous page.
   * ---------------------------------------------------------
   */
  const goBack = () => {
    setPageHistory((currentHistory) => {
      if (currentHistory.length <= 1) {
        return currentHistory;
      }

      const newHistory =
        currentHistory.slice(0, -1);

      const previousPage =
        newHistory[newHistory.length - 1];

      setPage(previousPage);

      return newHistory;
    });
  };

  /*
   * ---------------------------------------------------------
   * RESET NAVIGATION
   *
   * Used after login/logout so old pages do not remain
   * inside the navigation history.
   * ---------------------------------------------------------
   */
  const resetNavigation = (newPage) => {
    setPage(newPage);
    setPageHistory([newPage]);
  };

  /*
   * ---------------------------------------------------------
   * LANGUAGE
   * ---------------------------------------------------------
   */
  const [selectedRole, setSelectedRole] =
    useState("");

  const [selectedCrop, setSelectedCrop] =
    useState("");

  const [interactionMode, setInteractionMode] =
    useState(
      () =>
        localStorage.getItem(
          "agrionInteractionMode"
        ) || ""
    );

  const [language, setLanguage] =
    useState(
      () =>
        localStorage.getItem(
          "agrionLanguage"
        ) || "en-IN"
    );

  const [agrionUser, setAgrionUser] =
    useState({
      name: "",
    });

  /*
   * ---------------------------------------------------------
   * LANGUAGE SYNC
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const handleLanguageChange = (
      event
    ) => {
      const newLanguage =
        event.detail?.language;

      if (!newLanguage) return;

      setLanguage(newLanguage);

      localStorage.setItem(
        "agrionLanguage",
        newLanguage
      );
    };

    window.addEventListener(
      "agrionLanguageChanged",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener(
        "agrionLanguageChanged",
        handleLanguageChange
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * PROACTIVE AGRION
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "agrionLoggedIn"
      );

    if (loggedIn !== "true") {
      return;
    }

    generateProactiveSuggestion();
  }, []);

  /*
   * ---------------------------------------------------------
   * PROACTIVE AGRION
   * React to AGRION context changes
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "agrionLoggedIn"
      );

    if (loggedIn !== "true") {
      return;
    }

    const handleAgrionContextChange = () => {
      generateProactiveSuggestion();
    };

    window.addEventListener(
      "agrionContextChanged",
      handleAgrionContextChange
    );

    return () => {
      window.removeEventListener(
        "agrionContextChanged",
        handleAgrionContextChange
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * AGRION AUTOMATIC REMINDERS
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "agrionLoggedIn"
      );

    if (loggedIn !== "true") {
      return;
    }

    generateAgrionRemindersOnce();
  }, []);

  /*
   * ---------------------------------------------------------
   * INTERACTION CHOICE
   * ---------------------------------------------------------
   */
  const handleInteractionChoice = (
    mode
  ) => {
    setInteractionMode(mode);

    localStorage.setItem(
      "agrionInteractionMode",
      mode
    );

    navigate("onboarding");
  };

  /*
   * ---------------------------------------------------------
   * ONBOARDING
   * ---------------------------------------------------------
   */
  const handleOnboardingComplete = (
    userData
  ) => {
    setAgrionUser(userData);

    if (userData.language) {
      setLanguage(userData.language);

      localStorage.setItem(
        "agrionLanguage",
        userData.language
      );
    }

    localStorage.setItem(
      "agrionUser",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "agrionInteractionMode",
      interactionMode
    );

    localStorage.setItem(
      "agrionUserName",
      userData.name
    );

    navigate("welcome");
  };

  /*
   * ---------------------------------------------------------
   * ROLE
   * ---------------------------------------------------------
   */
  const handleSelectRole = (role) => {
    setSelectedRole(role);

    if (role === "kids") {
      navigate("kids");
      return;
    }

    navigate("signup");
  };

  /*
   * ---------------------------------------------------------
   * LOGIN
   * ---------------------------------------------------------
   */
  const handleLoginSuccess = () => {
    localStorage.setItem(
      "agrionLoggedIn",
      "true"
    );

    resetNavigation("home");
  };

  /*
   * ---------------------------------------------------------
   * SIGN UP
   * ---------------------------------------------------------
   */
  const handleSignUpSuccess = () => {
    localStorage.setItem(
      "agrionLoggedIn",
      "true"
    );

    resetNavigation("home");
  };

  /*
   * ---------------------------------------------------------
   * LOGOUT
   * ---------------------------------------------------------
   */
  const handleLogout = () => {
    setInteractionMode("");
    setSelectedRole("");
    setSelectedCrop("");
    setLanguage("en-IN");

    setAgrionUser({
      name: "",
    });

    localStorage.removeItem(
      "agrionUser"
    );

    localStorage.removeItem(
      "agrionInteractionMode"
    );

    localStorage.removeItem(
      "agrionLoggedIn"
    );

    localStorage.removeItem(
      "agrionUserName"
    );

    localStorage.removeItem(
      "agrionLanguage"
    );

    resetNavigation(
      "interactionChoice"
    );
  };

  /*
   * ---------------------------------------------------------
   * CROP SELECTION
   * ---------------------------------------------------------
   */
  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop);
    navigate("cropJourney");
  };

  /*
   * ---------------------------------------------------------
   * PROACTIVE AGRION ACTIONS
   * ---------------------------------------------------------
   */
  const handleProactiveAction = (
    action
  ) => {
    switch (action) {
      case "Complete My Farm":
        navigate("myFarm");
        break;

      case "Choose a Crop":
        navigate("cropSelection");
        break;

      case "Review Crop Journey":
        navigate("cropJourney");
        break;

      case "Review My Farm":
        navigate("myFarm");
        break;

      case "Check Weather":
        // Weather page will be connected later.
        break;

      case "Ask AGRION":
        navigate("ask");
        break;

      default:
        break;
    }
  };

  /*
   * ---------------------------------------------------------
   * RENDER PAGE
   * ---------------------------------------------------------
   */
  const renderPage = () => {
    switch (page) {
      /*
       * INTERACTION CHOICE
       */
      case "interactionChoice":
        return (
          <InteractionChoice
            onVoice={() =>
              handleInteractionChoice(
                "voice"
              )
            }
            onText={() =>
              handleInteractionChoice(
                "text"
              )
            }
            onLogin={() =>
              navigate("login")
            }
          />
        );

      /*
       * ONBOARDING
       */
      case "onboarding":
        return (
          <AgrionOnboarding
            mode={interactionMode}
            onBack={goBack}
            onComplete={
              handleOnboardingComplete
            }
          />
        );

      /*
       * WELCOME
       */
      case "welcome":
        return (
          <Welcome
            onGetStarted={() =>
              navigate("role")
            }
            onLogin={() =>
              navigate("login")
            }
          />
        );

      /*
       * ROLE
       */
      case "role":
        return (
          <RoleSelection
            onBack={goBack}
            onSelectRole={
              handleSelectRole
            }
          />
        );

      /*
       * LOGIN
       */
      case "login":
        return (
          <Login
            onBack={goBack}
            onSignUp={() =>
              navigate("role")
            }
            onLoginSuccess={
              handleLoginSuccess
            }
            onForgotPassword={() =>
              navigate(
                "forgotPassword"
              )
            }
          />
        );

      /*
       * SIGN UP
       */
      case "signup":
        return (
          <SignUp
            role={selectedRole}
            interactionMode={
              interactionMode
            }
            onBack={goBack}
            onLogin={() =>
              navigate("login")
            }
            onSignUpSuccess={
              handleSignUpSuccess
            }
          />
        );

      /*
       * FORGOT PASSWORD
       */
      case "forgotPassword":
        return (
          <ForgotPassword
            onBack={goBack}
            onLogin={() =>
              navigate("login")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * HOME
       * ---------------------------------------------------
       */
      case "home":
        return (
          <Home
            onGrow={() =>
              navigate(
                "cropSelection"
              )
            }
            onCropProblem={() =>
              navigate(
                "cropProblem"
              )
            }
            onAsk={() =>
              navigate("ask")
            }
            onMyFarm={() =>
              navigate("myFarm")
            }
            onCommunity={() =>
              navigate("community")
            }
            onMarket={() =>
              navigate("market")
            }
            onLearn={() =>
              navigate("learn")
            }
            onKids={() =>
              navigate("kids")
            }
            onOrganic={() =>
              navigate("organic")
            }
            onProfile={() =>
              navigate("profile")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * ASK AGRION
       * ---------------------------------------------------
       */
      case "ask":
        return (
          <AskAgrion
            onBack={goBack}
            onGrow={() =>
              navigate(
                "cropSelection"
              )
            }
            onCropProblem={() =>
              navigate(
                "cropProblem"
              )
            }
            onMyFarm={() =>
              navigate("myFarm")
            }
            onMarket={() =>
              navigate("market")
            }
            onLearn={() =>
              navigate("learn")
            }
            onOrganic={() =>
              navigate("organic")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * CROP PROBLEM
       * ---------------------------------------------------
       */
      case "cropProblem":
        return (
          <CropProblem
            onBack={goBack}
            onAsk={() =>
              navigate("ask")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * COMMUNITY
       * ---------------------------------------------------
       */
      case "community":
        return (
          <Community
            onBack={goBack}
            onReels={() =>
              navigate("reels")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * REELS
       * ---------------------------------------------------
       */
      case "reels":
        return (
          <Reels
            onBack={goBack}
          />
        );

      /*
       * ---------------------------------------------------
       * MARKET / SELL
       * ---------------------------------------------------
       */
      case "market":
        return (
          <Market
            onBack={goBack}
            onAsk={() =>
              navigate("ask")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * LEARN
       * ---------------------------------------------------
       */
      case "learn":
        return (
          <Learn
            onBack={goBack}
            onAsk={() =>
              navigate("ask")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * KIDS ZONE
       * ---------------------------------------------------
       */
      case "kids":
        return (
          <KidsZone
            onBack={goBack}
          />
        );

      /*
       * ---------------------------------------------------
       * ORGANIC FARMING
       * ---------------------------------------------------
       */
      case "organic":
        return (
          <OrganicFarming
            onBack={goBack}
            onAsk={() =>
              navigate("ask")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * MY FARM
       * ---------------------------------------------------
       */
      case "myFarm":
        return (
          <MyFarm
            crop={selectedCrop}
            onBack={goBack}
            onContinue={() =>
              navigate(
                "cropJourney"
              )
            }
            onCheckCrop={() =>
              navigate(
                "cropProblem"
              )
            }
            onSelectCrop={() =>
              navigate(
                "cropSelection"
              )
            }
            onAsk={() =>
              navigate("ask")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * PROFILE
       * ---------------------------------------------------
       */
      case "profile":
        return (
          <Profile
            onBack={goBack}

            onMyFarm={() =>
              navigate("myFarm")
            }

            onCropJourney={() =>
              navigate(
                "cropJourney"
              )
            }

            onCommunity={() =>
              navigate(
                "community"
              )
            }

            onLearn={() =>
              navigate("learn")
            }

            onMarket={() =>
              navigate("market")
            }

            onOrganic={() =>
              navigate("organic")
            }

            onSettings={() =>
              navigate("settings")
            }

            onNotifications={() =>
              navigate(
                "notifications"
              )
            }

            onLogout={
              handleLogout
            }
          />
        );

      /*
       * ---------------------------------------------------
       * SETTINGS
       * ---------------------------------------------------
       */
      case "settings":
        return (
          <Settings
            onBack={goBack}
            onProfile={() =>
              navigate("profile")
            }
            onLogout={
              handleLogout
            }
          />
        );

      /*
       * ---------------------------------------------------
       * NOTIFICATIONS
       * ---------------------------------------------------
       */
      case "notifications":
        return (
          <Notifications
            onBack={goBack}
          />
        );

      /*
       * ---------------------------------------------------
       * CROP SELECTION
       * ---------------------------------------------------
       */
      case "cropSelection":
        return (
          <CropSelection
            onBack={goBack}
            onSelectCrop={
              handleSelectCrop
            }
          />
        );

      /*
       * ---------------------------------------------------
       * CROP JOURNEY
       * ---------------------------------------------------
       */
      case "cropJourney":
        return (
          <CropJourney
            crop={selectedCrop}
            onBack={goBack}
            onAsk={() =>
              navigate("ask")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * CROP STAGE DETAIL
       * ---------------------------------------------------
       */
      case "cropStageDetail":
        return (
          <CropStageDetail
            crop={selectedCrop}
            onBack={goBack}
            onAsk={() =>
              navigate("ask")
            }
          />
        );

      /*
       * ---------------------------------------------------
       * FALLBACK
       * ---------------------------------------------------
       */
      default:
        return (
          <InteractionChoice
            onVoice={() =>
              handleInteractionChoice(
                "voice"
              )
            }
            onText={() =>
              handleInteractionChoice(
                "text"
              )
            }
            onLogin={() =>
              navigate("login")
            }
          />
        );
    }
  };

  return (
    <>
      {renderPage()}

      {interactionMode === "voice" && (
        <VoiceAssistantButton />
      )}

      <ProactiveAgrionCard
        onAction={
          handleProactiveAction
        }
      />
    </>
  );
}

export default App;