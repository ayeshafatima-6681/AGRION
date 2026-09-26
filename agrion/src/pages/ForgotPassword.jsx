import { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword({ onBack, onLogin }) {
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email.trim()
    );
  };

  const handleSendOtp = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateEmail()) {
      setError("Please enter a valid email address.");
      return;
    }

    setStep("otp");

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
      document
        .getElementById(`forgot-otp-${index + 1}`)
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
        .getElementById(`forgot-otp-${index - 1}`)
        ?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      document
        .getElementById(`forgot-otp-${index - 1}`)
        ?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < 5
    ) {
      document
        .getElementById(`forgot-otp-${index + 1}`)
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
      .getElementById(`forgot-otp-${focusIndex}`)
      ?.focus();
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (otp.join("").length !== 6) {
      setError(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    if (otp.join("") !== "123456") {
      setError(
        "Invalid OTP. Please enter 123456 for this demo."
      );
      return;
    }

    setStep("password");
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStep("success");
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
        .getElementById("forgot-otp-0")
        ?.focus();
    }, 50);
  };

  const handleChangeEmail = () => {
    setStep("email");

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

  return (
    <div className="forgot-page">

      <div className="forgot-circle forgot-circle-one"></div>
      <div className="forgot-circle forgot-circle-two"></div>

      <main className="forgot-container">

        <section className="forgot-card">

          <button
            className="forgot-back-button"
            onClick={
              step === "email"
                ? onBack
                : handleChangeEmail
            }
            type="button"
          >
            ← {step === "email"
              ? "Back to Login"
              : "Back"}
          </button>

          <div className="forgot-brand">

            <div className="forgot-logo">
              🌱
            </div>

            <div>
              <strong>AGRION</strong>
              <span>From Seed to Market</span>
            </div>

          </div>

          {step === "email" && (
            <>
              <div className="forgot-icon">
                🔑
              </div>

              <div className="forgot-heading">

                <h1>Reset your password</h1>

                <p>
                  Enter your AGRION email address
                  and we'll send you a verification
                  code.
                </p>

              </div>

              <form
                className="forgot-form"
                onSubmit={handleSendOtp}
              >

                <div className="forgot-field">

                  <label htmlFor="forgot-email">
                    Email address
                  </label>

                  <div className="forgot-input">

                    <span>✉️</span>

                    <input
                      id="forgot-email"
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

                {error && (
                  <div className="forgot-error">
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="forgot-submit"
                >
                  Send OTP
                  <span>→</span>
                </button>

              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="forgot-icon">
                ✉️
              </div>

              <div className="forgot-heading">

                <h1>Verify your email</h1>

                <p>
                  Enter the 6-digit OTP sent to
                  <strong> {email}</strong>
                </p>

              </div>

              <form
                className="forgot-form"
                onSubmit={handleVerifyOtp}
              >

                <div className="forgot-field">

                  <label>
                    Verification code
                  </label>

                  <div
                    className="forgot-otp-boxes"
                    onPaste={handleOtpPaste}
                  >
                    {otp.map(
                      (digit, index) => (
                        <input
                          key={index}
                          id={`forgot-otp-${index}`}
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
                  <div className="forgot-error">
                    ⚠️ {error}
                  </div>
                )}

                {success && (
                  <div className="forgot-success">
                    ✓ {success}
                  </div>
                )}

                <button
                  type="submit"
                  className="forgot-submit"
                >
                  Verify OTP
                  <span>→</span>
                </button>

                <div className="forgot-otp-actions">

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
            </>
          )}

          {step === "password" && (
            <>
              <div className="forgot-icon">
                🔐
              </div>

              <div className="forgot-heading">

                <h1>Create new password</h1>

                <p>
                  Your email has been verified.
                  Create a new password for your
                  AGRION account.
                </p>

              </div>

              <form
                className="forgot-form"
                onSubmit={handleResetPassword}
              >

                <div className="forgot-field">

                  <label>
                    New password
                  </label>

                  <div className="forgot-input">

                    <span>🔒</span>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(event) =>
                        setNewPassword(
                          event.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="forgot-password-toggle"
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

                </div>

                <div className="forgot-field">

                  <label>
                    Confirm password
                  </label>

                  <div className="forgot-input">

                    <span>🔐</span>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>

                {error && (
                  <div className="forgot-error">
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="forgot-submit"
                >
                  Reset Password
                  <span>→</span>
                </button>

              </form>
            </>
          )}

          {step === "success" && (
            <div className="forgot-success-screen">

              <div className="forgot-success-icon">
                ✓
              </div>

              <h1>Password updated!</h1>

              <p>
                Your AGRION password has been
                successfully updated.
              </p>

              <button
                className="forgot-login-button"
                onClick={onLogin}
                type="button"
              >
                Back to Login
                <span>→</span>
              </button>

            </div>
          )}

          <p className="forgot-security">
            🔐 AGRION keeps your account protected
            with secure verification.
          </p>

        </section>

      </main>

    </div>
  );
}

export default ForgotPassword;