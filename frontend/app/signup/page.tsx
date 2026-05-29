"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

import signupImage from "../assets/signup.png";
import logoImage from "../components/Header/appcode.png";

import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import Footer from "../components/footer/Footer";

// Import the settings helper
import { getSetting } from "../../lib/settings";

const SignUpPage = () => {
  const router = useRouter();

  /* =====================
     STATES
  ===================== */

  const [step, setStep] = useState<"register" | "verify">("register");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [verificationCode, setVerificationCode] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Add state for registrations allowed
  const [registrationsAllowed, setRegistrationsAllowed] = useState<boolean>(true);
  const [checkingRegistrations, setCheckingRegistrations] = useState<boolean>(true);

  /* =====================
     CHECK REGISTRATION STATUS
  ===================== */

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const status = await getSetting("allow_registrations");
        setRegistrationsAllowed(status === "true");
      } catch (error) {
        console.error("Error checking registration status:", error);
        // Default to false if error (safe side - block registrations)
        setRegistrationsAllowed(false);
      } finally {
        setCheckingRegistrations(false);
      }
    };
    
    checkRegistrationStatus();
  }, []);

  /* =====================
     VALIDATIONS
  ===================== */

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  /* =====================
     REGISTER USER
  ===================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
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
        "Password must contain uppercase, lowercase, number and special character.",
      );
      setLoading(false);
      return;
    }

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created! Enter verification code sent to email.");
        setStep("verify");
      } else {
        setError(data.message || "Sign up failed.");
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

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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
        setSuccess("Verification successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "Invalid verification code.");
      }
    } catch {
      setError("Verification failed.");
    }

    setLoading(false);
  };

  // Show loading while checking registration status
  if (checkingRegistrations) {
    return (
      <>
        <Header />
        <Navigation />
        <div className="container navigate">
          <div className="items">
            <Link href="/">Home</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Sign Up</span>
        </div>
        <div className="signup-container container">
          <div className="signup-wrapper">
            <div className="signup-card">
              <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show registration closed message if registrations are not allowed
  if (!registrationsAllowed) {
    return (
      <>
        <Header />
        <Navigation />
        <div className="container navigate">
          <div className="items">
            <Link href="/">Home</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Sign Up</span>
        </div>
        <div className="signup-container container">
          <div className="registrations-closed-wrapper">
            <div className="signup-card registrations-closed-card">
              <div className="closed-icon">📝</div>
              <h2>Registration is Currently Closed</h2>
              <p>New student registrations are not available at this time.</p>
              <p>Please check back when registrations open for the next semester.</p>
              <Link href="/" className="back-to-home">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ===================== */

  return (
    <>
      <Header />
      <Navigation />

      <div className="container navigate">
        <div className="items">
          <Link href="/">Home</Link>
          <span className="material-symbols-outlined">arrow_and_edge</span>
        </div>
        <span>Sign Up</span>
      </div>

      <div className="signup-container container">
        <div className="image-container">
          <Image
            src={signupImage}
            alt="Signup Background"
            className="signup-image"
            width={570}
            height={600}
            priority
          />
        </div>

        <div className="signup-wrapper">
          <div className="signup-card">
            <div className="logo-container">
              <Image src={logoImage} alt="Logo" width={160} height={50} />
            </div>

            <h2 className="signup-title">
              {step === "register"
                ? "Create a New Account"
                : "Verify Your Email"}
            </h2>

            {error && <div className="signup-alert error">{error}</div>}

            {success && <div className="signup-alert success">{success}</div>}

            {/* ================= REGISTER FORM ================= */}

            {step === "register" && (
              <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                  <label className="form-label">Name</label>
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>

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

                <div className="btn-container">
                  <button className="btn btn-submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Sign Up"}
                    <span className="material-symbols-outlined">east</span>
                  </button>
                </div>
              </form>
            )}

            {/* ================= VERIFY FORM ================= */}

            {step === "verify" && (
              <div className="signup-form">
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
                </div>

                <div className="btn-container">
                  <button
                    className="btn btn-submit"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    Verify Email
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

export default SignUpPage;