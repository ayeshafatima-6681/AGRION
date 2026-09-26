import { useState } from "react";
import "./Profile.css";

const DEFAULT_PROFILE = {
  name: "AGRION User",
  role: "Farmer",
  location: "India",
  bio: "Building a better farming journey with AGRION.",
  phone: "",
  email: "",
};

function Profile({
  onBack,
  onLogout,
  onAsk,
  onSettings,
  onNotifications,
  onMyFarm,
  onCropJourney,
  onCommunity,
  onLearn,
  onMarket,
  onOrganic,
}) {
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile =
        localStorage.getItem("agrionProfile");

      return savedProfile
        ? {
            ...DEFAULT_PROFILE,
            ...JSON.parse(savedProfile),
          }
        : DEFAULT_PROFILE;
    } catch (error) {
      console.error(
        "Could not load AGRION profile:",
        error
      );

      return DEFAULT_PROFILE;
    }
  });

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(
        "agrionProfile",
        JSON.stringify(profile)
      );

      setSaved(true);
      setEditing(false);
    } catch (error) {
      console.error(
        "Could not save AGRION profile:",
        error
      );
    }
  };

  const handleCancel = () => {
    try {
      const savedProfile =
        localStorage.getItem("agrionProfile");

      setProfile(
        savedProfile
          ? {
              ...DEFAULT_PROFILE,
              ...JSON.parse(savedProfile),
            }
          : DEFAULT_PROFILE
      );
    } catch (error) {
      setProfile(DEFAULT_PROFILE);
    }

    setEditing(false);
    setSaved(false);
  };

  const handleAsk = () => {
    if (onAsk) {
      onAsk();
    }
  };

  const handleSettings = () => {
    if (onSettings) {
      onSettings();
    }
  };

  const handleNotifications = () => {
    if (onNotifications) {
      onNotifications();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  /*
   * PROFILE JOURNEY NAVIGATION
   *
   * These handlers connect the existing
   * Profile cards to the existing AGRION pages.
   */

  const handleMyFarm = () => {
    if (onMyFarm) {
      onMyFarm();
    }
  };

  const handleLearning = () => {
    if (onLearn) {
      onLearn();
    }
  };

  const handleCommunity = () => {
    if (onCommunity) {
      onCommunity();
    }
  };

  const handleMarket = () => {
    if (onMarket) {
      onMarket();
    }
  };

  const handleOrganic = () => {
    if (onOrganic) {
      onOrganic();
    }
  };

  const handleCropJourney = () => {
    if (onCropJourney) {
      onCropJourney();
    }
  };

  /*
   * Allows the journey cards to work with
   * keyboard navigation as well.
   */
  const handleCardKeyDown = (event, action) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      if (action) {
        action();
      }
    }
  };

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="profile-page">
      <header className="profile-navbar">
        <button
          type="button"
          className="profile-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="profile-brand">
          <div className="profile-brand-icon">
            🌱
          </div>

          <div>
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>
        </div>

        <div className="profile-nav-label">
          👤 Profile
        </div>
      </header>

      <main className="profile-main">
        <section className="profile-hero">
          <div className="profile-hero-left">
            <span className="profile-eyebrow">
              AGRION MEMBER
            </span>

            <h1>Your farming profile.</h1>

            <p>
              Keep your AGRION profile ready for your farming,
              learning and community journey.
            </p>
          </div>

          <div className="profile-hero-symbol">
            🌾
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card-top">
            <div className="profile-avatar">
              {initials || "A"}
            </div>

            <div className="profile-identity">
              <h2>{profile.name}</h2>

              <div className="profile-meta">
                <span>🌱 {profile.role}</span>
                <span>📍 {profile.location}</span>
              </div>
            </div>

            {!editing && (
              <button
                type="button"
                className="profile-edit-btn"
                onClick={() => {
                  setEditing(true);
                  setSaved(false);
                }}
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>

          {saved && (
            <div className="profile-success">
              ✓ Profile saved on this device.
            </div>
          )}

          {editing ? (
            <div className="profile-form">
              <div className="profile-form-grid">
                <label>
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </label>

                <label>
                  Role
                  <select
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                  >
                    <option value="Farmer">
                      Farmer
                    </option>

                    <option value="Student">
                      Student
                    </option>

                    <option value="Learner">
                      Learner
                    </option>
                  </select>
                </label>

                <label>
                  Location
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    placeholder="City / State"
                  />
                </label>

                <label>
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                  />
                </label>

                <label className="profile-full-field">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Email address"
                  />
                </label>

                <label className="profile-full-field">
                  About you
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell AGRION a little about you"
                  />
                </label>
              </div>

              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="profile-save-btn"
                  onClick={handleSave}
                >
                  ✓ Save Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="profile-about">
                <span>ABOUT</span>

                <p>{profile.bio}</p>
              </div>

              <div className="profile-info-grid">
                <div>
                  <span>📍 Location</span>

                  <strong>
                    {profile.location || "Not added"}
                  </strong>
                </div>

                <div>
                  <span>📞 Phone</span>

                  <strong>
                    {profile.phone || "Not added"}
                  </strong>
                </div>

                <div>
                  <span>✉️ Email</span>

                  <strong>
                    {profile.email || "Not added"}
                  </strong>
                </div>

                <div>
                  <span>🌱 AGRION Role</span>

                  <strong>{profile.role}</strong>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <span>YOUR AGRION JOURNEY</span>

            <h2>Keep growing with AGRION.</h2>

            <p>
              Your profile will eventually connect your activity
              across the AGRION platform.
            </p>
          </div>

          <div className="profile-progress-grid">

            {/* MY FARM */}
            <div
              className="profile-progress-card"
              role="button"
              tabIndex={0}
              onClick={handleMyFarm}
              onKeyDown={(event) =>
                handleCardKeyDown(
                  event,
                  handleMyFarm
                )
              }
            >
              <div>🌾</div>

              <span>MY FARM</span>

              <strong>Farm information</strong>

              <p>
                Your farms, crops and farming activities will appear here.
              </p>
            </div>

            {/* LEARNING */}
            <div
              className="profile-progress-card"
              role="button"
              tabIndex={0}
              onClick={handleLearning}
              onKeyDown={(event) =>
                handleCardKeyDown(
                  event,
                  handleLearning
                )
              }
            >
              <div>📚</div>

              <span>LEARNING</span>

              <strong>Learning progress</strong>

              <p>
                Track lessons and knowledge you build through AGRION.
              </p>
            </div>

            {/* COMMUNITY */}
            <div
              className="profile-progress-card"
              role="button"
              tabIndex={0}
              onClick={handleCommunity}
              onKeyDown={(event) =>
                handleCardKeyDown(
                  event,
                  handleCommunity
                )
              }
            >
              <div>👥</div>

              <span>COMMUNITY</span>

              <strong>Your activity</strong>

              <p>
                Your future posts, crop journeys and community activity.
              </p>
            </div>

            {/* MARKET */}
            <div
              className="profile-progress-card"
              role="button"
              tabIndex={0}
              onClick={handleMarket}
              onKeyDown={(event) =>
                handleCardKeyDown(
                  event,
                  handleMarket
                )
              }
            >
              <div>🛒</div>

              <span>MARKET</span>

              <strong>Selling journey</strong>

              <p>
                Your future products, buyers and selling activity.
              </p>
            </div>

          </div>
        </section>

        <section className="profile-account">
          <div>
            <span>ACCOUNT</span>

            <h2>Manage your AGRION account</h2>

            <p>
              Manage your account preferences, notifications,
              privacy and AGRION experience.
            </p>
          </div>

          <div className="profile-account-actions">
            <button
              type="button"
              className="profile-settings-btn"
              onClick={handleSettings}
            >
              ⚙️ Settings
            </button>

            <button
              type="button"
              className="profile-settings-btn"
              onClick={handleNotifications}
            >
              🔔 Notifications
            </button>

            <button
              type="button"
              className="profile-logout-btn"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </section>

        <section className="profile-ask">
          <div className="profile-ask-icon">
            🤖
          </div>

          <div>
            <span>NEED HELP?</span>

            <h2>Ask AGRION</h2>

            <p>
              Ask AGRION anything about farming, crops and your journey.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAsk}
          >
            Ask AGRION →
          </button>
        </section>

        <section className="profile-note">
          <span>🔒</span>

          <div>
            <strong>Your information</strong>

            <p>
              This frontend currently stores profile information locally
              on your device. Secure account storage and authentication
              will be implemented in the backend.
            </p>
          </div>
        </section>
      </main>

      <footer className="profile-footer">
        <strong>🌱 AGRION</strong>

        <p>From Seed to Market</p>

        <small>
          Better farming begins with better understanding. 🌿
        </small>
      </footer>
    </div>
  );
}

export default Profile;