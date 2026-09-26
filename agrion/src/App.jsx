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
  const [page, setPage] = useState(() => {
    const loggedIn =
      localStorage.getItem("agrionLoggedIn");

    return loggedIn === "true"
      ? "home"
      : "welcome";
  });

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
   * LANGUAGE SYNC
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
   * PROACTIVE AGRION
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
   * PROACTIVE AGRION
   * React to AGRION context changes
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
   * AGRION AUTOMATIC REMINDERS
   *
   * Generates reminders once per day
   * using the user's AGRION context.
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

  const handleInteractionChoice = (
    mode
  ) => {
    setInteractionMode(mode);

    localStorage.setItem(
      "agrionInteractionMode",
      mode
    );

    setPage("onboarding");
  };

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

    setPage("welcome");
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);

    if (role === "kids") {
      setPage("kids");
      return;
    }

    setPage("signup");
  };

  const handleLoginSuccess = () => {
    localStorage.setItem(
      "agrionLoggedIn",
      "true"
    );

    setPage("home");
  };

  const handleSignUpSuccess = () => {
    localStorage.setItem(
      "agrionLoggedIn",
      "true"
    );

    setPage("home");
  };

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

    setPage("interactionChoice");
  };

  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop);
    setPage("cropJourney");
  };

  const handleBackToHome = () => {
    setPage("home");
  };

  /*
   * PROACTIVE AGRION ACTIONS
   */
  const handleProactiveAction = (
    action
  ) => {
    switch (action) {
      case "Complete My Farm":
        setPage("myFarm");
        break;

      case "Choose a Crop":
        setPage("cropSelection");
        break;

      case "Review Crop Journey":
        setPage("cropJourney");
        break;

      case "Review My Farm":
        setPage("myFarm");
        break;

      case "Check Weather":
        // Weather page will be connected later.
        break;

      case "Ask AGRION":
        setPage("ask");
        break;

      default:
        break;
    }
  };

  const renderPage = () => {
    switch (page) {
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
              setPage("login")
            }
          />
        );

      case "onboarding":
        return (
          <AgrionOnboarding
            mode={interactionMode}
            onBack={() =>
              setPage(
                "interactionChoice"
              )
            }
            onComplete={
              handleOnboardingComplete
            }
          />
        );

      case "welcome":
        return (
          <Welcome
            onGetStarted={() =>
              setPage("role")
            }
            onLogin={() =>
              setPage("login")
            }
          />
        );

      case "role":
        return (
          <RoleSelection
            onBack={() =>
              setPage("welcome")
            }
            onSelectRole={
              handleSelectRole
            }
          />
        );

      case "login":
        return (
          <Login
            onBack={() =>
              setPage("welcome")
            }
            onSignUp={() =>
              setPage("role")
            }
            onLoginSuccess={
              handleLoginSuccess
            }
            onForgotPassword={() =>
              setPage(
                "forgotPassword"
              )
            }
          />
        );

      case "signup":
        return (
          <SignUp
            role={selectedRole}
            interactionMode={
              interactionMode
            }
            onBack={() =>
              setPage("role")
            }
            onLogin={() =>
              setPage("login")
            }
            onSignUpSuccess={
              handleSignUpSuccess
            }
          />
        );

      case "forgotPassword":
        return (
          <ForgotPassword
            onBack={() =>
              setPage("login")
            }
            onLogin={() =>
              setPage("login")
            }
          />
        );

      /*
       * HOME
       */
      case "home":
        return (
          <Home
            onGrow={() =>
              setPage(
                "cropSelection"
              )
            }
            onCropProblem={() =>
              setPage(
                "cropProblem"
              )
            }
            onAsk={() =>
              setPage("ask")
            }
            onMyFarm={() =>
              setPage("myFarm")
            }
            onCommunity={() =>
              setPage("community")
            }
            onMarket={() =>
              setPage("market")
            }
            onLearn={() =>
              setPage("learn")
            }
            onKids={() =>
              setPage("kids")
            }
            onOrganic={() =>
              setPage("organic")
            }
            onProfile={() =>
              setPage("profile")
            }
          />
        );

      /*
       * ASK AGRION
       */
      case "ask":
        return (
          <AskAgrion
            onBack={
              handleBackToHome
            }
            onGrow={() =>
              setPage(
                "cropSelection"
              )
            }
            onCropProblem={() =>
              setPage(
                "cropProblem"
              )
            }
            onMyFarm={() =>
              setPage("myFarm")
            }
            onMarket={() =>
              setPage("market")
            }
            onLearn={() =>
              setPage("learn")
            }
            onOrganic={() =>
              setPage("organic")
            }
          />
        );

      /*
       * CROP PROBLEM
       */
      case "cropProblem":
        return (
          <CropProblem
            onBack={
              handleBackToHome
            }
            onAsk={() =>
              setPage("ask")
            }
          />
        );

      /*
       * COMMUNITY
       */
      case "community":
        return (
          <Community
            onBack={
              handleBackToHome
            }
            onReels={() =>
              setPage("reels")
            }
          />
        );

      /*
       * REELS
       */
      case "reels":
        return (
          <Reels
            onBack={() =>
              setPage("community")
            }
          />
        );

      /*
       * MARKET / SELL
       */
      case "market":
        return (
          <Market
            onBack={
              handleBackToHome
            }
            onAsk={() =>
              setPage("ask")
            }
          />
        );

      /*
       * LEARN
       */
      case "learn":
        return (
          <Learn
            onBack={
              handleBackToHome
            }
            onAsk={() =>
              setPage("ask")
            }
          />
        );

      /*
       * KIDS ZONE
       */
      case "kids":
        return (
          <KidsZone
            onBack={
              handleBackToHome
            }
          />
        );

      /*
       * ORGANIC FARMING
       */
      case "organic":
        return (
          <OrganicFarming
            onBack={
              handleBackToHome
            }
            onAsk={() =>
              setPage("ask")
            }
          />
        );

      /*
       * MY FARM
       */
      case "myFarm":
        return (
          <MyFarm
            crop={selectedCrop}
            onBack={
              handleBackToHome
            }
            onContinue={() =>
              setPage(
                "cropJourney"
              )
            }
            onCheckCrop={() =>
              setPage(
                "cropProblem"
              )
            }
            onSelectCrop={() =>
              setPage(
                "cropSelection"
              )
            }
            onAsk={() =>
              setPage("ask")
            }
          />
        );

      /*
       * PROFILE
       *
       * Added navigation handlers only.
       * Existing functionality is preserved.
       */
      case "profile":
        return (
          <Profile
            onBack={
              handleBackToHome
            }

            onMyFarm={() =>
              setPage("myFarm")
            }

            onCropJourney={() =>
              setPage(
                "cropJourney"
              )
            }

            onCommunity={() =>
              setPage(
                "community"
              )
            }

            onLearn={() =>
              setPage("learn")
            }

            onMarket={() =>
              setPage("market")
            }

            onOrganic={() =>
              setPage("organic")
            }

            onSettings={() =>
              setPage("settings")
            }

            onNotifications={() =>
              setPage(
                "notifications"
              )
            }

            onLogout={
              handleLogout
            }
          />
        );

      /*
       * SETTINGS
       */
      case "settings":
        return (
          <Settings
            onBack={() =>
              setPage("profile")
            }
            onProfile={() =>
              setPage("profile")
            }
            onLogout={
              handleLogout
            }
          />
        );

      /*
       * NOTIFICATIONS
       */
      case "notifications":
        return (
          <Notifications
            onBack={() =>
              setPage("profile")
            }
          />
        );

      /*
       * CROP SELECTION
       */
      case "cropSelection":
        return (
          <CropSelection
            onBack={
              handleBackToHome
            }
            onSelectCrop={
              handleSelectCrop
            }
          />
        );

      /*
       * CROP JOURNEY
       */
      case "cropJourney":
        return (
          <CropJourney
            crop={selectedCrop}
            onBack={() =>
              setPage(
                "cropSelection"
              )
            }
            onAsk={() =>
              setPage("ask")
            }
          />
        );

      /*
       * CROP STAGE DETAIL
       */
      case "cropStageDetail":
        return (
          <CropStageDetail
            crop={selectedCrop}
            onBack={() =>
              setPage(
                "cropJourney"
              )
            }
            onAsk={() =>
              setPage("ask")
            }
          />
        );

      /*
       * FALLBACK
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
              setPage("login")
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