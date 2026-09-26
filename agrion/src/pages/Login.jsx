import { useState } from "react";
import "./Login.css";

function Login({
  onBack,
  onSignUp,
  onLoginSuccess,
  onForgotPassword,
}) {
  const [loginMethod, setLoginMethod] = useState("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handlePasswordLogin = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateEmail()) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    // Frontend demo authentication.
    // Real authentication will be connected through Supabase later.
    localStorage.setItem("agrionLoggedIn", "true");

    setSuccess("Login successful. Welcome back to AGRION!");

    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 500);
  };

  const handleSendOtp = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateEmail()) {
      setError("Please enter a valid email address.");
      return;
    }

    setOtpSent(true);
    setOtp(["", "", "", "", "", ""]);

    setSuccess(
      "OTP sent to your email. Use 123456 for this frontend demo."
    );
  };

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);

    if (digit && index < 5) {
      document.getElementById(`login-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      document.getElementById(`login-otp-${index - 1}`)?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      document.getElementById(`login-otp-${index - 1}`)?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < 5
    ) {
      document.getElementById(`login-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const updatedOtp = ["", "", "", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const focusIndex = Math.min(pasted.length, 5);

    document
      .getElementById(`login-otp-${focusIndex}`)
      ?.focus();
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    if (enteredOtp !== "123456") {
      setError("Invalid OTP. Please enter 123456 for this demo.");
      return;
    }

    localStorage.setItem("agrionLoggedIn", "true");

    setSuccess("OTP verified successfully!");

    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 500);
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess(
      "A new OTP has been sent. Use 123456 for this frontend demo."
    );

    setTimeout(() => {
      document.getElementById("login-otp-0")?.focus();
    }, 50);
  };

  const handleChangeEmail = () => {
    setOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess("");
  };

  return (
    <div className="login-page">

      <div className="login-background-circle login-circle-one"></div>
      <div className="login-background-circle login-circle-two"></div>

      <main className="login-container">

        <section className="login-card">

          <button
            className="login-back-button"
            onClick={onBack}
            type="button"
          >
            ← Back
          </button>

          <div className="login-brand">
            <div className="login-logo-icon">
              🌱
            </div>

            <div>
              <strong>AGRION</strong>
              <span>From Seed to Market</span>
            </div>
          </div>

          <div className="login-heading">

            <span className="login-small-badge">
              👋 AGRION account
            </span>

            <h1>Welcome back</h1>

            <p>
              Sign in to continue your journey with AGRION.
            </p>

          </div>

          {!otpSent && (
            <div className="login-method-switch">

              <button
                type="button"
                className={
                  loginMethod === "password"
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setLoginMethod("password");
                  setError("");
                  setSuccess("");
                }}
              >
                🔐 Password
              </button>

              <button
                type="button"
                className={
                  loginMethod === "otp"
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setLoginMethod("otp");
                  setError("");
                  setSuccess("");
                }}
              >
                📱 OTP
              </button>

            </div>
          )}

          {!otpSent && loginMethod === "password" && (
            <form
              className="login-form"
              onSubmit={handlePasswordLogin}
            >

              <div className="login-field">

                <label htmlFor="login-email">
                  Email address
                </label>

                <div className="login-input-wrapper">
                  <span>✉️</span>

                  <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="email"
                  />
                </div>

              </div>

              <div className="login-field">

                <div className="login-label-row">

                  <label htmlFor="login-password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="login-forgot-link"
                    onClick={onForgotPassword}
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="login-input-wrapper">

                  <span>🔒</span>

                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label="Show or hide password"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>

              {error && (
                <div className="login-error">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="login-success">
                  ✓ {success}
                </div>
              )}

              <button
                type="submit"
                className="login-submit-button"
              >
                Sign In
                <span>→</span>
              </button>

              <div className="login-alternate">

                <span>Want passwordless login?</span>

                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("otp");
                    setError("");
                    setSuccess("");
                  }}
                >
                  Use OTP instead
                </button>

              </div>

            </form>
          )}

          {!otpSent && loginMethod === "otp" && (
            <form
              className="login-form"
              onSubmit={handleSendOtp}
            >

              <div className="login-field">

                <label htmlFor="login-otp-email">
                  Email address
                </label>

                <div className="login-input-wrapper">
                  <span>✉️</span>

                  <input
                    id="login-otp-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="email"
                  />
                </div>

                <small>
                  We'll send a one-time verification code
                  to your email.
                </small>

              </div>

              {error && (
                <div className="login-error">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="login-success">
                  ✓ {success}
                </div>
              )}

              <button
                type="submit"
                className="login-submit-button"
              >
                Send OTP
                <span>→</span>
              </button>

              <div className="login-alternate">

                <span>Remember your password?</span>

                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("password");
                    setError("");
                    setSuccess("");
                  }}
                >
                  Use password
                </button>

              </div>

            </form>
          )}

          {otpSent && (
            <form
              className="login-form"
              onSubmit={handleVerifyOtp}
            >

              <div className="login-otp-heading">

                <div className="login-otp-icon">
                  ✉️
                </div>

                <h2>Verify your email</h2>

                <p>
                  Enter the 6-digit OTP sent to
                  <strong> {email}</strong>
                </p>

              </div>

              <div className="login-field">

                <label>
                  Verification code
                </label>

                <div
                  className="login-otp-boxes"
                  onPaste={handleOtpPaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`login-otp-${index}`}
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
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                <small>
                  Frontend demo OTP:{" "}
                  <strong>123456</strong>
                </small>

              </div>

              {error && (
                <div className="login-error">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="login-success">
                  ✓ {success}
                </div>
              )}

              <button
                type="submit"
                className="login-submit-button"
              >
                Verify & Continue
                <span>→</span>
              </button>

              <div className="login-otp-actions">

                <button
                  type="button"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>

                <button
                  type="button"
                  onClick={handleChangeEmail}
                >
                  Change email
                </button>

              </div>

            </form>
          )}

          <div className="login-divider">
            <span>or</span>
          </div>

          <div className="login-signup">

            <p>
              Don't have an AGRION account?
            </p>

            <button
              onClick={onSignUp}
              type="button"
            >
              Create an AGRION account
            </button>

          </div>

          <div className="login-security-note">

            <span>🔐</span>

            <p>
              Your account is protected with secure
              authentication. Real authentication will be
              connected through Supabase.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Login;