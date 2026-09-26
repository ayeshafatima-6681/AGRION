import { useState } from "react";
import "./Settings.css";

import LanguageSelector from "../components/LanguageSelector";
import { getLanguageByCode } from "../data/languages";

const DEFAULT_SETTINGS = {
  notifications: true,
  weatherAlerts: true,
  cropReminders: true,
  communityUpdates: false,
  language: "English",
  voiceLanguage: "English",
  voiceInput: true,
  locationPreference: true,
  lowDataMode: false,
};

function Settings({ onBack, onProfile, onLogout }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("agrionSettings");

      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_SETTINGS;
    } catch (error) {
      console.error(
        "Could not load AGRION settings:",
        error
      );

      return DEFAULT_SETTINGS;
    }
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (name, value) => {
    setSettings((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(
        "agrionSettings",
        JSON.stringify(settings)
      );

      setSaved(true);
    } catch (error) {
      console.error(
        "Could not save AGRION settings:",
        error
      );
    }
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);

    localStorage.setItem(
      "agrionSettings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    setSaved(true);
  };

  return (
    <div className="settings-page">
      <header className="settings-navbar">
        <button
          type="button"
          className="settings-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="settings-brand">
          <div className="settings-brand-icon">
            🌱
          </div>

          <div>
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>
        </div>

        <div className="settings-nav-label">
          ⚙️ Settings
        </div>
      </header>

      <main className="settings-main">
        <section className="settings-hero">
          <div>
            <span className="settings-eyebrow">
              AGRION PREFERENCES
            </span>

            <h1>Make AGRION work for you.</h1>

            <p>
              Manage how AGRION communicates with you and
              how your farming experience works.
            </p>
          </div>

          <div className="settings-hero-symbol">
            ⚙️
          </div>
        </section>

        {saved && (
          <div className="settings-success">
            ✓ Your settings are saved on this device.
          </div>
        )}

        {/* LANGUAGE */}
        <section className="settings-section">
          <div className="settings-section-heading">
            <span>LANGUAGE & VOICE</span>
            <h2>Talk to AGRION your way.</h2>
          </div>

          <div className="settings-card">
            <div className="settings-row">
              <div className="settings-row-icon">
                🌐
              </div>

              <div className="settings-row-content">
                <strong>App language</strong>

                <p>
                  Choose the language you want to use in AGRION.
                </p>
              </div>

              <LanguageSelector
                onLanguageChange={(languageCode) => {
                  const language =
                    getLanguageByCode(languageCode);

                  updateSetting(
                    "language",
                    language.name
                  );
                }}
              />
            </div>

            <div className="settings-divider" />

            <div className="settings-row">
              <div className="settings-row-icon">
                🎤
              </div>

              <div className="settings-row-content">
                <strong>Voice language</strong>

                <p>
                  Language AGRION should use for voice interaction.
                </p>
              </div>

              <select
                value={settings.voiceLanguage}
                onChange={(event) =>
                  updateSetting(
                    "voiceLanguage",
                    event.target.value
                  )
                }
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Kannada</option>
                <option>Telugu</option>
                <option>Tamil</option>
                <option>Malayalam</option>
                <option>Marathi</option>
                <option>Bengali</option>
              </select>
            </div>

            <div className="settings-divider" />

            <SettingToggle
              icon="🎙️"
              title="Voice input"
              description="Allow AGRION to use browser voice input when available."
              checked={settings.voiceInput}
              onChange={(value) =>
                updateSetting("voiceInput", value)
              }
            />
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="settings-section">
          <div className="settings-section-heading">
            <span>NOTIFICATIONS</span>
            <h2>Stay informed.</h2>
          </div>

          <div className="settings-card">
            <SettingToggle
              icon="🔔"
              title="Notifications"
              description="Allow AGRION to show useful notifications."
              checked={settings.notifications}
              onChange={(value) =>
                updateSetting("notifications", value)
              }
            />

            <div className="settings-divider" />

            <SettingToggle
              icon="🌦️"
              title="Weather alerts"
              description="Receive important weather-related alerts."
              checked={settings.weatherAlerts}
              onChange={(value) =>
                updateSetting("weatherAlerts", value)
              }
            />

            <div className="settings-divider" />

            <SettingToggle
              icon="🌱"
              title="Crop reminders"
              description="Receive reminders about crop activities."
              checked={settings.cropReminders}
              onChange={(value) =>
                updateSetting("cropReminders", value)
              }
            />

            <div className="settings-divider" />

            <SettingToggle
              icon="👥"
              title="Community updates"
              description="Receive updates from the AGRION community."
              checked={settings.communityUpdates}
              onChange={(value) =>
                updateSetting("communityUpdates", value)
              }
            />
          </div>
        </section>

        {/* LOCATION & DATA */}
        <section className="settings-section">
          <div className="settings-section-heading">
            <span>LOCATION & DATA</span>
            <h2>Control your experience.</h2>
          </div>

          <div className="settings-card">
            <SettingToggle
              icon="📍"
              title="Location preference"
              description="Allow AGRION to use location when you choose to provide it."
              checked={settings.locationPreference}
              onChange={(value) =>
                updateSetting(
                  "locationPreference",
                  value
                )
              }
            />

            <div className="settings-divider" />

            <SettingToggle
              icon="📶"
              title="Low-data mode"
              description="Reduce data usage when using AGRION with limited internet."
              checked={settings.lowDataMode}
              onChange={(value) =>
                updateSetting("lowDataMode", value)
              }
            />
          </div>
        </section>

        {/* PRIVACY */}
        <section className="settings-section">
          <div className="settings-section-heading">
            <span>PRIVACY & SECURITY</span>
            <h2>Your information matters.</h2>
          </div>

          <div className="settings-info-card">
            <div className="settings-info-icon">
              🔒
            </div>

            <div>
              <strong>Local frontend storage</strong>

              <p>
                Your current profile and settings are stored
                locally in this browser. Secure cloud storage,
                authentication, account recovery and stronger
                privacy controls will be connected when
                AGRION's backend is built.
              </p>
            </div>
          </div>
        </section>

        {/* ACTIONS */}
        <section className="settings-actions">
          <button
            type="button"
            className="settings-reset-btn"
            onClick={resetSettings}
          >
            Reset Settings
          </button>

          <button
            type="button"
            className="settings-save-btn"
            onClick={saveSettings}
          >
            ✓ Save Settings
          </button>
        </section>

        <section className="settings-account-actions">
          <button
            type="button"
            onClick={onProfile}
          >
            👤 Back to Profile
          </button>

          <button
            type="button"
            className="settings-logout-btn"
            onClick={onLogout}
          >
            Log Out
          </button>
        </section>
      </main>

      <footer className="settings-footer">
        <strong>🌱 AGRION</strong>

        <p>From Seed to Market</p>

        <small>
          Better farming begins with better understanding. 🌿
        </small>
      </footer>
    </div>
  );
}

function SettingToggle({
  icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="settings-row">
      <div className="settings-row-icon">
        {icon}
      </div>

      <div className="settings-row-content">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`settings-toggle ${
          checked ? "active" : ""
        }`}
        onClick={() => onChange(!checked)}
        aria-label={title}
        aria-pressed={checked}
      >
        <span />
      </button>
    </div>
  );
}

export default Settings;