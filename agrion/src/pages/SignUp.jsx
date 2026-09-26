import { useState } from "react";
import "./SignUp.css";

function SignUp({
  onBack,
  onLogin,
  onSignUpSuccess,
  role,
  interactionMode,
}) {
  const [fullName, setFullName] = useState(
    () => localStorage.getItem("agrionUserName") || ""
  );

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [otpSent, setOtpSent] = useState(false);

  const [agree, setAgree] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phone.trim() || phone.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError(
        "Please accept the terms and privacy policy."
      );
      return;
    }

    setOtpSent(true);

    setSuccess(
      "OTP sent to your mobile number. Use 123456 for this frontend demo."
    );
  };

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);

    if (digit && index < 5) {
      document
        .getElementById(`signup-otp-${index + 1}`)
        ?.focus();
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      document
        .getElementById(`signup-otp-${index - 1}`)
        ?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      document
        .getElementById(`signup-otp-${index - 1}`)
        ?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < 5
    ) {
      document
        .getElementById(`signup-otp-${index + 1}`)
        ?.focus();
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const updatedOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pasted.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const focusIndex = Math.min(pasted.length, 5);

    document
      .getElementById(`signup-otp-${focusIndex}`)
      ?.focus();
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    if (enteredOtp !== "123456") {
      setError(
        "Invalid OTP. Please enter 123456 for this demo."
      );
      return;
    }

    try {
      const existingProfile = JSON.parse(
        localStorage.getItem("agrionProfile") || "{}"
      );

      const updatedProfile = {
        ...existingProfile,
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role:
          role === "student"
            ? "Student"
            : "Farmer",
        interactionMode:
          interactionMode ||
          localStorage.getItem(
            "agrionInteractionMode"
          ) ||
          "text",
        language:
          existingProfile.language ||
          "English",
        onboardingCompleted: true,
      };

      localStorage.setItem(
        "agrionProfile",
        JSON.stringify(updatedProfile)
      );

      localStorage.setItem(
        "agrionUserName",
        fullName.trim()
      );

      localStorage.setItem(
        "agrionInteractionMode",
        interactionMode ||
          localStorage.getItem(
            "agrionInteractionMode"
          ) ||
          "text"
      );

      localStorage.setItem(
        "agrionLoggedIn",
        "true"
      );

      setSuccess(
        "Your AGRION account is ready. Welcome to AGRION!"
      );

      setTimeout(() => {
        onSignUpSuccess();
      }, 700);
    } catch (storageError) {
      console.error(
        "Could not save AGRION profile:",
        storageError
      );

      onSignUpSuccess();
    }
  };

  const handleResendOtp = () => {
    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setError("");

    setSuccess(
      "A new OTP has been sent. Use 123456 for this frontend demo."
    );

    setTimeout(() => {
      document
        .getElementById("signup-otp-0")
        ?.focus();
    }, 50);
  };

  const handleChangePhone = () => {
    setOtpSent(false);

    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setError("");
    setSuccess("");
  };

  const roleTitle =
    role === "student"
      ? "Student account"
      : "Farmer account";

  const roleDescription =
    role === "student"
      ? "Create your account and start learning with AGRION."
      : "Create your account and start building your farming journey.";

  return (
    <div className="signup-page">

      <div className="signup-decoration signup-decoration-one"></div>
      <div className="signup-decoration signup-decoration-two"></div>

      <main className="signup-container">

        <section className="signup-card">

          <button
            className="signup-back-button"
            onClick={onBack}
            type="button"
          >
            ← Back
          </button>

          <div className="signup-brand">

            <div className="signup-logo-icon">
              🌱
            </div>

            <div>
              <strong>AGRION</strong>
              <span>From Seed to Market</span>
            </div>

          </div>

          <div className="signup-heading">

            <span className="signup-badge">
              {role === "student"
                ? "🎓"
                : "👨‍🌾"}{" "}
              {roleTitle}
            </span>

            <h1>Join AGRION</h1>

            <p>{roleDescription}</p>

          </div>

          {!otpSent ? (
            <form
              className="signup-form"
              onSubmit={handleSendOtp}
            >

              <div className="signup-field">

                <label htmlFor="signup-name">
                  Full name
                </label>

                <div className="signup-input-wrapper">
                  <span>👤</span>

                  <input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(
                        event.target.value
                      )
                    }
                    autoComplete="name"
                  />
                </div>

              </div>

              <div className="signup-field">

                <label htmlFor="signup-email">
                  Email address
                </label>

                <div className="signup-input-wrapper">
                  <span>✉️</span>

                  <input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    autoComplete="email"
                  />
                </div>

              </div>

              <div className="signup-field">

                <label htmlFor="signup-phone">
                  Mobile number
                </label>

                <div className="signup-input-wrapper">
                  <span>📱</span>

                  <input
                    id="signup-phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      )
                    }
                    maxLength="10"
                    autoComplete="tel"
                  />
                </div>

                <small>
                  We'll use this number for OTP
                  verification.
                </small>

              </div>

              <div className="signup-field">

                <label htmlFor="signup-password">
                  Password
                </label>

                <div className="signup-input-wrapper">

                  <span>🔒</span>

                  <input
                    id="signup-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

                <small>
                  Use at least 6 characters.
                </small>

              </div>

              <div className="signup-field">

                <label htmlFor="signup-confirm-password">
                  Confirm password
                </label>

                <div className="signup-input-wrapper">
                  <span>🔐</span>

                  <input
                    id="signup-confirm-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                  />
                </div>

              </div>

              <label className="signup-checkbox">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) =>
                    setAgree(
                      event.target.checked
                    )
                  }
                />

                <span>
                  I agree to AGRION's terms and
                  privacy policy.
                </span>

              </label>

              {error && (
                <div className="signup-error">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="signup-success">
                  ✓ {success}
                </div>
              )}

              <button
                type="submit"
                className="signup-submit"
              >
                Create Account
                <span>→</span>
              </button>

              <div className="signup-login">

                <p>
                  Already have an account?
                </p>

                <button
                  onClick={onLogin}
                  type="button"
                >
                  Sign in to AGRION
                </button>

              </div>

              <div className="signup-security">

                <span>🔐</span>

                <p>
                  Your password will be securely
                  protected when AGRION's backend
                  authentication is connected.
                </p>

              </div>

            </form>
          ) : (
            <form
              className="signup-form"
              onSubmit={handleVerifyOtp}
            >

              <div className="signup-otp-heading">

                <div className="signup-otp-icon">
                  📱
                </div>

                <h2>
                  Verify your mobile number
                </h2>

                <p>
                  Enter the 6-digit OTP sent to
                  <strong>
                    {" "}
                    +91 {phone}
                  </strong>
                </p>

              </div>

              <div className="signup-field">

                <label>
                  Verification code
                </label>

                <div
                  className="signup-otp-boxes"
                  onPaste={handleOtpPaste}
                >
                  {otp.map(
                    (digit, index) => (
                      <input
                        key={index}
                        id={`signup-otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(event) =>
                          handleOtpChange(
                            event.target.value,
                            index
                          )
                        }
                        onKeyDown={(event) =>
                          handleOtpKeyDown(
                            event,
                            index
                          )
                        }
                        autoComplete={
                          index === 0
                            ? "one-time-code"
                            : "off"
                        }
                        autoFocus={
                          index === 0
                        }
                      />
                    )
                  )}
                </div>

                <small>
                  Frontend demo OTP:{" "}
                  <strong>123456</strong>
                </small>

              </div>

              {error && (
                <div className="signup-error">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="signup-success">
                  ✓ {success}
                </div>
              )}

              <button
                type="submit"
                className="signup-submit"
              >
                Verify & Create Account
                <span>→</span>
              </button>

              <div className="signup-otp-actions">

                <button
                  type="button"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>

                <button
                  type="button"
                  onClick={handleChangePhone}
                >
                  Change number
                </button>

              </div>

              <div className="signup-security">

                <span>🔐</span>

                <p>
                  Your role and interaction
                  preference are already saved.
                  You do not need to choose them again.
                </p>

              </div>

            </form>
          )}

        </section>

      </main>

    </div>
  );
}

export default SignUp;