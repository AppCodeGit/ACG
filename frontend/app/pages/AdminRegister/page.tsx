"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminRegister.css";

import adminImage from "./assets/admin-register.png"; // You'll need to add this image
import logoImage from "../../components/Header/appcode.png";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";

const AdminRegister = () => {
  const router = useRouter();

  /* =====================
     STATES
  ===================== */

  const [step, setStep] = useState<"register" | "verify">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  /* =====================
     PASSWORD STRENGTH
  ===================== */

  const [passwordStrength, setPasswordStrength] = useState({
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    minLength: false
  });

  const getPasswordStrength = () => {
    const strengthCount = Object.values(passwordStrength).filter(Boolean).length;
    if (strengthCount === 5) return 4;
    if (strengthCount >= 3) return 3;
    if (strengthCount >= 2) return 2;
    if (strengthCount >= 1) return 1;
    return 0;
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength === 4) return "Strong";
    if (strength === 3) return "Medium";
    if (strength === 2) return "Weak";
    if (strength === 1) return "Very Weak";
    return "No Password";
  };

  const checkPasswordStrength = (pwd: string) => {
    setPasswordStrength({
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecial: /[@$!%*?&]/.test(pwd),
      minLength: pwd.length >= 8
    });
  };

  /* =====================
     VALIDATIONS
  ===================== */

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  /* =====================
     RESEND COOLDOWN TIMER
  ===================== */

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  /* =====================
     REGISTER ADMIN
  ===================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!name || !email || !password || !confirmPassword || !secretKey) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!isEmailValid(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!isPasswordValid(password)) {
      setError(
        "Password must contain uppercase, lowercase, number and special character (@$!%*?&).",
      );
      setLoading(false);
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/admin/admin-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
          secretKey
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Admin account created! Enter verification code sent to email.");
        setStep("verify");
        setResendCooldown(60);
      } else {
        setError(data.message || data.error || "Admin registration failed.");
      }
    } catch {
      setError("Server connection error.");
    }

    setLoading(false);
  };

  /* =====================
     VERIFY EMAIL
  ===================== */

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      setError("Enter 6 digit verification code.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/auth/confirm`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase(),
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Verification successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "Invalid verification code.");
      }
    } catch {
      setError("Verification failed.");
    }

    setLoading(false);
  };

  /* =====================
     RESEND VERIFICATION CODE
  ===================== */

  const handleResendCode = async () => {
    if (resendCooldown > 0) {
      setError(`Please wait ${resendCooldown} seconds before resending.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/auth/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Verification code resent! Please check your email.");
        setResendCooldown(60);
      } else {
        setError(data.message || "Failed to resend code.");
      }
    } catch {
      setError("Failed to resend code.");
    }

    setLoading(false);
  };

  /* =====================
     RENDER
  ===================== */

  return (
    <>
      <Header />
      <Navigation />

      <div className="container navigate">
        <div className="items">
          <Link href="/">Home</Link>
          <span className="material-symbols-outlined">arrow_and_edge</span>
          <Link href="/pages/AdminRegister">Admin Register</Link>
        </div>
        <span>Admin Registration</span>
      </div>

      <div className="admin-register-container container">
        <div className="image-container">
          <Image
            src={adminImage}
            alt="Admin Registration"
            className="admin-register-image"
            width={570}
            height={600}
            priority
          />
        </div>

        <div className="admin-register-wrapper">
          <div className="admin-register-card">
            <div className="logo-container">
              <Image src={logoImage} alt="Logo" width={160} height={50} />
            </div>

            <h2 className="admin-register-title">
              {step === "register"
                ? "Create Admin Account"
                : "Verify Your Email"}
            </h2>

            {error && <div className="admin-register-alert error">{error}</div>}
            {success && <div className="admin-register-alert success">{success}</div>}

            {/* ================= REGISTER FORM ================= */}
            {step === "register" && (
              <form onSubmit={handleSubmit} className="admin-register-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-input"
                    value={name}
                    placeholder="Enter your full name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group password-group">
                  <label className="form-label">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkPasswordStrength(e.target.value);
                    }}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="password-strength-wrapper">
                    <div className="password-strength-bar">
                      <div
                        className={`password-strength-fill strength-${getPasswordStrength()}`}
                      ></div>
                    </div>
                    <span className="password-strength-text">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                )}

                <div className="form-group password-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Secret Key</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter admin secret key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                  <small className="form-hint">
                    Contact system administrator to get the secret key
                  </small>
                </div>

                <div className="btn-container">
                  <button className="btn" disabled={loading}>
                    {loading ? "Creating Account..." : "Register Admin"}
                    <span className="material-symbols-outlined">east</span>
                  </button>
                </div>
              </form>
            )}

            {/* ================= VERIFY FORM ================= */}
            {step === "verify" && (
              <div className="admin-register-form">
                <div className="form-group">
                  <label className="form-label">
                    Enter 6-digit verification code
                  </label>
                  <input
                    className="form-input text-center"
                    value={verificationCode}
                    maxLength={6}
                    placeholder="Enter verification code"
                    onChange={(e) =>
                      setVerificationCode(
                        e.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                  />
                  <small className="form-hint">
                    Check your email inbox (and spam folder)
                  </small>
                </div>

                <div className="btn-container">
                  <button
                    className="btn"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify Email"}
                  </button>
                </div>

                <div className="resend-code">
                  <button
                    type="button"
                    className="resend-btn"
                    onClick={handleResendCode}
                    disabled={loading || resendCooldown > 0}
                  >
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : "Resend verification code"}
                  </button>
                </div>
              </div>
            )}

            <div className="login-link">
              Already have an account?
              <Link href="/login">Login into Account</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminRegister;