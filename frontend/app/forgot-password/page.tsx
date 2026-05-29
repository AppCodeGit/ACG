"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./ForgotPassword.css";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import Footer from "../components/footer/Footer";
import { div } from "framer-motion/m";

const ForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Step 1: Send reset code to email
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/profile/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStep("otp");
        setMessage({
          type: "success",
          text: "Reset code sent to your email! Please check your inbox.",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to send reset code",
        });
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      setMessage({
        type: "error",
        text: "Cannot connect to server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmationCode) {
      setMessage({ type: "error", text: "Please enter the verification code" });
      return;
    }

    if (!newPassword) {
      setMessage({ type: "error", text: "Please enter a new password" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${API_URL}/api/profile/confirm-forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            confirmationCode,
            newPassword,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setStep("success");
        setMessage({ type: "success", text: data.message });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to reset password",
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage({
        type: "error",
        text: "Cannot connect to server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/profile/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: "New reset code sent to your email!",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to send reset code",
        });
      }
    } catch (error) {
      console.error("Error resending code:", error);
      setMessage({
        type: "error",
        text: "Cannot connect to server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="forgot-password-header">
            <h1>Reset Password</h1>
            <p>
              We'll help you reset your password and get back to your account
            </p>
          </div>

          {message && (
            <div
              className={`message ${message.type === "success" ? "success-message" : "error-message"}`}
            >
              {message.text}
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === "email" && (
            <form onSubmit={handleSendCode} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <i className="email-icon">📧</i>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    disabled={loading}
                    required
                  />
                </div>
                <small>
                  We'll send a verification code to this email address
                </small>
              </div>

              <div className="btn-container">
                <button type="submit" className="btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Code"}
                <span className="material-symbols-outlined">east</span>
              </button>

              </div>
              <div className="back-to-login">
                <Link href="/login">← Back to Login</Link>
              </div>
            </form>
          )}

          {/* Step 2: OTP and New Password */}
          {step === "otp" && (
            <form
              onSubmit={handleResetPassword}
              className="forgot-password-form"
            >
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <i className="email-icon">📧</i>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    disabled
                    className="disabled-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmationCode">Verification Code</label>
                <div className="input-wrapper">
                  <i className="code-icon">🔑</i>
                  <input
                    type="text"
                    id="confirmationCode"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    disabled={loading}
                    required
                    maxLength={6}
                  />
                </div>
                <small>
                  Enter the verification code sent to your email
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="resend-btn"
                    disabled={loading}
                  >
                    Resend Code
                  </button>
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <div className="input-wrapper">
                  <i className="password-icon">🔒</i>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <small>Password must be at least 6 characters</small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className="input-wrapper">
                  <i className="password-icon">🔒</i>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="btn-container">
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                  <span className="material-symbols-outlined">east</span>
                </button>
              </div>

              <div className="back-to-login">
                <Link href="/login">← Back to Login</Link>
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {step === "success" && (
            <div className="success-section">
              <div className="success-icon">✓</div>
              <h2>Password Reset Successful!</h2>
              <p>Your password has been successfully reset.</p>
              <p>Redirecting you to login page...</p>
              <div className="btn-container">
                <Link href="/login" className="btn">
                  Go to Login
                  <span className="material-symbols-outlined">east</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForgotPassword;
