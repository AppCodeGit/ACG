"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./LogInPage.css";
import loginImage from "../assets/login.png";
import logoImage from "../components/Header/appcode.png";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import Footer from "../components/footer/Footer";
import { getSetting } from "../../lib/settings";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  // Settings states
  const [sessionLifetimeHours, setSessionLifetimeHours] = useState(24);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  const [lockDurationMinutes, setLockDurationMinutes] = useState(30);
  const [checkingSettings, setCheckingSettings] = useState(true);
  
  // Lock screen state
  const [isLocked, setIsLocked] = useState(false);
  const [remainingMinutes, setRemainingMinutes] = useState(0);

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [lifetime, maxAttempts, lockDuration] = await Promise.all([
          getSetting("session_lifetime_hours"),
          getSetting("max_login_attempts"),
          getSetting("account_lock_duration_minutes"),
        ]);
        
        setSessionLifetimeHours(parseInt(lifetime) || 24);
        setMaxLoginAttempts(parseInt(maxAttempts) || 5);
        setLockDurationMinutes(parseInt(lockDuration) || 30);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setSessionLifetimeHours(24);
        setMaxLoginAttempts(5);
        setLockDurationMinutes(30);
      } finally {
        setCheckingSettings(false);
      }
    };
    
    fetchSettings();
  }, []);

  // Function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate inputs before form submission
  const validateInputs = () => {
    if (!email) {
      setErrorMessage("Email is required.");
      return false;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setErrorMessage("Password is required.");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      // Calculate expiry time
      const expiresInSeconds = sessionLifetimeHours * 60 * 60;
      const expiryTime = new Date().getTime() + (expiresInSeconds * 1000);
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.toLowerCase(),
          password,
          sessionLifetimeHours,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle locked account
        if (data.locked) {
          setIsLocked(true);
          setRemainingMinutes(data.remainingMinutes || lockDurationMinutes);
          setErrorMessage(data.message);
        } 
        // Handle attempts remaining
        else if (data.attemptsLeft !== undefined) {
          setErrorMessage(data.message);
        }
        else {
          setErrorMessage(data.message || "Invalid email or password.");
        }
        setLoading(false);
        return;
      }

      // Reset lock state on successful login
      setIsLocked(false);
      setRemainingMinutes(0);

      // Store user data
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("sessionExpiry", expiryTime.toString());
      localStorage.setItem("sessionLifetimeHours", sessionLifetimeHours.toString());
      localStorage.setItem("loginTime", new Date().getTime().toString());
      
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      setSuccessMessage("Login successful! Redirecting...");

      const roleFromResponse = data?.user?.role;
      const isAdmin = roleFromResponse === "admin";
      const destination = isAdmin ? "pages/AdminDashboard" : "pages/StudentPortal";

      setTimeout(() => router.push(destination), 600);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Unable to connect to server. Please check your internet connection and try again.");
      setLoading(false);
    }
  };

  // Show loading while checking settings
  if (checkingSettings) {
    return (
      <>
        <Header />
        <Navigation />
        <div className="login-container container">
          <div className="login-wrapper">
            <div className="login-card">
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

  return (
    <>
      <Header />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="container navigate">
        <div className="items">
          <Link href="/">Home</Link>
          <span className="material-symbols-outlined">arrow_and_edge</span>
        </div>
        <span>Log In</span>
      </div>

      {/* Login Section */}
      <div className="login-container container">
        <div className="image-container">
          <Image
            src={loginImage}
            alt="Login Background"
            className="login-image"
            width={500}
            height={600}
            priority
          />
        </div>

        <div className="login-wrapper">
          <div className="login-card">
            <div className="logo-container">
              <Image src={logoImage} alt="Logo" width={120} height={50} />
            </div>
            <h2 className="login-title">Login into Your Account</h2>

            {/* Session info message */}
            <div className="session-info">
              <span className="material-symbols-outlined">info</span>
              <span>Session will last for {sessionLifetimeHours} hours</span>
            </div>

            {/* Lock Screen - Show when account is locked */}
            {isLocked && (
              <div className="lock-screen">
                <div className="lock-icon">🔒</div>
                <h3>Account Temporarily Locked</h3>
                <p>Too many failed login attempts.</p>
                <p>Please try again in <strong>{remainingMinutes} minutes</strong>.</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="login-alert success">{successMessage}</div>
            )}

            {/* Error Message */}
            {errorMessage && !isLocked && (
              <div className="login-alert error">{errorMessage}</div>
            )}

            {!isLocked && (
              <form onSubmit={handleSubmit} className="login-form">
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Password Field */}
                <div className="form-group password-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => !loading && setShowPassword(!showPassword)}
                    role="button"
                    tabIndex={0}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>

                {/* Security Info - Show max attempts */}
                <div className="security-info">
                  <span className="material-symbols-outlined">security</span>
                  <span>Max {maxLoginAttempts} login attempts before temporary lock</span>
                </div>

                {/* Submit Button */}
                <div className="btn-container">
                  <button
                    type="submit"
                    className="btn btn-submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                    <span className="material-symbols-outlined">east</span>
                  </button>
                </div>
              </form>
            )}

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <Link href="/forgot-password">Forgot Password?</Link>
            </div>

            {/* Sign Up Link */}
            <div className="signup-link">
              Don&apos;t have an account?
              <Link href="/signup">Create an account</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;